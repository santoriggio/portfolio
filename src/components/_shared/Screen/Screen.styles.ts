import { ThemedStyle } from "@/theme";
import { ViewStyle } from "react-native";
import {
  ContentStyleProps,
  HeaderLargeTitleStyleProps,
  HeaderStyleProps,
  HeaderTitleStyleProps,
} from "./Screen.types";

export const $basePageStyle: ViewStyle = {
  flex: 1,
};

export const $baseHeaderTitleStyle: ThemedStyle<HeaderTitleStyleProps> = (
  theme,
) => ({
  fontSize: 16,
  color: theme.colors.text,
});

export const $baseHeaderLargeTitleStyle: ThemedStyle<
  HeaderLargeTitleStyleProps
> = (theme) => ({
  color: theme.colors.text,
});

export const $baseContentStyle: ThemedStyle<ContentStyleProps> = (theme) => ({
  backgroundColor: theme.colors.background,
});

export const $baseHeaderStyle: ThemedStyle<HeaderStyleProps> = (theme) => ({
  backgroundColor: theme.colors.background,
});
