import { FC } from "react";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  AntDesign,
  Feather,
  Foundation,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StyleProp, TextStyle } from "react-native";
import { colors } from "@/theme";
import { SpacingProps, useAppTheme, useSpacing } from "@/hooks";
import { isRTL } from "@/i18n";

export const iconFamilies = {
  FontAwesome,
  Ionicons,
  Feather,
  Foundation,
  Entypo,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
};

type Sizes = keyof typeof $sizeStyles;

export type IconProps = {
  name: string;
  family?: keyof typeof iconFamilies;
  size?: Sizes;
  color?: keyof typeof colors;
  style?: TextStyle;
  onPress?: () => void;
  onLongPress?: () => void;
  testID?: string;
} & SpacingProps;

export const Icon: FC<IconProps> = ({
  testID,
  name,
  family,
  size = "md",
  color,
  style: $overrideStyle,
  onPress,
  onLongPress,
  ...rest
}) => {
  const { themed, theme } = useAppTheme();
  const $spacing = useSpacing(rest);

  let IconComponent: any =
    (family && iconFamilies[family]) || iconFamilies.Feather;

  const iconExists =
    IconComponent.glyphMap && IconComponent.glyphMap.hasOwnProperty(name);

  // If the icon doesn't exist in the specified family, find it in other families

  if (!iconExists) {
    for (const iconFamily of Object.values(iconFamilies)) {
      if (
        iconFamily &&
        iconFamily.glyphMap &&
        iconFamily.glyphMap.hasOwnProperty(name)
      ) {
        IconComponent = iconFamily;
        break;
      }
    }
  }
  const handlePress = () => onPress;
  const handleLongPress = () => onLongPress;

  const $styles: StyleProp<TextStyle> = [$rtlStyle, $spacing, $overrideStyle];
  const $color = (color && theme.colors[color]) || theme.colors.text;

  return (
    <IconComponent
      testID={testID}
      name={name}
      size={$sizeStyles[size].fontSize}
      color={$color}
      style={$styles}
      onPress={onPress && handlePress}
      onLongPress={onLongPress && handleLongPress}
      suppressHighlighting
    />
  );
};

const $sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 } satisfies TextStyle,
  xl: { fontSize: 32, lineHeight: 34 } satisfies TextStyle,
  lg: { fontSize: 28, lineHeight: 32 } satisfies TextStyle,
  md: { fontSize: 24, lineHeight: 26 } satisfies TextStyle,
  sm: { fontSize: 22, lineHeight: 24 } satisfies TextStyle,
  xs: { fontSize: 18, lineHeight: 21 } satisfies TextStyle,
  xxs: { fontSize: 16, lineHeight: 18 } satisfies TextStyle,
};
const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {};
