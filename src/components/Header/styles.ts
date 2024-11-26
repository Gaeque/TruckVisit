import { StyleSheet } from "react-native";
import THEME from "../../THEME";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.ORANGE,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 20,
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
    fontSize: 16,
    fontWeight: "900",
    marginTop: 2,
  },
  textCPF: {
    color: THEME.COLORS.GREY,
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  containerModal: {
    width: 300,
    padding: 20,
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    width: "100%",
  }
});
