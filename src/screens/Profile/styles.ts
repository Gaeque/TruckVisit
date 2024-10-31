import { StyleSheet } from "react-native";
import THEME from "../../THEME";

export const styles = StyleSheet.create({
  userContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonChangePhoto: {
    backgroundColor: THEME.COLORS.ORANGE,
    width: 120,
    height: 40,
    borderRadius: 4,
    marginTop: 10,
  },
  textChangePhoto: {
    fontSize: 16,
    padding: 10,
    color: THEME.COLORS.WHITE,
    fontWeight: "900",
    textAlign: "center",
  },
  inputsUser: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  inputsPassword: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  textChangePassword: {
    fontSize: 18,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  textError: {
    color: THEME.COLORS.RED,
    fontSize: 14,
  },
});
