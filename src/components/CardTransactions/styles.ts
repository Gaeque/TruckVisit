import { StyleSheet } from "react-native";
import THEME from "../../THEME";

export const styles = StyleSheet.create({
  container: { width: "100%", padding: 8 },
  card: {
    width: "100%",
    height: "auto",
    borderRadius: 10,
    borderColor: THEME.COLORS.GREEN,
    borderWidth: 2.8,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  containerPlacaTransacoes: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.COLORS.ORANGE,
    textAlign: "center",
    paddingBottom: 6,
  },
  paragrafo: {
    fontSize: 16,
    color: THEME.COLORS.BLACK,
    fontWeight: "400",
    paddingBottom: 4,
  },
  containerData: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerTicket: {
    paddingBottom: 30,
    alignItems: "flex-end",
  },
  containerList: {
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  containerItem: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: THEME.COLORS.ORANGE,
  },
  containerName: {
    fontSize: 14,
    color: THEME.COLORS.BLACK,
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  modalContent: {
    width: 300,
    height: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: THEME.COLORS.ORANGE,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContainer: {
    flexDirection: "column",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  ticketCard: {
    width: "100%",
    backgroundColor: THEME.COLORS.ORANGE,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 80,
  },
  ticketText: {
    color: THEME.COLORS.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
  closeModalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 2,
    borderColor: THEME.COLORS.ORANGE,
  },
  closeModalButtonText: {
    color: THEME.COLORS.ORANGE,
    fontSize: 16,
    fontWeight: "bold",
  },
});
