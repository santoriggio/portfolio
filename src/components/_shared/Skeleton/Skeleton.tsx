import { SpacingProps, useAppTheme, useSpacing } from "@/hooks";
import { FC } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

export type SkeletonProps = {
  height?: number;
  width?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
} & SpacingProps;

export const Skeleton: FC<SkeletonProps> = ({
  height,
  width,
  radius = 12,
  style,
  ...rest
}) => {
  const { theme } = useAppTheme();
  const $spacing = useSpacing(rest);

  const $styles: StyleProp<ViewStyle> = [
    $spacing,
    { height, width, borderRadius: radius, backgroundColor: theme.colors.card },
    style,
  ];

  return <Animated.View style={$styles}></Animated.View>;
};
