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
    height: 480,
    borderRadius: 20,
  },
  containerProfile: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 0,
    width: "100%",
    justifyContent: "flex-start",
  },
  textName: {
    fontSize: 16,
    fontWeight: "600",
  },
  textCpf: {
    fontSize: 10,
  },
  containerTextProfile: {
    marginLeft: 10,
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
