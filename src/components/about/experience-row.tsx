import { Label, Row } from "@/components/swiss/layout";
import type { Role } from "@/data/experience";
import { formatMonthYear } from "@/lib/date";

export const roleDates = (role: Role) =>
  `${formatMonthYear(`${role.start}-01`)} — ${role.end ? formatMonthYear(`${role.end}-01`) : "now"}`;

/** Company · title · dates, with optional impact bullets. */
export const ExperienceRow = ({
  role,
  detailed = false,
}: {
  role: Role;
  detailed?: boolean;
}) => (
  <Row className="items-baseline gap-y-2">
    <p className="col-span-4 font-display text-h3 font-bold md:col-span-3 lg:col-span-4">
      {role.company}
    </p>
    <p className="col-span-4 text-body md:col-span-3 lg:col-span-5">
      {role.title}
    </p>
    <Label className="col-span-4 md:col-span-2 md:text-right lg:col-span-3">
      {roleDates(role)}
    </Label>
    {detailed && (
      <ul className="col-span-4 list-[square] pl-5 text-body marker:text-accent md:col-span-8 lg:col-span-8 lg:col-start-5 [&>li+li]:mt-1">
        {role.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    )}
  </Row>
);
