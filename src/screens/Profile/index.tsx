import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Header } from "../../components/Header";
import { UserAvatar } from "../../components/Avatar";
import { styles } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";

type FormDataProps = {
  password?: string | null;
  confirmPassword?: string | null;
  oldPassword?: string | null;
};

const profileSchema = yup.object({
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password"), null], "A confirmação de senha não confere.")
    .when("password", {
      is: (Field: any) => Field,
      then: (schema) =>
        schema
          .nullable()
          .required("Informe a confirmação da senha")
          .transform((value) => (!!value ? value : null)),
    }),
});

export function Profile() {
  const { gKey: userGkey } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema),
    mode: "onChange",
  });

  async function handleChangePassword(data: {
    oldPassword: string;
    password: string;
  }) {
    try {
      const { oldPassword, password } = data;

      console.log(data)

      const payload = {
        userGkey,
        oldPassword,
        password: password,
      };

      console.log("payload:", payload);

      const response = await api.put(
        `api-app-truckvisit/driver/setPWD`,
        payload
      );

      console.log("response:", response.data);

      if (response.status === 200) {
        alert("Senha atualizada com sucesso!");
      }
    } catch (error) {
      alert(
        "Erro ao atualizar a senha. Verifique se a senha antiga está correta."
      );
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
            name="oldPassword"
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
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Atualizar"
            showIcon={false}
            onPress={handleSubmit((data) =>
              handleChangePassword({
                oldPassword: data.oldPassword || "",
                password: data.password || "",
              })
            )}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
