import { Dimensions, StyleSheet } from "react-native";
import THEME from "../../THEME";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.COLORS.BLACK
  },
  imageContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  backHome: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.COLORS.ORANGE,
  },
});
