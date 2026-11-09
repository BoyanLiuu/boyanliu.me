import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import { Label } from "@/components/swiss/layout";
import type { Role } from "@/data/experience";
import { roleDates } from "./experience-row";

/**
 * Expandable experience row for the home page: company · title · dates, opening to the role's
 * impact bullets, location and stack. Native <details>, so it works without JavaScript and is
 * keyboard and screen-reader friendly; rows sharing a `name` open one at a time.
 * The open/close height animation is `.role` in globals.css (where the browser supports it).
 */
export const ExperienceAccordion = ({
  role,
  name = "experience",
}: {
  role: Role;
  name?: string;
}) => (
  <details name={name} className="role group/role border-t border-rule">
    <summary className="grid cursor-pointer list-none grid-cols-4 items-baseline gap-x-4 gap-y-1 py-5 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 [&::-webkit-details-marker]:hidden">
      <span className="col-span-4 font-display text-h3 font-bold transition-colors group-hover/role:text-accent md:col-span-3 lg:col-span-4">
        {role.company}
      </span>
      <span className="col-span-4 text-body md:col-span-3 lg:col-span-5">
        {role.title}
      </span>
      <span className="col-span-4 flex items-center gap-3 md:col-span-2 md:justify-end lg:col-span-3">
        <Label>{roleDates(role)}</Label>
        <span
          aria-hidden
          className="grid size-8 shrink-0 place-items-center rounded-full border border-rule transition-[transform,background-color] duration-300 ease-out-soft group-open/role:rotate-180 group-hover/role:bg-wash"
        >
          <CaretDownIcon size={14} weight="bold" />
        </span>
      </span>
    </summary>
    <div className="role__body grid grid-cols-4 gap-x-4 pb-7 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
      <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5">
        <ul className="list-[square] pl-5 text-body marker:text-accent [&>li+li]:mt-2">
          {role.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        {(role.location || (role.stack && role.stack.length > 0)) && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {role.location && (
              <span className="mr-2 text-small text-muted">
                {role.location}
              </span>
            )}
            {role.stack?.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-rule px-3 py-1 text-label font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </details>
);
