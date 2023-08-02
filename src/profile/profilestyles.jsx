import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    height: "100%",
    backgroundColor: "#f5f5f5",
    color: COLORS.primary,
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  entryContainer: {
    marginBottom: 20,
  },
  displayText: {
    marginBottom: 10,
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "#ccc",
    backgroundColor: "#E6F3FF",
  },
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: "#C1C0C8",
    color: "#000000",
  },
  availabilityContainer: {
    marginBottom: 20,
  },
  buttonWrapper: {
    marginTop: 10,
  },
  genderContainer: {
    marginBottom: 20,
  },
  genderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chooseGenderButton: {
    marginBottom: 10,
  },
  genderOptions: {
    marginBottom: 10,
  },
  genderButton: {
    flex: 1,
    marginRight: 10,
  },
  selectedGenderButton: {
    backgroundColor: "blue",
    color: "white",
  },
  cancelButton: {
    marginTop: 10,
  },
});

export default styles;
