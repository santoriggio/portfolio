import { SpacingProps, useAppTheme, useSpacing } from "@/hooks";
import { TxKeyPath, translate } from "@/i18n";
import { FC, ReactNode } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { Typography } from "../Typography";
import { colors } from "@/theme";
import { TOptions } from "i18next";
import { Icon, IconProps } from "../Icon";

export type InputProps = {
  tx?: TxKeyPath;
  children?: ReactNode;
  description?: TxKeyPath;
  placeholder?: TxKeyPath;
  onChangeText?: (text: string) => void;
  textarea?: boolean;
  value?: string;
  message?: {
    color?: keyof typeof colors;
    tx?: TxKeyPath;
    text?: string;
    txOptions?: TOptions;
    icon?: string;
    iconProps?: Omit<IconProps, "name">;
  };
} & SpacingProps &
  TextInputProps;

export const Input: FC<InputProps> = ({
  tx,
  children,
  placeholder,
  message,
  description,
  onChangeText,
  textarea,
  value,
  ...rest
}) => {
  const { theme } = useAppTheme();
  const title = tx ? translate(tx) : children;
  const $spacing = useSpacing(rest);
  return (
    <View style={[$spacing]}>
      <View style={{ marginBottom: theme.spacing.sm }}>
        <Typography marginLeft="md" preset="bold">
          {title}
        </Typography>
        {description && (
          <Typography
            tx={description}
            numberOfLines={3}
            color="gray"
            size="xs"
            marginHorizontal="md"
          />
        )}
      </View>
      <View
        style={{
          borderWidth: message && message.color ? 1 : 0,
          borderColor: message && message.color && theme.colors[message.color],
          backgroundColor: theme.colors.card,
          borderRadius: 18,
        }}
      >
        <TextInput
          value={value}
          placeholder={placeholder && translate(placeholder)}
          placeholderTextColor={theme.colors.gray}
          selectionColor={theme.colors.primary}
          cursorColor={theme.colors.primary}
          onChangeText={onChangeText}
          multiline={textarea}
          style={{
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.md,
            fontSize: 16,
            minHeight: textarea ? 100 : undefined,
            color: theme.colors.text,
          }}
          {...rest}
        />
      </View>
      {message && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: theme.spacing.md,
            marginTop: theme.spacing.sm,
          }}
        >
          {message.icon && (
            <Icon
              marginRight="xs"
              size="xs"
              name={message.icon}
              color={message.color}
              {...message.iconProps}
            />
          )}
          <Typography
            color={message.color}
            size="xs"
            tx={message.tx}
            txOptions={message.txOptions}
          >
            {message.text}
          </Typography>
        </View>
      )}
    </View>
  );
};
