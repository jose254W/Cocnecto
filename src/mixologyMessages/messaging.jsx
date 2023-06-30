import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import io from "socket.io-client";
import styles from "./MessagingPage.style";

const serverURL = "http://192.168.100.43:3000";
const socket = io(serverURL);

const Messaging = ({ route }) => {
  const { recipientId, recipientName } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, []);

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      const newMessage = {
        senderId: "clientId",
        recipientId,
        content: inputText,
        timestamp: new Date().toLocaleString(),
      };
      socket.emit("send", newMessage);
      setInputText("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.recipientName}>{recipientName}</Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.senderId === "clientId"
                ? styles.clientMessage
                : styles.userMessage,
            ]}
          >
            <Text style={styles.messageContent}>{item.content}</Text>
            <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messageListContainer}
        inverted // To display the latest messages at the bottom
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Messaging;
