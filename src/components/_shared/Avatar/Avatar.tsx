import { SpacingProps, useAppTheme, useSpacing } from "@/hooks";
import { ThemedStyle } from "@/theme";
import { ImageProps, Image, ImageStyle } from "expo-image";
import { FC } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Skeleton } from "../Skeleton";

export type AvatarProps = { size?: keyof typeof $sizes } & ImageProps &
  SpacingProps;

export const Avatar: FC<AvatarProps> = ({
  source,
  style,
  size = "sm",
  ...rest
}) => {
  const { themed, theme } = useAppTheme();
  const $spacing = useSpacing(rest);

  const $size: ImageStyle = {
    height: $sizes[size],
    width: $sizes[size],
    borderRadius: $sizes[size],
  };

  const $styles: StyleProp<ImageStyle> = [$spacing, $size, style];

  return <Image source={source} {...rest} style={$styles} />;
};

export type AvatarSkeletonProps = Pick<AvatarProps, "size" | "style"> &
  SpacingProps;

export const AvatarSkeleton: FC<AvatarSkeletonProps> = ({
  size = "sm",
  style,
  ...rest
}) => {
  const $spacing = useSpacing(rest);
  const $size: ViewStyle = {
    height: $sizes[size],
    aspectRatio: 1,
    borderRadius: $sizes[size],
  };

  const $styles: StyleProp<ViewStyle> = [$spacing, $size, style];
  return <Skeleton style={$styles} />;
};

const $sizes = {
  sm: 26,
  md: 50,
  lg: 100,
};
