import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  recipientName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  messageListContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  messageBubble: {
    backgroundColor: "#e9e9e9",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    maxWidth: "70%",
  },
  clientMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
  },
  userMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  },
  messageContent: {
    fontSize: 16,
    marginBottom: 4,
  },
  messageTimestamp: {
    fontSize: 12,
    color: "#888",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#4caf50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
