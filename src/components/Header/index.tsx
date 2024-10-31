import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../hooks/useAuth";

import TeconLogo from "../../assets/TeconLogo.svg";
import IconLogout from "../../assets/IconLogout.svg";
import { UserAvatar } from "../Avatar";
import { CustomAlert } from "../CustomAlert"; 

import { styles } from "./styles";

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
        <TeconLogo width={200} height={60} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.textLogout}>Sair</Text>
          <IconLogout width={28} height={34} />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textName}>{user.userName}</Text>
        <Text style={styles.textCPF}>CPF: {user.userCPF}</Text>
      </View>
      <CustomAlert
        visible={alertVisible}
        onConfirm={confirmSignOut}
        onCancel={cancelSignOut}
      />
    </View>
  );
}
