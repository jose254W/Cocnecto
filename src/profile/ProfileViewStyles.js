import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height: "100%",
    width: "100%",
    backgroundColor: "#E6F3FF",
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  entryContainer: {
    marginBottom: 8,
  },
});

export default styles;
