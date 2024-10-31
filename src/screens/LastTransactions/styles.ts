import { StyleSheet } from "react-native";
import THEME from "../../THEME";

export const styles = StyleSheet.create({
  header: {
    backgroundColor: THEME.COLORS.ORANGE,
    width: "100%",
    height: 68,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  noTransactionsContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  noTransactionsText: {
    fontSize: 18,
    fontWeight: "600",
    color: THEME.COLORS.ORANGE,
    textAlign: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: THEME.COLORS.WHITE,
  },
  cardsTransactions: {
    marginBottom: -20,
  },
  pdfContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  sharePdfContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 2,
  },
  sharePdf: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  numberOfPages: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 2,
    padding: 5,
    borderRadius: 5,
  },
  closePdf: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 2,
  },
});
