/**
 * An object defining various opacity levels for visual feedback
 * during interactions with components.
 */
export const activeOpacity = {
  /**
   * Light feedback, the element remains almost fully visible.
   * Used for light or non-intrusive interactions.
   * @example activeOpacity={FEEDBACK_OPACITY.light}
   */
  light: 0.8,

  /**
   * Medium feedback, with a moderate reduction in opacity.
   * Used for interactions that require some attention without being too intrusive.
   * @example activeOpacity={FEEDBACK_OPACITY.medium}
   */
  medium: 0.5,

  /**
   * Strong feedback, the element becomes significantly less opaque.
   * Used for interactions that need strong attention or indicate a major action.
   * @example activeOpacity={FEEDBACK_OPACITY.strong}
   */
  strong: 0.2,

  /**
   * No visual feedback. Opacity remains at full (1) with no reduction.
   * Used when no change in appearance is desired during interaction.
   * @example activeOpacity={FEEDBACK_OPACITY.off}
   */
  off: 1,
};
