import { useAppTheme } from "@/hooks";
import { Stack } from "expo-router";
import { FC, PropsWithChildren, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import {
  HeaderTitleStyleProps,
  HeaderStyleProps,
  ContentStyleProps,
  HeaderLargeTitleStyleProps,
  HeaderTintColorProps,
} from "./Screen.types";
import {
  $baseContentStyle,
  $basePageStyle,
  $baseHeaderLargeTitleStyle,
  $baseHeaderTitleStyle,
  $baseHeaderStyle,
} from "./Screen.styles";
import { TxKeyPath, translate } from "@/i18n";

export type ScreenProps = NativeStackNavigationOptions & {
  title?: string;
  tx?: TxKeyPath;
  style?: StyleProp<ViewStyle>;
  keyboardVerticalOffset?: number;
};

export const Screen: FC<PropsWithChildren<ScreenProps>> = ({
  title,
  tx,
  children,
  headerTitleStyle,
  headerLargeTitleStyle,
  contentStyle,
  headerTintColor,
  headerStyle,
  style,
  keyboardVerticalOffset,
  ...rest
}) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (tx) {
      document.title = translate(tx);
    }
  }, [title, tx]);
  const { themed, theme } = useAppTheme();

  const $pageStyle = [$basePageStyle, style];

  const $headerTitleStyle: HeaderTitleStyleProps = [
    themed($baseHeaderTitleStyle),
    headerTitleStyle,
  ];

  const $headerLargeTitleStyle: HeaderLargeTitleStyleProps = [
    themed($baseHeaderLargeTitleStyle),
    headerLargeTitleStyle,
  ];

  const $contentStyle: ContentStyleProps = [
    themed($baseContentStyle),
    contentStyle,
  ];

  const $headerTintColor: HeaderTintColorProps =
    headerTintColor || theme.colors.primary;

  const $headerStyle: HeaderStyleProps = [
    themed($baseHeaderStyle),
    headerStyle,
  ];

  return (
    <KeyboardAvoidingView
      style={$pageStyle}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <Stack.Screen
        options={{
          title: tx ? translate(tx) : title,
          headerTitleStyle: $headerTitleStyle,
          headerLargeTitleStyle: $headerLargeTitleStyle,
          contentStyle: $contentStyle,
          headerTintColor: $headerTintColor,
          headerShadowVisible: false,
          headerLargeTitleShadowVisible: false,
          navigationBarColor: theme.colors.background,
          statusBarTranslucent: true,
          headerStyle: $headerStyle,
          ...rest,
        }}
      />
      {children}
    </KeyboardAvoidingView>
  );
};
