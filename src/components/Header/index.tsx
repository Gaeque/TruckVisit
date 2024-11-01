import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useAuth } from "../../hooks/useAuth";

import TeconLogo from "../../assets/TeconLogo.svg";
import IconLogout from "../../assets/IconLogout.svg";
import { UserAvatar } from "../Avatar";
import { styles } from "./styles";
import { Button } from "../Button";
import THEME from "../../THEME";

export function Header() {
  const { user, signOut } = useAuth();
  const [alertVisible, setAlertVisible] = useState(false);

  const handleSignOut = () => {
    setAlertVisible(true);
  };

  const confirmSignOut = () => {
    signOut();
    setAlertVisible(false);
  };

  const cancelSignOut = () => {
    setAlertVisible(false);
  };

  return (
    <View>
      <View style={styles.container}>
        <UserAvatar size={60} />
        <TeconLogo width={180} height={50} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.textLogout}>Sair</Text>
          <IconLogout width={28} height={34} />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textName}>{user.userName}</Text>
        <Text style={styles.textCPF}>CPF: {user.userCPF}</Text>
      </View>
      <Modal transparent={true} visible={alertVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.containerModal}>
            <Text style={styles.title}>Você deseja sair?</Text>
            <View style={styles.buttonContainer}>
              <Button
                onPress={cancelSignOut}
                title="Não"
                showIcon={false}
                size={{ width: 80, height: 40 }}
                backgroundColor={THEME.COLORS.ORANGE}
                textColor={THEME.COLORS.WHITE}
              />
              <Button
                onPress={confirmSignOut}
                title="Sim"
                showIcon={false}
                size={{ width: 80, height: 40 }}
                backgroundColor={THEME.COLORS.ORANGE}
                textColor={THEME.COLORS.WHITE}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
