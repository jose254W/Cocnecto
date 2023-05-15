import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: SIZES.xLarge,
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.primary,
    zIndex: 1,

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
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    top: '85%',
    transform: [{ translateY: -12 }],
  },
  text: {
    marginBottom: 4,
    justifyContent: "center",
    alignItems: "center",
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
  },
  button: {
    marginBottom: 16,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
});

export default styles;
