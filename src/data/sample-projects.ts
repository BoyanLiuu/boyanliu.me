/**
 * SAMPLE DATA — placeholder projects so the templates can be built (checkpoint 2.5).
 * Replaced by the projects content collection in checkpoint 4.1.
 */

export type Project = {
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  year: number;
  role: string;
  stack: string[];
  status: "live" | "in-progress" | "archived";
  featured: boolean;
  order?: number;
  cover: string;
  problem: string;
  approach: string;
  result: string;
  links: { repo?: string; demo?: string; video?: string };
};

export const sampleProjects: Project[] = [
  {
    slug: "ledgerline",
    title: "Ledgerline",
    summary:
      "Sample project: an idempotent payments ledger with exactly-once settlement.",
    outcome: "0 double-charges / 1.2M",
    year: 2026,
    role: "Tech lead",
    stack: ["go", "postgres", "kafka"],
    status: "live",
    featured: true,
    order: 1,
    cover: "/projects/ledgerline/cover.svg",
    problem:
      "Client retries during network blips occasionally settled the same payment twice.",
    approach:
      "Idempotency keys stored with the ledger write in one transaction, plus a replay-safe consumer.",
    result:
      "Zero double-charges across 1.2M transactions; settlement p99 down 38%.",
    links: { repo: "https://github.com/BoyanLiuu" },
  },
  {
    slug: "pulse",
    title: "Pulse",
    summary:
      "Sample project: a realtime metrics pipeline on serverless compute.",
    outcome: "p99 3 s → 300 ms",
    year: 2025,
    role: "Solo",
    stack: ["rust", "clickhouse", "aws"],
    status: "live",
    featured: true,
    order: 2,
    cover: "/projects/pulse/cover.svg",
    problem:
      "Ingest latency spiked to 3 seconds at peak, delaying every dashboard downstream.",
    approach:
      "Batched writes and rewrote the hot path in Rust; measured cold and warm paths separately.",
    result: "Ingest p99 from 3 s to 300 ms at the same cost.",
    links: {},
  },
  {
    slug: "splitter",
    title: "Splitter",
    summary:
      "Sample project: an offline-first app for splitting group expenses.",
    outcome: "2k users, 0 sync conflicts",
    year: 2024,
    role: "Solo",
    stack: ["react", "typescript", "indexeddb"],
    status: "archived",
    featured: true,
    order: 3,
    cover: "/projects/splitter/cover.svg",
    problem:
      "Trips happen where the network doesn't; edits made offline collided on reconnect.",
    approach:
      "Local-first storage in IndexedDB with operation logs merged deterministically on sync.",
    result: "2,000 users and zero reported sync conflicts.",
    links: {},
  },
];
