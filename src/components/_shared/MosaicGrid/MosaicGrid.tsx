import { FC, ReactNode, useState } from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { Typography } from "../Typography";
import { TxKeyPath } from "@/i18n";
import { SpacingProps, useAppTheme, useSpacing } from "@/hooks";
import { StyleProps } from "react-native-reanimated";

type ItemProps = {
  text?: string;
  tx?: TxKeyPath;
};

export type MosaicGridProps = {
  list?: ItemProps[];
  style?: StyleProp<ViewStyle>;
  limit?: number;
} & SpacingProps;

export const MosaicGrid: FC<MosaicGridProps> = ({
  style,
  list = [],
  limit,
  ...rest
}) => {
  const { theme } = useAppTheme();
  const $spacing = useSpacing(rest);
  const [selected, setSelected] = useState<number[]>([]);
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: theme.spacing.sm,
        },
        $spacing,
        style,
      ]}
    >
      {list.map((item, _) => {
        const active = selected.includes(_);
        return (
          <TouchableOpacity
            key={_}
            onPress={() => {
              if (selected.includes(_)) {
                return setSelected((prev) => prev.filter((x) => x !== _));
              }

              if (limit && selected.length === limit) return;

              return setSelected((prev) => [...prev, _]);
            }}
            activeOpacity={theme.activeOpacity.light}
            style={{
              backgroundColor: selected.includes(_)
                ? theme.colors.primary
                : theme.colors.card,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              borderWidth: 2,
              borderColor: active ? theme.colors.primary : theme.colors.border,
              borderRadius: 100,
            }}
          >
            <Typography tx={item.tx} color={active ? "textLight" : "text"}>
              {item.text}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
