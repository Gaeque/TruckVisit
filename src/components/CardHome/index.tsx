import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Card as PaperCard } from "react-native-paper";

import { styles } from "./styles";

type CardHomeProps = {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
};

export function CardHome({ icon, title, onPress }: CardHomeProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPress}
    >
      <PaperCard style={styles.card}>
        <View style={styles.icon}>{icon}</View>
        <Text style={styles.text}>{title}</Text>
      </PaperCard>
    </TouchableOpacity>
  );
}
