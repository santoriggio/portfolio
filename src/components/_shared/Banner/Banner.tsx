import { SpacingProps, useAppTheme, useSpacing } from "@/hooks";
import { TxKeyPath } from "@/i18n";
import { $styles, colors } from "@/theme";
import { FC, ReactNode } from "react";
import { View } from "react-native";
import { Typography } from "../Typography";
import { Icon } from "../Icon";

export type BannerProps = SpacingProps & {
  color?: keyof typeof colors;
  icon?: string;
  tx?: TxKeyPath;
  children?: ReactNode;
};

export const Banner: FC<BannerProps> = ({
  tx,
  children,
  color = "info",
  icon,
  ...rest
}) => {
  const { theme } = useAppTheme();
  const $spacing = useSpacing(rest);

  return (
    <View
      style={{
        borderRadius: 12,
        padding: theme.spacing.sm,
        borderWidth: 2,
        overflow: "hidden",
        borderColor: theme.colors[color],
        flexDirection: "row",
        alignItems: "center",
        ...$spacing,
      }}
    >
      <View
        style={[
          $styles.absoluteFill,
          { backgroundColor: theme.colors[color], opacity: 0.15 },
        ]}
      />
      {icon && (
        <Icon testID="icon" name={icon} color={color} marginRight="sm" />
      )}
      <Typography testID="message" tx={tx} color={color}>
        {children}
      </Typography>
    </View>
  );
};
