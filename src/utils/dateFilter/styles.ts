import { StyleSheet } from "react-native";
import THEME from "../../THEME";

export const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dates: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    flex: 1,
    backgroundColor: "#ddd",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginHorizontal: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  applyButton: {
    flex: 1,
    padding: 10,
    backgroundColor: THEME.COLORS.ORANGE,
    alignItems: "center",
    borderRadius: 5,
  },
  clearButton: {
    marginRight: 10,
    flex: 1,
    padding: 10,
    backgroundColor: THEME.COLORS.ORANGE,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600"
  },
});
