import { ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import type { Project } from "@/lib/projects";

type GalleryItem = Project["gallery"][number];

const linkClass =
  "inline-flex items-center gap-1.5 rounded-full border border-rule px-3.5 py-1.5 text-small font-semibold transition-colors hover:border-ink hover:bg-wash";

const ItemLinks = ({ item }: { item: GalleryItem }) => (
  <div className="flex flex-wrap gap-2">
    {item.live && (
      <a
        href={item.live}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        Live site
        <ArrowUpRightIcon size={13} weight="bold" aria-hidden />
        <span className="sr-only">: {item.title}</span>
      </a>
    )}
    {item.repo && (
      <a
        href={item.repo}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <GithubLogoIcon size={14} weight="bold" aria-hidden />
        Code
        <span className="sr-only">: {item.title}</span>
      </a>
    )}
  </div>
);

/**
 * Thumbnail grid for a project made of many smaller builds (frontmatter `gallery`).
 * Featured items come first; items without a screenshot are listed as links underneath.
 * Cards rise in one after another on scroll and their screenshot zooms on hover.
 */
export const ProjectGallery = ({
  items,
  title = "All builds",
}: {
  items: GalleryItem[];
  title?: string;
}) => {
  const ordered = [
    ...items.filter((item) => item.featured),
    ...items.filter((item) => !item.featured),
  ];
  const withImage = ordered.filter((item) => item.image);
  const linksOnly = ordered.filter((item) => !item.image);
  return (
    <section aria-labelledby="gallery-title" className="mt-14">
      <div className="flex items-baseline justify-between gap-4 border-t border-rule pt-6">
        <h2 id="gallery-title" className="font-display text-h2 font-bold">
          {title}
        </h2>
        <span className="text-small text-muted">{items.length} projects</span>
      </div>
      <Reveal
        as="ul"
        variant="stagger"
        className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      >
        {withImage.map((item) => (
          <li
            key={item.title}
            className="group flex flex-col overflow-hidden rounded-card border border-rule bg-paper"
          >
            <div className="relative aspect-[700/513] overflow-hidden border-b border-rule bg-wash">
              <Image
                src={item.image!}
                alt={`Screenshot of the ${item.title} build`}
                fill
                sizes="(min-width: 1280px) 290px, (min-width: 640px) 45vw, 100vw"
                className="card-art object-cover object-top"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              {item.featured && (
                <span className="mb-2 self-start rounded-full bg-accent px-2.5 py-0.5 text-label font-semibold text-paper">
                  Multi-page
                </span>
              )}
              <h3 className="font-display text-h3 font-bold text-balance">
                {item.title}
              </h3>
              {item.stack.length > 0 && (
                <p className="mt-1 text-label text-muted">
                  {item.stack.join(" · ")}
                </p>
              )}
              <div className="mt-auto pt-4">
                <ItemLinks item={item} />
              </div>
            </div>
          </li>
        ))}
      </Reveal>
      {linksOnly.length > 0 && (
        <div className="mt-10">
          <h3 className="text-small font-semibold text-muted">
            Also in the repo
          </h3>
          <ul className="mt-3">
            {linksOnly.map((item) => (
              <li
                key={item.title}
                className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-rule py-3"
              >
                <div>
                  <p className="font-display text-body font-bold">
                    {item.title}
                  </p>
                  {item.stack.length > 0 && (
                    <p className="text-label text-muted">
                      {item.stack.join(" · ")}
                    </p>
                  )}
                </div>
                <ItemLinks item={item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
