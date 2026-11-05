/** Work history and education, loaded from content/experience.json (validated at build). */
import data from "../../content/experience.json";
import type { ExperienceData } from "@/config/schema";

export type Role = ExperienceData["roles"][number];

const parsed = data as unknown as ExperienceData;

export const experience: Role[] = parsed.roles;
export const education = parsed.education;
