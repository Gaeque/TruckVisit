import React from "react";
import { Snackbar } from "react-native-paper";
import { Text } from "react-native";
import theme from "../../THEME";

type SnackbarProps = {
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
  text: string;
};

export function SnackBar({
  visible,
  onDismiss,
  text,
  duration = 3000,
}: SnackbarProps) {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      action={{
        label: "Fechar",
        onPress: onDismiss,
      }}
      style={{ backgroundColor: theme.COLORS.WHITE, borderRadius: 20 }}
    >
      <Text style={{ color: theme.COLORS.ORANGE, textAlign: "center", fontSize: 20 }}>
        {text}
      </Text>
    </Snackbar>
  );
}
