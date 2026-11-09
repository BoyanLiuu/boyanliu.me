/** Site changelog, loaded from content/changelog.json (validated at build, newest first). */
import data from "../../content/changelog.json";
import type { ChangelogData } from "@/config/schema";

export type ChangelogEntry = ChangelogData["entries"][number];

export const changelog: ChangelogEntry[] = (data as unknown as ChangelogData)
  .entries;

/** The current site version, e.g. "2.2.0". */
export const currentVersion = changelog[0]!.version;
