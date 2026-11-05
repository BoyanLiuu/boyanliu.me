import { Display, Grid, Mark } from "@/components/swiss/layout";
import { siteConfig } from "@/config/site";

/** Name and role as the display headline, with the facts column aligned to the bottom. */
export function Hero() {
  const { author } = siteConfig;
  return (
    <Grid className="border-b border-rule pt-10 pb-8 lg:pt-14 lg:pb-10">
      <Display className="col-span-4 md:col-span-8 lg:col-span-9">
        {author.name}
        <Mark />
        <br />
        {author.jobTitle}
      </Display>
      <div className="col-span-4 mt-8 self-end text-body md:col-span-6 lg:col-span-3 lg:mt-0">
        {author.availability !== "hidden" && (
          <p className="flex items-center gap-2 font-bold">
            <span aria-hidden className="inline-block size-3 bg-accent" />
            {author.availabilityNote}
          </p>
        )}
        <p className="mt-3">{author.bio}</p>
        {author.location && (
          <p className="mt-3 text-small text-muted">{author.location}</p>
        )}
      </div>
    </Grid>
  );
}
