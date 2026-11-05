import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { getProjectBySlug, getProjects } from "@/lib/projects";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Project cover";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProjectBySlug((await params).slug);
  return ogImage({
    kicker: "Case study",
    title: project?.title ?? "Work",
    footer: project?.outcome,
  });
}
