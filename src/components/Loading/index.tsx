import React from "react";
import { ActivityIndicator } from "react-native-paper";
import THEME from "../../THEME";

type LoadingProps = {
  size?: number;
  color?: string;
};

export function Loading({ size = 24, color = THEME.COLORS.ORANGE }: LoadingProps) {
  return (
    <ActivityIndicator
      style={{ flex: 1 }}
      animating={true}
      color={color}
      size={size}
    />
  );
}
