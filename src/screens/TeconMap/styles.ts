import { Dimensions, StyleSheet } from "react-native";
import THEME from "../../THEME";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME.COLORS.BLACK,
  },
  backHome: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 999,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: THEME.COLORS.ORANGE,
    padding: 4,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.COLORS.BLACK,
  },
});
