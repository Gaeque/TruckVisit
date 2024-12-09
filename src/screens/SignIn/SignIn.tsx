import React, { useState } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  ImageBackground,
} from "react-native";

import { styles } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";

import LogoTecon from "../../assets/TeconLogo.svg";
import BackgroundImg from "../../assets/TeconBackground.png";

import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../hooks/useAuth";
import { SnackBar } from "../../components/SnackBar";
import { AppError } from "../../utils/AppError/AppError";

const validarCPF = (cpf: string) => {
  if (cpf.length !== 11) return false;

  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

export function SignIn() {
  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [cpfValue, setCpfValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [cpfError, setCpfError] = useState<string | null>(null);

  async function handleSignIn() {
    if (cpfError) return;

    try {
      setIsLoading(true);
      await signIn(cpfValue, passwordValue, navigation);
    } catch (error) {
      const errorMessage =
        error instanceof AppError
          ? error.message
          : "Usuário ou senha incorretos. Tente novamente.";
      setSnackbarMessage(errorMessage);
      setSnackbarVisible(true);
    } finally {
      setIsLoading(false);
      setCpfValue("");
      setPasswordValue("");
    }
  }

  const handleCpfChange = (text: string) => {
    const formattedText = text.replace(/\D/g, "").slice(0, 11);
    setCpfValue(formattedText);

    if (formattedText.length === 11) {
      if (validarCPF(formattedText)) {
        setCpfError(null);
      } else {
        setCpfError("O CPF é inválido. Verifique os números.");
      }
    } else {
      setCpfError(null);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={BackgroundImg}
        style={styles.backgroundImg}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
      </ImageBackground>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.container}>
            <View style={styles.containerForm}>
              <View>
                <LogoTecon style={styles.logo} width={200} height={60} />
              </View>
              <View style={styles.containerInputs}>
                <Input
                  placeholder="CPF"
                  value={cpfValue}
                  onChangeText={handleCpfChange}
                  keyboardType="numeric"
                />
                {cpfError && <Text style={styles.textError}>{cpfError}</Text>}
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  value={passwordValue}
                  onChangeText={setPasswordValue}
                  onSubmitEditing={handleSignIn}
                />
              </View>
              <Button
                title={isLoading ? <Loading /> : "Entrar"}
                onPress={handleSignIn}
                disabled={isLoading || cpfError !== null}
                showIcon={false}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <SnackBar
        visible={snackbarVisible}
        duration={3000}
        onDismiss={() => setSnackbarVisible(false)}
        text={snackbarMessage}
      />
    </KeyboardAvoidingView>
  );
}
