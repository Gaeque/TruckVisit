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
    height: 440,
    borderRadius: 20,
  },
  containerInputs: {
    gap: 20,
  },
  logo: {
    marginBottom: 20,
  },
  textError: {
    color: THEME.COLORS.RED,
    fontSize: 14,
    marginTop: -12,
    textAlign: "center",
  },
  backgroundImg: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(234, 105, 0, 0.4)",
  },
});
