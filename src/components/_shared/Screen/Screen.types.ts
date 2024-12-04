import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

type ExtractProp<P extends keyof NativeStackNavigationOptions> =
  NativeStackNavigationOptions[P];

export type HeaderTitleStyleProps = ExtractProp<"headerTitleStyle">;
export type HeaderLargeTitleStyleProps = ExtractProp<"headerLargeTitleStyle">;
export type ContentStyleProps = ExtractProp<"contentStyle">;
export type HeaderTintColorProps = ExtractProp<"headerTintColor">;
export type HeaderStyleProps = ExtractProp<"headerStyle">;
