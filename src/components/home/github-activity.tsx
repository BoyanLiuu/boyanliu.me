import { siteConfig } from "@/config/site";
import { getContributionGraph } from "@/lib/github";
import { GithubPulse } from "./github-pulse";

/** Server wrapper: loads the contribution calendar at build time (revalidated daily) for the tile. */
export async function GithubActivity() {
  const profile = siteConfig.social.github;
  if (!profile) return null;
  const graph = await getContributionGraph(profile);
  return (
    <GithubPulse graph={graph} profile={profile} locale={siteConfig.locale} />
  );
}
