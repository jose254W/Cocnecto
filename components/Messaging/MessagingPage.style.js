import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  recipientName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  messageListContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  messageBubble: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    maxWidth: "80%",
  },
  clientMessage: {
    backgroundColor: "#E6F6FF",
    alignSelf: "flex-start",
  },
  userMessage: {
    backgroundColor: "#E2FFE2",
    alignSelf: "flex-end",
  },
  messageContent: {
    fontSize: 16,
  },
  messageTimestamp: {
    fontSize: 12,
    color: "#888888",
    marginTop: 4,
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
    borderColor: "#CCCCCC",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  sentMessage: {
    backgroundColor: "#E8F0FF",
    alignSelf: "flex-start",
  },
  receivedMessage: {
    backgroundColor: "#F4F4F4",
    alignSelf: "flex-end",
  },
  
});

export default styles;
