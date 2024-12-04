import { SpacingProps, useAppTheme, useSpacing } from "@/hooks";
import { colors } from "@/theme";
import { ReactNode, useMemo } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Background } from "../Background";
import { Typography } from "../Typography";
import { Icon } from "../Icon";
import { TxKeyPath, translate } from "@/i18n";

type Press = () => void;

export type ButtonProps = {
  tx?: TxKeyPath;
  children?: ReactNode;
  onPress?: Press;
  onLongPress?: Press;
  delayLongPress?: number;
  icon?: string;
  size?: "xs" | "sm" | "md";
  color?: keyof typeof colors;
  type?: "plain" | "filled" | "gray" | "tinted";
  active?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
} & SpacingProps;

export default function Button({
  tx,
  children,
  color = "primary",
  type = "filled",
  active = true,
  loading,
  icon,
  size = "md",
  onPress,
  onLongPress,
  delayLongPress,
  style,
  ...rest
}: ButtonProps) {
  const { theme } = useAppTheme();
  const $spacing = useSpacing(rest);
  const tint = type === "gray" ? "gray" : color;
  const title = tx ? translate(tx) : children;

  const handlePress = () => {
    if (loading || active === false) return;

    if (typeof onPress === "function") onPress();
  };

  const handleLongPress = () => {
    if (loading || active === false) return;

    if (typeof onLongPress === "function") onLongPress();
  };

  const textColor = useMemo(() => {
    if (!active) return "gray";

    if (type === "filled") {
      return "textLight";
    }
    return color;
  }, [type, color, active]);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        borderRadius: 100,
        borderCurve: "continuous",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: theme.spacing[size],
        paddingVertical: theme.spacing[size] * 0.9,
        opacity: active ? 1 : 0.8,
        ...$spacing,
      },
      activityIndicator: {
        marginLeft: theme.spacing.sm,
      },
    });
  }, [$spacing, size, theme.spacing, active]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={delayLongPress}
      style={[styles.container, style]}
      disabled={!active}
      activeOpacity={theme.activeOpacity.light}
    >
      {type !== "plain" && (
        <Background
          opacity={type === "filled" ? 1 : 0.25}
          color={active ? tint : "card"}
        />
      )}
      <Typography preset="bold" color={textColor} size={size}>
        {title}
      </Typography>
      {typeof icon === "string" && (
        <Icon name={icon} color={textColor} marginLeft="sm" />
      )}
      {loading && (
        <ActivityIndicator
          size="small"
          color={textColor}
          style={styles.activityIndicator}
        />
      )}
    </TouchableOpacity>
  );
}
