import i18n from "i18next";
import { DateFormat } from "./formatDate.types";

const dateFormats: Record<DateFormat, Intl.DateTimeFormatOptions> = {
  [DateFormat.LT]: {
    timeStyle: "short",
  },
  [DateFormat.LTS]: {
    timeStyle: "medium",
  },
  [DateFormat.lL]: {
    dateStyle: "short",
    timeStyle: "short",
  },
  [DateFormat.L]: {
    dateStyle: "short",
  },
  [DateFormat.LL]: {
    dateStyle: "medium",
  },
  [DateFormat.LLL]: {
    dateStyle: "medium",
    timeStyle: "short",
  },
  [DateFormat.LLLL]: {
    dateStyle: "long",
    timeStyle: "short",
  },
};

/**
 * Formats a date or timestamp into a string based on a specified format.
 *
 * The function uses the current locale from i18next and the provided format options
 * to produce a formatted date string.
 *
 * ### Supported Formats:
 * - **LT**: Time in "short" style (e.g., `13:00`).
 * - **LTS**: Time in "medium" style (e.g., `13:00:00`).
 * - **lL**: Date and time in "short" style (e.g., `13/08/25, 13:00`).
 * - **L**: Date in "short" style (e.g., `13/08/25`).
 * - **LL**: Date in "medium" style (e.g., `13 Aug 2025`).
 * - **LLL**: Date and time in "medium" style (e.g., `13 Aug 2025, 13:00`).
 * - **LLLL**: Date and time in "long" style (e.g., `13 August 2025 at 13:00`).
 *
 * @param {DateFormat} format - The format type (e.g., `DateFormat.LT`, `DateFormat.LTS`, etc.).
 * @param {Date | number} date - The date object or timestamp to format.
 * @param {Intl.DateTimeFormatOptions} [options={}] - Additional options for formatting (overrides defaults).
 * @returns {string} The formatted date string.
 *
 * @example
 * // Format a date with "LT" style
 * const date = new Date("2025-08-13T13:00:00");
 * console.log(formatDate(DateFormat.LT, date)); // Output: "13:00"
 *
 * @example
 * // Format a timestamp with "LLLL" style
 * const timestamp = 1755097200000; // Equivalent to 2025-08-13T13:00:00Z
 * console.log(formatDate(DateFormat.LLLL, timestamp));
 * // Output: "13 August 2025 at 13:00"
 *
 * @example
 * // Customize the output by adding additional options
 * const date = new Date("2025-08-13T13:00:00");
 * console.log(formatDate(DateFormat.L, date, { weekday: "long" }));
 * // Output: "Wednesday, 13/08/25"
 */
export const formatDate = (
  format: DateFormat,
  date: Date | number,
  options: Intl.DateTimeFormatOptions = {},
): string => {
  options = {
    ...dateFormats[format],
    ...options,
  };

  const locale = i18n.language;

  return Intl.DateTimeFormat(locale, options).format(date);
};
