import { StyleSheet } from "react-native";
import THEME from "../../THEME";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 8,
  },
  card: {
    width: "100%",
    borderRadius: 10,
    borderColor: THEME.COLORS.GREY2,
    borderWidth: 2.8,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  leftColumn: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  centerColumn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  bottomColumn: {
    alignItems: "center",
    marginBottom: 4,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.COLORS.ORANGE,
  },
  paragrafo: {
    fontSize: 16,
    color: THEME.COLORS.BLACK,
    fontWeight: "400",
    paddingBottom: 4,
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
    width: "90%",
    height: 500,
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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
});
