import { StyleSheet } from "react-native";
import THEME from "../../THEME";

export const styles = StyleSheet.create({
  container: {
    width: 260,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: THEME.COLORS.ORANGE,
    position: "relative",
  },
  text: {
    fontSize: 20,
    fontWeight: "800",
    color: THEME.COLORS.ORANGE,
    letterSpacing: 1.4,
  },
  iconContainer: {
    marginLeft: 2, 
  },
  icon: {
    position: "absolute",
    left: 14,
  },
});
