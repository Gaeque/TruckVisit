import { StyleSheet } from "react-native";
import THEME from "../../THEME";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: 8,
    alignItems: "center",
  },
  filterButtonsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 40,
    marginTop: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "center",
    color: THEME.COLORS.BLACK,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 8,
    width: "50%",
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: THEME.COLORS.WHITE,
    fontWeight: "900",
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", 
    gap: 20,
  },
});
