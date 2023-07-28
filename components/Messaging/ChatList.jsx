import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

import { getAuth, getUser } from "firebase/auth";
import styles from "./ChatList.styles";

const ChatList = () => {
  const route = useRoute();
  const { userId, recipientName, loggedInUserId } = route.params;
  const navigation = useNavigation();
  const [senders, setSenders] = useState([]);

  useEffect(() => {
    fetchSenders();
  }, []);

  const fetchSenders = async () => {
    try {
      const response = await axios.get(
        `http://192.168.100.43:3000/messaging/messages/sender/${loggedInUserId}`
      );
      const messagesData = response.data;

      // Group messages by senderId
      const groupedMessages = messagesData.reduce((result, message) => {
        const senderId = message.sender;
        if (!result[senderId]) {
          result[senderId] = [];
        }
        result[senderId].push(message);
        return result;
      }, {});

      // Fetch the sender's display name for each senderId and create an array of senders with messages
      const sendersData = await Promise.all(
        Object.keys(groupedMessages).map(async (senderId) => {
          const displayName = await getSenderDisplayName(senderId);
          return { senderId, displayName, messages: groupedMessages[senderId] };
        })
      );
      setSenders(sendersData);
    } catch (error) {
      console.log("Error fetching senders:", error);
    }
  };

  const getSenderDisplayName = async (senderId) => {
    try {
      const auth = getAuth();
      const user = await getUser(auth, senderId);

      if (user) {
        return user.displayName || "Unknown";
      } else {
        return "Unknown";
      }
    } catch (error) {
      console.log("Error fetching sender display name:", error);
      return "Unknown";
    }
  };

  const handleChatClick = (senderMessages) => {
    navigation.navigate("Message", {
      loggedInUserId,
      userId,
      recipientName,
      senderMessages,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat List</Text>
      <FlatList
        data={senders}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => handleChatClick(item.messages)}
          >
            <Text style={styles.chatName}>Sender: {item.displayName}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.senderId}
      />
    </View>
  );
};

export default ChatList;
