import { StyleSheet } from "react-native";
import THEME from "../../THEME";

export const styles = StyleSheet.create({
  header: {
    backgroundColor: THEME.COLORS.ORANGE,
    width: "100%",
    height: 60,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: THEME.COLORS.WHITE,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  noAppointmentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  noAppointmentText: {
    fontSize: 14,
    fontWeight: "600",
    color: THEME.COLORS.ORANGE,
    textAlign: "center",
  },
});
