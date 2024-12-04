import { Spacing } from "@/theme";
import { useAppTheme } from "./useAppTheme";

const spacingProps = [
  "margin",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginVertical",
  "marginHorizontal",
  "padding",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingVertical",
  "paddingHorizontal",
  "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
] as const;

export type SpacingProps = {
  [K in (typeof spacingProps)[number]]?: keyof Spacing
};

/**
 * Hook that converts spacing props (e.g., margin, padding) from string keys to numeric values based on spacing scale
 */
export const useSpacing = (props: SpacingProps) => {
  const { theme } = useAppTheme();
  const resolvedStyles: { [key: string]: number | undefined } = {};

  for (const key in props) {
    if (spacingProps.includes(key as any)) {
      const value = props[key as keyof SpacingProps];
      if (
        value &&
        typeof value === "string" &&
        theme.spacing[value] !== undefined
      ) {
        resolvedStyles[key] = theme.spacing[value];
      }
    }
  }

  return resolvedStyles;
};
