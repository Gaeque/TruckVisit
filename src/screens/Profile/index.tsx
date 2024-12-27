import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Header } from "../../components/Header";
import { UserAvatar } from "../../components/Avatar";
import { styles } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import THEME from "../../THEME";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";

import { AuthContext } from "../../contexts/AuthContext";

import { api } from "../../services/api";

type FormDataProps = {
  password: string;
  confirmPassword: string;
  oldpassword: string;
  phone: string;
  userGkey: string;
};

const profileSchema = yup.object({
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirmPassword: yup
    .string()
    .test(
      "is-valid-confirmPassword",
      "A confirmação de senha não confere.",
      (value, context) => {
        const password = context.parent.password;
        return !value || value === password;
      }
    )
    .nullable()
    .transform((value) => (!!value ? value : null)),
  phone: yup
    .string()
    .test(
      "is-valid-phone",
      "Formato esperado: (ex: DDD123456789)",
      (value) => !value || /^\(\d{2}\)\s9\s\d{4}-\d{4}$/.test(value)
    ),
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

export function Profile() {
  const { gKey: userGkey, phone } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema as any),
    mode: "onBlur",
  });

  async function handleChangePassword(data: {
    userGkey: string;
    oldpassword: string;
    password: string;
    phone?: string;
  }) {
    setIsLoading(true);
    try {
      const { password, oldpassword, phone } = data;

      const payload = {
        userGkey,
        oldpassword,
        password,
        phone: phone?.replace(/\D/g, "") ?? " ",
      };

      const response = await api.put(
        `api-app-truckvisit/driver/setPWD`,
        payload
      );
      if (response.status === 200) {
        alert("Senha atualizada com sucesso!");
      }
    } catch (error) {
      alert("Erro ao atualizar a senha. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.userContainer}>
          <TouchableOpacity>
            <UserAvatar size={160} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputsPassword}>
          <Text style={styles.textChangePassword}>Alterar senha</Text>

          <Controller
            control={control}
            name="oldpassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value || ""}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value || ""}
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
                placeholder="Confirme sua nova senha"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value || ""}
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
            name="phone"
            defaultValue={formatPhoneNumber(phone || "")}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Telefone"
                keyboardType="numeric"
                onBlur={onBlur}
                value={value || ""}
                onChangeText={(text) => {
                  const formatted = formatPhoneNumber(text);
                  onChange(formatted);
                }}
              />
            )}
          />

          {errors.phone && (
            <Text style={styles.textError}>{errors.phone.message}</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={isLoading ? <Loading /> : "Atualizar"}
            showIcon={false}
            backgroundColor={THEME.COLORS.ORANGE}
            textColor={THEME.COLORS.WHITE}
            onPress={handleSubmit(handleChangePassword)}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
