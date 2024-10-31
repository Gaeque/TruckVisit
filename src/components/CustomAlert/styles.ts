import { StyleSheet } from "react-native";
import THEME from "../../THEME";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  container: {
    width: 300,
    padding: 20,
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "500"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: THEME.COLORS.ORANGE,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: THEME.COLORS.WHITE,
    fontWeight: "bold",
  },
});
