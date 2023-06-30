import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Button, TextInput } from "react-native";
import axios from "axios";
import styles from "./ProfileViewStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXgeZFeZHqjocwoW42jksUIZFF6YGVVM0",
  authDomain: "cocnecto.firebaseapp.com",
  projectId: "cocnecto",
  storageBucket: "cocnecto.appspot.com",
  messagingSenderId: "954674691783",
  appId: "1:954674691783:web:7b528b8dbbdbbd99d848e2",
  measurementId: "G-EFVN3RBKW8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const ProfileView = () => {
  const route = useRoute();
  const { profileData: ProfileData } = route.params;
  const [profileData, setProfileData] = useState(ProfileData);
  const navigation = useNavigation();
  const [setAvailabilityDates] = useState([]);
  const availabilityDates =
    profileData && profileData.availability
      ? Object.keys(profileData.availability)
      : [];

  const userId = route.params?.userId;

  const fetchProfileData = async () => {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const userId = user.uid;
            const profileResponse = await axios.get(
              `http://192.168.100.43:3000/profile/${userId}`
            );
            const responseData = profileResponse.data;
            console.log("Success:", responseData);
            setProfileData(responseData);
            const dates = responseData.availability
              ? Object.values(responseData.availability).join(", ")
              : [];
            setAvailabilityDates(dates);
          } catch (error) {
            console.error("Error fetching profile data:", error);
          }
        } else {
          console.log("User is not signed in");
        }
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfileData(userId);
    }
  }, [userId]);

  const handleEditProfile = async () => {
    await fetchProfileData(userId);
    navigation.navigate("Profile", { profileData, userId });
  };
  console.log("Profile Data:", profileData);

  const  handleNavigateToMessaging = () => {
    navigation.navigate("Messaging", {
      recipientId: userId,
      recipientName: profileData.fullName,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          {profileData.profileImage ? (
            <Image
              style={styles.profileImage}
              source={{ uri: profileData.profileImage }}
            />
          ) : (
            <Text>No profile image available</Text>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Full Name:</Text>
          <Text>{profileData.fullName}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specialty:</Text>
          <Text>
            {profileData.specialty && profileData.specialty.length > 0
              ? profileData.specialty.join(", ")
              : "No specialty information"}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booked:</Text>
          {availabilityDates.length > 0 ? (
            availabilityDates.map((date) => <Text key={date}>{date}</Text>)
          ) : (
            <Text>No availability information</Text>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location:</Text>
          <Text>{profileData.location}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Info:</Text>
          <Text>{profileData.contactInfo}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience Entries:</Text>
          {profileData.experienceEntries &&
          profileData.experienceEntries.length > 0 ? (
            profileData.experienceEntries.map((entry) => (
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
          <Text>{profileData.gender}</Text>
        </View>
        <Button title="Edit Profile" onPress={handleEditProfile} />
        <Button title="Messages" onPress={handleNavigateToMessaging} />
      </View>
    </ScrollView>
  );
};

export default ProfileView;
