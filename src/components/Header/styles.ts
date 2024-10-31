import { StyleSheet } from "react-native";
import THEME from "../../THEME";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.ORANGE,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    paddingHorizontal: 20
  },
  logoutButton: {
    right: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 68,
    height: 40,
    borderWidth: 1,
    borderColor: THEME.COLORS.WHITE,
    backgroundColor: THEME.COLORS.ORANGE,
  },
  textLogout: {
    marginRight: 5,
    color: THEME.COLORS.WHITE,
    fontSize: 14,
  },
  textContainer: {
    flexDirection: "column",
    paddingHorizontal: 20,
    alignItems: "flex-start",
    backgroundColor: THEME.COLORS.GREEN,
    width: "100%",
    height: "auto",
  },
  textName: {
    textAlign: "left",
    color: THEME.COLORS.WHITE,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 2,
  },
  textCPF: {
    color: THEME.COLORS.GREY,
    fontSize: 14,
    marginTop: 2,
    marginBottom: 4,
    fontWeight: "500",
  },
});
