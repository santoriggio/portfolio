/**
 * Enum representing the available date and time formats.
 *
 * @remarks
 * Each value corresponds to a specific formatting style, combining
 * `dateStyle` and/or `timeStyle` options for `Intl.DateTimeFormat`.
 */
export enum DateFormat {
  /**
   * Time in "short" style.
   * @example "13:00"
   */
  LT = "LT",

  /**
   * Time in "medium" style.
   * @example "13:00:00"
   */
  LTS = "LTS",

  /**
   * Date and time in "short" style.
   * @example "13/08/25, 13:00"
   */
  lL = "lL",

  /**
   * Date in "short" style.
   * @example "13/08/25"
   */
  L = "L",

  /**
   * Date in "medium" style.
   * @example "13 Aug 2025"
   */
  LL = "LL",

  /**
   * Date and time in "medium" style.
   * @example "13 Aug 2025, 13:00"
   */
  LLL = "LLL",

  /**
   * Date and time in "long" style.
   * @example "13 August 2025 at 13:00"
   */
  LLLL = "LLLL",
}


