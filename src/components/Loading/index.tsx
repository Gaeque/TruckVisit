import React from "react";
import { ActivityIndicator } from "react-native-paper";
import THEME from "../../THEME";

type LoadingProps = {
  size?: number;
};

export function Loading({ size = 24 }: LoadingProps) {
  return (
    <ActivityIndicator
      style={{ flex: 1 }}
      animating={true}
      color={THEME.COLORS.ORANGE}
      size={size}
    />
  );
}
