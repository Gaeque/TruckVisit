import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";
import LoginIcon from "../../assets/IconLogin.svg";
import { ReactNode } from "react";

type ButtonProps = TouchableOpacityProps & {
  title: string | ReactNode;
  showIcon?: boolean;
  size?: { width?: number; height?: number };
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
};

export function Button({
  title,
  showIcon = true,
  size,
  backgroundColor,
  borderColor,
  textColor,
  fontSize,
  fontWeight,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        size ? { width: size.width, height: size.height } : {},
        backgroundColor ? { backgroundColor } : {},
        borderColor ? { borderColor } : {},
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.text,
          textColor ? { color: textColor } : {},
          fontSize ? { fontSize } : {},
          fontWeight ? { fontWeight } : {},
        ]}
      >
        {title}
      </Text>
      {showIcon && <LoginIcon style={styles.icon} />}
    </TouchableOpacity>
  );
}
