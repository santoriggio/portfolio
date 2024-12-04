import { useAppTheme } from "@/hooks/useAppTheme";
import { SpacingProps, useSpacing } from "@/hooks/useSpacing";
import { TxKeyPath, isRTL, translate } from "@/i18n";
import { ThemedStyle, ThemedStyleArray, colors, typography } from "@/theme";
import { TOptions } from "i18next";
import React, { FC, ReactNode } from "react";
import {
  Text,
  TextProps as RNTextProps,
  TextStyle,
  StyleProp,
} from "react-native";

type Sizes = keyof typeof $sizeStyles;
type Presets = "default" | "bold";
type Colors = keyof typeof colors;

export type TypographyProps = SpacingProps &
  RNTextProps & {
    flex?: boolean;
    /**
     * Text which is looked up via i18n.
     */
    tx?: TxKeyPath;
    /**
     * Optional options to pass to i18n. Useful for interpolation
     * as well as explicitly setting locale or translation fallbacks.
     */
    txOptions?: TOptions;
    /**
     * An optional style override useful for padding & margin.
     */
    style?: StyleProp<TextStyle>;
    /**
     * Children components.
     */
    children?: ReactNode;
    /**
     * Text Size
     */
    size?: Sizes;
    /**
     * Text Color
     */
    color?: Colors;
    /**
     * One of the different types of text presets.
     */
    preset?: Presets;
  };

export const Typography: FC<TypographyProps> = ({
  tx,
  txOptions,
  children,
  size,
  color,
  flex,
  style: $styleOverride,
  ...rest
}) => {
  const { themed, theme } = useAppTheme();
  const $spacing = useSpacing(rest);

  const i18nText = tx && translate(tx, txOptions);
  const content = i18nText || children;
  const preset: Presets = rest.preset ?? "default";

  const $color = color && { color: theme.colors[color] };
  const $flex = flex && { flex: 1 };

  const $styles: StyleProp<TextStyle> = [
    $rtlStyle,
    themed($presets[preset]),
    size && $sizeStyles[size],
    $flex,
    $color,
    $spacing,
    $styleOverride,
  ];

  return (
    <Text {...rest} style={$styles}>
      {content}
    </Text>
  );
};

const $sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 } satisfies TextStyle,
  xl: { fontSize: 24, lineHeight: 34 } satisfies TextStyle,
  lg: { fontSize: 20, lineHeight: 32 } satisfies TextStyle,
  md: { fontSize: 18, lineHeight: 26 } satisfies TextStyle,
  sm: { fontSize: 16, lineHeight: 24 } satisfies TextStyle,
  xs: { fontSize: 14, lineHeight: 21 } satisfies TextStyle,
  xxs: { fontSize: 12, lineHeight: 18 } satisfies TextStyle,
};

const $baseStyle: ThemedStyle<TextStyle> = (theme) => ({
  ...$sizeStyles.sm,
  color: theme.colors.text,
});

const $boldStyle: ThemedStyle<TextStyle> = (theme) => ({});

const $presets: Record<Presets, ThemedStyleArray<TextStyle>> = {
  default: [$baseStyle],
  bold: [$baseStyle, $boldStyle],
};
const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {};
