import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./nearbyjobcard.style";

const NearbyJobCard = ({ profile, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
     
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{profile.fullName}</Text>
          <Text style={styles.location}>{profile.location}</Text>
        </View>
     
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
