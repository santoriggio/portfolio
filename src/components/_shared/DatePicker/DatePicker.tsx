import { SpacingProps, useAppTheme, useSpacing } from "@/hooks";
import { FC, useState } from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import RNDatePicker, {
  DatePickerProps as RNDatePickerProps,
} from "react-native-date-picker";
import { Typography } from "../Typography";
import { TxKeyPath, translate } from "@/i18n";
import i18n from "i18next";

export type DatePickerProps = {
  tx?: TxKeyPath;
  children?: string;
  style?: StyleProp<ViewStyle>;
  mode?: RNDatePickerProps["mode"];
} & SpacingProps;

export const DatePicker: FC<DatePickerProps> = ({
  tx,
  children,
  style,
  mode = "datetime",
  ...rest
}) => {
  const { theme } = useAppTheme();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const title = tx ? translate(tx) : children;
  const $spacing = useSpacing(rest);

  const onConfirm = (d: Date) => {
    setDate(d);
    setOpen(false);
  };

  return (
    <View style={[$spacing]}>
      <Typography marginLeft="md" marginBottom="xs" preset="bold">
        {title}
      </Typography>
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.md,
          backgroundColor: theme.colors.card,
          borderRadius: 18,
        }}
      >
        <Typography>{date.toJSON()}</Typography>
      </Pressable>
      <RNDatePicker
        modal
        mode={mode}
        title={title}
        confirmText={translate("common:confirm")}
        cancelText={translate("common:cancel")}
        locale={i18n.language}
        open={open}
        date={date}
        onConfirm={onConfirm}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};
