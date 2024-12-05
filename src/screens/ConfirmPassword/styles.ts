import { StyleSheet } from "react-native";
import THEME from "../../THEME";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerForm: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 40,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    backgroundColor: THEME.COLORS.WHITE,
    width: "80%",
    height: 540,
    borderRadius: 20,
    gap: 10,
  },
  containerProfile: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  textName: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.COLORS.BLACK,
  },
  textCpf: {
    fontSize: 12,
    fontWeight: "500",
    color: THEME.COLORS.GREEN,
  },
  containerInputs: {
    gap: 4,
  },
  containerTextProfile: {
    flexDirection: "column",
  },
  backgroundImg: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  textError: {
    color: THEME.COLORS.RED,
    fontSize: 12,
    marginLeft: 4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(234, 105, 0, 0.4)",
  },
});
