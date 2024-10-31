import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { styles } from "./styles";

type CustomAlertProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function CustomAlert({
  visible,
  onConfirm,
  onCancel,
}: CustomAlertProps) {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Você deseja sair?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCancel} style={styles.button}>
              <Text style={styles.buttonText}>Não</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.button}>
              <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
