import { useAppTheme } from "@/hooks";
import { $styles, colors } from "@/theme";
import { FC } from "react";
import { View } from "react-native";

type BackgroundProps = {
  color: keyof typeof colors;
  opacity?: number;
};

export const Background: FC<BackgroundProps> = ({ color, opacity = 0.3 }) => {
  const { theme } = useAppTheme();
  return (
    <View
      style={[
        $styles.absoluteFill,
        {
          backgroundColor: theme.colors[color],
          opacity,
        },
      ]}
    />
  );
};
