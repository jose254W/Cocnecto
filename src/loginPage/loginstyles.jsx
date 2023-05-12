import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SIZES.xLarge,
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.primary,
    backgroundColor: "#E6F3FF",
  },
  input: {
    width: "100%",
    height: 40,
    marginLeft: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
  },
  text: {
    marginBottom: 4,
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: "#FF7754",
  },
  button: {
    marginBottom: 16,
  },
});

export default styles;
