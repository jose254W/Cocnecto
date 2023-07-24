import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute  } from "@react-navigation/native";
import axios from "axios";
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
      const response = await axios.get('http://192.168.100.43:3000/messaging/senders');
      const sendersData = response.data;
      console.log(sendersData )
      setSenders(sendersData); 
    } catch (error) {
      console.log('Error fetching senders:', error);
    }
  };

  const handleChatClick = () => {
    navigation.navigate('Message', {
      loggedInUserId,
      userId,
      recipientName,
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
            onPress={() => handleChatClick(item, 'Recipient Name')} 
          >
            <Text style={styles.chatName}>{recipientName}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default ChatList;
