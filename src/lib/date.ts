import { siteConfig } from "@/config/site";

type DateInput = string | Date;

const toDate = (value: DateInput) =>
  value instanceof Date ? value : new Date(value);

/** "Oct 12, 2026". Formatted in UTC so build machines in any time zone agree. */
export const formatDate = (
  value: DateInput,
  locale: string = siteConfig.locale,
): string =>
  new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(toDate(value));

/** "Oct 2026". */
export const formatMonthYear = (
  value: DateInput,
  locale: string = siteConfig.locale,
): string =>
  new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(toDate(value));

/** "2026-10-12", for <time dateTime>. */
export const isoDate = (value: DateInput): string =>
  toDate(value).toISOString().slice(0, 10);

/** "November 2026", for section headings. */
export const formatMonthYearLong = (
  value: DateInput,
  locale: string = siteConfig.locale,
): string =>
  new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(toDate(value));
