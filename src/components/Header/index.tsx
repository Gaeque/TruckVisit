import React, { useState } from "react";
import { View, Text, Modal } from "react-native";

import { useAuth } from "../../hooks/useAuth";

import { styles } from "./styles";
import THEME from "../../THEME";

import TeconLogo from "../../assets/TeconLogo.svg";
import IconLogout from "../../assets/IconLogout.svg";

import { UserAvatar } from "../Avatar";
import { Button } from "../Button";

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
        <Button
          title="Sair"
          textColor={THEME.COLORS.WHITE}
          borderColor={THEME.COLORS.GREY}
          iconComponent={<IconLogout />}
          size={{ width: 64, height: 34 }}
          fontSize={12}
          onPress={handleSignOut}
        />
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
                fontSize={14}
                borderColor={THEME.COLORS.ORANGE}
                backgroundColor={THEME.COLORS.WHITE}
                showIcon={false}
                size={{ width: 80, height: 40 }}
                textColor={THEME.COLORS.ORANGE}
              />
              <Button
                onPress={confirmSignOut}
                title="Sim"
                fontSize={14}
                borderColor={THEME.COLORS.ORANGE}
                backgroundColor={THEME.COLORS.WHITE}
                size={{ width: 80, height: 40 }}
                textColor={THEME.COLORS.ORANGE}
                showIcon={false}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
