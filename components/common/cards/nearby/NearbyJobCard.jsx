import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./nearbyjobcard.style";

const NearbyJobCard = ({ profile, handleNavigate }) => {
  const { profileImage, name, location } = profile;

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <View style={styles.textContainer}>
        <Image
          source={{ uri: profileImage }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
