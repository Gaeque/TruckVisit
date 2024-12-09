import { TextInput, TextInputProps } from "react-native-paper";

import { styles } from "./styles";
import THEME from "../../THEME";

export function Input(props: TextInputProps) {
  return (
    <TextInput
      style={styles.container}
      mode="outlined"
      underlineColor="transparent"
      outlineStyle={{ borderWidth: 2, borderColor: THEME.COLORS.ORANGE }}
      {...props}
    />
  );
}
