import React from "react";
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

type FormDataProps = {
  name?: string | null;
  password?: string | null;
  confirm_password?: string | null;
  old_password?: string | null;
};

const profileSchema = yup.object({
  name: yup.string().nullable(),
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
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FormDataProps) => {
    reset({
      old_password: "",
      password: "",
      confirm_password: "",
    });
    console.log("Iniciando atualização");

    setTimeout(() => {
      console.log("Senha alterada");
    }, 2000);
  };

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
            name="old_password"
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
            name="confirm_password"
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
          {errors.confirm_password && (
            <Text style={styles.textError}>
              {errors.confirm_password.message}
            </Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Atualizar perfil"
            showIcon={false}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
