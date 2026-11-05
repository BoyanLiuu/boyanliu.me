/** Work history used by /about and /resume. TODO: replace the placeholders with your real roles. */

export type Role = {
  company: string;
  title: string;
  start: string; // "2023-04"
  end?: string; // omit for current role
  location?: string;
  highlights: string[];
  stack?: string[];
};

export const experience: Role[] = [
  {
    company: "TODO Company",
    title: "Software Engineer",
    start: "2023-01",
    location: "Seattle, WA",
    highlights: [
      "TODO: impact bullet with a number, e.g. cut p99 latency 40% for 20M daily requests.",
      "TODO: scope bullet, e.g. led a team of 4 on the payments ledger.",
    ],
    stack: ["go", "postgres", "aws"],
  },
  {
    company: "TODO Previous Company",
    title: "Software Engineer",
    start: "2020-06",
    end: "2022-12",
    highlights: ["TODO: one or two results from this role."],
  },
];

export const education = [
  { school: "TODO University", degree: "TODO Degree", year: "TODO" },
];
