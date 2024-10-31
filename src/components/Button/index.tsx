import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";
import LoginIcon from "../../assets/IconLogin.svg";
import { ReactNode } from "react";

type ButtonProps = TouchableOpacityProps & {
  title: string | ReactNode;
  showIcon?: boolean;
};

export function Button({ title, showIcon = true, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.text}>{title}</Text>
      {showIcon && <LoginIcon style={styles.icon} />}
    </TouchableOpacity>
  );
}
