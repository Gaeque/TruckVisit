import React from "react";
import { View, Text, ImageBackground } from "react-native";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { styles } from "./styles";

import LogoTecon from "../../assets/TeconLogo.svg";
import BackgroundImg from "../../assets/TeconBackground.png";

import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { api } from "../../services/api";

type ConfirmPasswordRouteParams = {
  userName: string;
  userCPF: string;
  userGkey: string;
};

const senhaSchema = yup.object().shape({
  password: yup
    .string()
    .required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Senhas devem ser iguais.")
    .required("Confirmação de senha é obrigatória"),
  phoneNumber: yup
    .string()
    .matches(
      /^\(\d{2}\)\s9\s\d{4}-\d{4}$/,
      "Formato esperado: (ex: DDD123456789)"
    )
    .required("O número de telefone é obrigatório"),
});

const formatPhoneNumber = (phone: string) => {
  let formattedPhone = phone.replace(/\D/g, "");

  if (formattedPhone.length > 2) {
    formattedPhone = `(${formattedPhone.slice(0, 2)})${
      formattedPhone.length > 3 ? " " : ""
    }${formattedPhone.slice(2, 3)}${
      formattedPhone.length > 3 ? " " : ""
    }${formattedPhone.slice(3, 7)}${
      formattedPhone.length > 7 ? "-" : ""
    }${formattedPhone.slice(7, 11)}`;
  } else if (formattedPhone.length > 1) {
    formattedPhone = `(${formattedPhone}`;
  }
  return formattedPhone;
};

export function ConfirmPassword() {
  const navigator = useNavigation<AuthNavigatorRoutesProps>();
  const route = useRoute();
  const { userName, userCPF, userGkey } =
    route.params as ConfirmPasswordRouteParams;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(senhaSchema),
    mode: "onBlur",
  });

  async function handleConfirmPasswordFirstLogin(data: {
    password: string;
    phoneNumber: string;
  }) {
    try {
      const { password, phoneNumber } = data;

      const payload = {
        userGkey,
        password,
        phone: phoneNumber.replace(/\D/g, ""),
      };

      console.log("payload:", payload);

      const response = await api.put(
        `api-app-truckvisit/driver/setPWD`,
        payload
      );

      console.log("response:", response.data);

      if (response.status === 200) {
        alert("Senha atualizada com sucesso!");
        navigator.navigate("SignIn");
      }
    } catch (error) {
      alert("Erro ao atualizar senha. Tente novamente.");
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={BackgroundImg}
        style={styles.backgroundImg}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
      </ImageBackground>

      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.containerForm}>
            <LogoTecon width={200} height={60} />
            <View style={styles.containerProfile}>
              <View style={styles.containerTextProfile}>
                <Text style={styles.textName}>{userName}</Text>
                <Text style={styles.textCpf}>{userCPF}</Text>
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
              {errors.password && (
                <Text style={styles.textError}>{errors.password.message}</Text>
              )}

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
              {errors.confirmPassword && (
                <Text style={styles.textError}>
                  {errors.confirmPassword.message}
                </Text>
              )}

              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Telefone"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(formatPhoneNumber(text))}
                    value={value}
                  />
                )}
              />
              {errors.phoneNumber && (
                <Text style={styles.textError}>
                  {errors.phoneNumber.message}
                </Text>
              )}
            </View>

            <Button
              title="Entrar"
              onPress={handleSubmit(handleConfirmPasswordFirstLogin)}
              showIcon={false}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
