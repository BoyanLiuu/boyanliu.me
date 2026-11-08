/**
 * GitHub contribution calendar for the home page's activity tile. Server-only.
 *
 * Source, in order of preference:
 * 1. GitHub's GraphQL API, when GITHUB_TOKEN is set (any token; no scopes needed for public data).
 * 2. The public github-contributions-api.jogruber.de mirror of the same calendar (no key).
 * Fetched at build time and revalidated daily. Any failure returns null and the tile falls back
 * to a plain link to the GitHub profile.
 */

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;
/** One day: ISO date, contribution count, level 0–4 (GitHub's quartiles). */
export type ContributionDay = { d: string; c: number; l: ContributionLevel };
/** A calendar month as week columns of 7 weekday slots (Sunday first); null = outside the month. */
export type ContributionMonth = {
  key: string;
  label: string;
  weeks: (ContributionDay | null)[][];
};
export type ContributionGraph = {
  user: string;
  profile: string;
  total: number;
  months: ContributionMonth[];
};

const REVALIDATE_SECONDS = 60 * 60 * 24;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const GRAPHQL_LEVELS: Record<string, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/** "https://github.com/BoyanLiuu" → "BoyanLiuu". */
export function githubUser(profileUrl: string): string | undefined {
  try {
    const user = new URL(profileUrl).pathname.split("/").filter(Boolean)[0];
    return user || undefined;
  } catch {
    return undefined;
  }
}

async function fromGraphQL(
  user: string,
  token: string,
): Promise<{ total: number; days: ContributionDay[] }> {
  const query = `query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar {
    totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }`;
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: user } }),
    signal: AbortSignal.timeout(10_000),
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!response.ok) throw new Error(`GitHub GraphQL ${response.status}`);
  const json = await response.json();
  const calendar =
    json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) throw new Error("GitHub GraphQL: no calendar");
  const days: ContributionDay[] = calendar.weeks.flatMap(
    (week: { contributionDays: Record<string, unknown>[] }) =>
      week.contributionDays.map((day) => ({
        d: String(day.date),
        c: Number(day.contributionCount),
        l: GRAPHQL_LEVELS[String(day.contributionLevel)] ?? 0,
      })),
  );
  return { total: Number(calendar.totalContributions), days };
}

async function fromPublicMirror(
  user: string,
): Promise<{ total: number; days: ContributionDay[] }> {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`,
    {
      signal: AbortSignal.timeout(10_000),
      next: { revalidate: REVALIDATE_SECONDS },
    },
  );
  if (!response.ok) throw new Error(`contributions mirror ${response.status}`);
  const json = await response.json();
  const days: ContributionDay[] = (json.contributions ?? []).map(
    (day: { date: string; count: number; level: number }) => ({
      d: day.date,
      c: day.count,
      l: Math.max(0, Math.min(4, day.level)) as ContributionLevel,
    }),
  );
  const total =
    typeof json.total?.lastYear === "number"
      ? json.total.lastYear
      : days.reduce((sum, day) => sum + day.c, 0);
  return { total, days };
}

/** Group days into calendar months of Sunday-first week columns. Exported for tests. */
export function toMonths(days: ContributionDay[]): ContributionMonth[] {
  const sorted = [...days].sort((a, b) => a.d.localeCompare(b.d));
  const byMonth = new Map<string, ContributionDay[]>();
  for (const day of sorted) {
    const key = day.d.slice(0, 7);
    byMonth.set(key, [...(byMonth.get(key) ?? []), day]);
  }
  const keys = [...byMonth.keys()];
  return keys.map((key, index) => {
    const [year, month] = key.split("-").map(Number) as [number, number];
    const monthDays = byMonth.get(key)!;
    const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
    const weeks: (ContributionDay | null)[][] = [];
    for (const day of monthDays) {
      const dayOfMonth = Number(day.d.slice(8, 10));
      const slot = firstWeekday + dayOfMonth - 1;
      const column = Math.floor(slot / 7);
      while (weeks.length <= column) weeks.push(Array(7).fill(null));
      weeks[column]![slot % 7] = day;
    }
    // A month cut by the 365-day window (the first one) can start with whole empty weeks; drop them.
    while (weeks.length > 1 && weeks[0]!.every((slot) => slot === null))
      weeks.shift();
    // The first and last months carry the year, e.g. "Nov ’25" … "Nov ’26".
    const edge = index === 0 || index === keys.length - 1;
    const label = `${MONTHS[month - 1]}${edge ? ` ’${String(year).slice(2)}` : ""}`;
    return { key, label, weeks };
  });
}

export async function getContributionGraph(
  profileUrl: string,
): Promise<ContributionGraph | null> {
  const user = githubUser(profileUrl);
  if (!user) return null;
  try {
    const token = process.env.GITHUB_TOKEN;
    const { total, days } = token
      ? await fromGraphQL(user, token)
      : await fromPublicMirror(user);
    if (days.length === 0) return null;
    return { user, profile: profileUrl, total, months: toMonths(days) };
  } catch (error) {
    console.warn(
      `GitHub contributions unavailable (${error instanceof Error ? error.message : error}); showing a profile link instead.`,
    );
    return null;
  }
}
