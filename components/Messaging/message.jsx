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

  const Message = ({ route }) => {
  const { userId, recipientName, loggedInUserId } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Fetch messages from the backend
    fetchMessages();

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, []);

  const fetchMessages = () => {
    fetch(`${serverURL}/messaging/receive`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received messages:", data);
        setMessages(data);
      })
      .catch((error) => {
        console.log("Error retrieving messages:", error);
      });
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      const newMessage = {
        sender: loggedInUserId,
        content: inputText,
        userId: userId,
      };

      // Send message to the backend
      fetch(`${serverURL}/messaging/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Message sent successfully");
          } else {
            console.log("Failed to send message");
          }
        })
        .catch((error) => {
          console.log("Error sending message:", error);
        });

      // Display sent message immediately on UI
      const sentMessage = {
        ...newMessage,
        timestamp: new Date().toLocaleString(),
      };
      setMessages((prevMessages) => [...prevMessages, sentMessage]);

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
              item.sender === userId
                ? styles.clientMessage
                : styles.userMessage,
              item.sender === loggedInUserId
                ? styles.sentMessage
                : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageContent}>{item.content}</Text>
            <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messageListContainer}
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

export default Message;
