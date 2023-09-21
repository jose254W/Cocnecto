import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  Button,
} from "react-native";
import axios from "axios";
import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Mixologies = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState("");

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://192.168.100.43:3000/profile/all"
      );
      const responseData = response.data.profiles;
      console.log("Success:", responseData);
      setProfileData(responseData);
      profile={responseData}
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUserName(user.displayName);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = (name, userId) => {
    navigation.navigate("Message", {
      recipientName: name,
      loggedInUserId,
      userId,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.userSection}>
          <Text style={styles.userTitle}>{loggedInUserName}</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mixologies</Text>
          <TouchableOpacity onPress={fetchProfileData}>
            <Text style={styles.headerBtn}>Refresh</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardsContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Error Occurred, kindly Refresh</Text>
          ) : (
            profileData.map((responseData) => (
              <>
                <NearbyJobCard
                  key={`nearby-profile-${responseData.id}`}
                  profile={responseData}
                />
                  <View style={styles.profileImageWrapper}>
                    {responseData.profileImage ? (
                      <Image
                        style={styles.profileImage}
                        source={{ uri: responseData.profileImage }}
                      />
                    ) : (
                      <Text>No profile image available</Text>
                    )}
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Full Name:</Text>
                    <Text>{responseData.fullName}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Specialty:</Text>
                    <Text>
                      {responseData.specialty &&
                      responseData.specialty.length > 0
                        ? responseData.specialty
                            .replace(/[{}]/g, "")
                            .replace(/"/g, "")
                            .split(",")
                            .map((item) => item.trim())
                            .join(", ")
                        : "No specialty information"}
                    </Text>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Booked:</Text>
                    {responseData.availability &&
                      Object.entries(JSON.parse(responseData.availability))
                        .filter(([date, data]) => data.disabled)
                        .map(([date]) => <Text key={date}>{date}</Text>)}
                    {(!responseData.availability ||
                      Object.keys(JSON.parse(responseData.availability))
                        .length === 0) && (
                      <Text>No availability information</Text>
                    )}
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Location:</Text>
                    <Text>{responseData.location}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Info:</Text>
                    <Text>{responseData.contactInfo}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experience Entries:</Text>
                    {responseData.experienceEntries &&
                    responseData.experienceEntries.length > 0 ? (
                      responseData.experienceEntries.map((entry) => (
                        <View key={entry.id} style={styles.entryContainer}>
                          <Text>Title: {entry.title}</Text>
                          <Text>Start Date: {entry.startDate}</Text>
                          <Text>End Date: {entry.endDate}</Text>
                          <Text>Description: {entry.description}</Text>
                        </View>
                      ))
                    ) : (
                      <Text>No experience entries available</Text>
                    )}
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Gender:</Text>
                    <Text>{responseData.gender}</Text>
                  </View>

                  <Button
                    title="Message"
                    onPress={() =>
                      handleSendMessage(
                        responseData.fullName,
                        responseData.userId
                      )
                    }
                  />
              </>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Mixologies;
