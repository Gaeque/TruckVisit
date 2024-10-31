import React from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  ImageBackground,
} from "react-native";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { UserAvatar } from "../../components/Avatar";
import { styles } from "./styles";

import LogoTecon from "../../assets/TeconLogo.svg";
import BackgroundImg from "../../assets/TeconBackground.png";

import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import { useNavigation } from "@react-navigation/native";

import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const senhaSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Senhas devem ser iguais.")
    .required("Confirmação de senha é obrigatória"),
});

export function ConfirmPassword() {
  const navigator = useNavigation<AuthNavigatorRoutesProps>();

  function handleLogin() {
    navigator.navigate("SignIn");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(senhaSchema),
    mode: "onChange",
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={BackgroundImg}
        style={styles.backgroundImg}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
      </ImageBackground>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.containerForm}>
            <View>
              <LogoTecon width={200} height={60} />
            </View>
            <View style={styles.containerProfile}>
              <UserAvatar size={48} />
              <View style={styles.containerTextProfile}>
                <Text style={styles.textName}>Gaeque Luan</Text>
                <Text style={styles.textCpf}>111000111000</Text>
              </View>
            </View>
            <View style={styles.containerInputs}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Nova Senha"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Text style={styles.textError}>{errors.password?.message}</Text>

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Confirmar Senha"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Text style={styles.textError}>
                {errors.confirmPassword?.message}
              </Text>
            </View>
            <Button title="Entrar" onPress={handleSubmit(handleLogin)} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
