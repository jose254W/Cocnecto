import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./nearbyjobcard.style";

const NearbyJobCard = ({ profile, handleNavigate }) => {
 

  const renderContent = () => {
  //     return (
  //       // <View style={styles.textContainer}>
  //       //   <Image source={{ uri:  profileImage }} style={styles.image} resizeMode="cover" />
  //       //   <View style={styles.textContainer}>
  //       //     <Text style={styles.name}>{name}</Text>
  //       //     <Text style={styles.location}>{location}</Text>
  //       //   </View>
  //       // </View>
  //     );
  //   {
  //     return (
  //       <View style={styles.textContainer}>
  //         <Image source={{ uri: profileImage }} style={styles.image} resizeMode="cover" />
  //         <View style={styles.textContainer}>
  //           <Text style={styles.name}>{name}</Text>
  //           <Text style={styles.location}>{location}</Text>
  //         </View>
  //       </View>
  //     );
  //   }
  // };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      {renderContent()}
    </TouchableOpacity>
  );
};
}

export default NearbyJobCard;
