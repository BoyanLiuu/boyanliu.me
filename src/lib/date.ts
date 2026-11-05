import { siteConfig } from "@/config/site";

type DateInput = string | Date;

const toDate = (value: DateInput) =>
  value instanceof Date ? value : new Date(value);

/** "Oct 12, 2026". Formatted in UTC so build machines in any time zone agree. */
export function formatDate(
  value: DateInput,
  locale: string = siteConfig.locale,
): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(toDate(value));
}

/** "Oct 2026". */
export function formatMonthYear(
  value: DateInput,
  locale: string = siteConfig.locale,
): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(toDate(value));
}

/** "2026-10-12", for <time dateTime>. */
export function isoDate(value: DateInput): string {
  return toDate(value).toISOString().slice(0, 10);
}
