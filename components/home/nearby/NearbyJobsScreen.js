import React from "react";
import { View, Text } from "react-native";
import  Mixologies  from "./Nearbyjobs";
import styles from "./nearbyjobs.style";

const NearbyJobsScreen = () => {
    return (
      <View style={styles.container}>
        <Text> View Mixologies</Text>
        <Mixologies />
      </View>
    );
  };
  
  export default NearbyJobsScreen;
  