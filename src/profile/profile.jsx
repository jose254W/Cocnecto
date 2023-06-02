import React, { useState, useEffect } from "react";
import { Text, Image, View, Button, TextInput, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import styles from "./profilestyles";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const Profile = ({ onFormSubmit }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [specialty, setSpecialty] = useState("");
  const [availability, setAvailability] = useState({});
  const [location, setLocation] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [experienceEntries, setExperienceEntries] = useState([]);
  const [editing, setEditing] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDoneButton, setShowDoneButton] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isSpecialtyInputOpen, setIsSpecialtyInputOpen] = useState(false);
  const [isEditingContactInfo, setIsEditingContactInfo] = useState(false);
  const [gender, setGender] = useState("");
  const [showGenderOptions, setShowGenderOptions] = useState(false);

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
  const submitForm = async () => {
    console.log("Submit form called");
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const newId = Date.now().toString();

          const profileData = {
            id: newId,
            userId: user.uid,
            profileImage,
            specialty,
            availability,
            location,
            contactInfo,
            experienceEntries,
            gender,
          };

          const response = await axios.post(
            
            profileData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const userId = user.uid;
          const profileResponse = await axios.get(
            
          );
          const responseData = profileResponse.data;
          console.log("Profile info:", responseData);
          // Handle the profile data in your frontend code

          const data = response.data;
          console.log(data);

          const firestore = getFirestore(app);
          const profileRef = doc(firestore, "profiles", user.uid);

          await setDoc(profileRef, profileData);

          console.log("Profile data saved successfully");

          // Call getProfileData to display the profile data after submission
          await profileData(user.uid);
        } else {
          console.log("User is not logged in");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  function onFormSubmit(data) {
    console.log("Form submitted");
    console.log("Received data:", data);
  }

  useEffect(() => {
    // Get the current date
    const today = new Date();
    const dateString = today.toISOString().split("T")[0];

    // Create an initial availability object with today's date as not available
    const initialAvailability = {
      [dateString]: { disabled: true, disableTouchEvent: true },
    };

    setAvailability(initialAvailability);
  }, []);

  const handleImageChange = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access media library denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleUploadDifferentImage = () => {
    setProfileImage(null); // Reset the profile image state to null
    handleImageChange(); // Trigger the image change process again
  };

  const addExperienceEntry = () => {
    const newEntry = {
      id: Date.now().toString(),
      title: "",
      startDate: "",
      endDate: "",
      description: "",
    };

    setExperienceEntries([...experienceEntries, newEntry]);
  };

  const handleExperienceChange = (text, entryId, field) => {
    const updatedEntries = experienceEntries.map((entry) => {
      if (entry.id === entryId) {
        return {
          ...entry,
          [field]: text,
        };
      }
      return entry;
    });

    setExperienceEntries(updatedEntries);
  };

  const toggleEditing = () => {
    setEditing((prevState) => !prevState);
  };

  const renderExperienceEntries = () => {
    return experienceEntries.map((entry) => (
      <View key={entry.id} style={styles.entryContainer}>
        {editing ? (
          <>
            <TextInput
              placeholder="Title"
              value={entry.title}
              onChangeText={(text) =>
                handleExperienceChange(text, entry.id, "title")
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Start Date"
              value={entry.startDate}
              onChangeText={(text) =>
                handleExperienceChange(text, entry.id, "startDate")
              }
              style={styles.input}
            />
            <TextInput
              placeholder="End Date"
              value={entry.endDate}
              onChangeText={(text) =>
                handleExperienceChange(text, entry.id, "endDate")
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={entry.description}
              onChangeText={(text) =>
                handleExperienceChange(text, entry.id, "description")
              }
              style={styles.input}
              multiline
            />
          </>
        ) : (
          <Text style={styles.displayText}>
            Title: {entry.title}, Start Date: {entry.startDate}, End Date:{" "}
            {entry.endDate}, Description: {entry.description}
          </Text>
        )}
      </View>
    ));
  };

  const handleSpecialtyChange = () => {
    setIsSpecialtyInputOpen(true);
    setEditing(true);
  };

  const handleSaveSpecialty = () => {
    if (newSpecialty !== "") {
      setSpecialty([...specialty, newSpecialty]);
      setNewSpecialty("");
    }
    setIsSpecialtyInputOpen(false);
    setEditing(false);
    setNewSpecialty("");
  };

  const handleEditSpecialty = () => {
    setIsEditing(true);
    setIsSpecialtyInputOpen(true);
  };

  const handleBookingButton = () => {
    setShowCalendar(true);
    setShowDoneButton(true);
  };

  const handleDoneButton = () => {
    setShowCalendar(false);
    setShowDoneButton(false);
    setIsEditingLocation(false);
    setIsSpecialtyInputOpen(false);
    setIsEditingContactInfo(false);
  };

  const handleAvailabilityChange = (date) => {
    const dateString = date.dateString;
    const selectedDay = availability[dateString] || {};

    // Toggle the availability status
    const updatedAvailability = {
      ...availability,
      [dateString]: { ...selectedDay, disabled: !selectedDay.disabled },
    };

    setAvailability(updatedAvailability);
  };

  const handleLocationChange = (text) => {
    setLocation(text);
  };

  const handleContactInfoChange = (text) => {
    setContactInfo(text);
  };

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
    setShowGenderOptions(false);
  };

  const toggleGenderOptions = () => {
    setShowGenderOptions(!showGenderOptions);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {profileImage ? (
          <Image style={styles.profileImage} source={{ uri: profileImage }} />
        ) : (
          <Button title="Upload Profile" onPress={handleImageChange} />
        )}
        {profileImage && (
          <Button onPress={handleUploadDifferentImage} title="Change Profile" />
        )}
      </View>
      <ScrollView style={styles.container}>
        {renderExperienceEntries()}

        {editing && (
          <Button onPress={addExperienceEntry} title="Add Experience" />
        )}
        <Button onPress={toggleEditing} title={editing ? "Done" : "Edit"} />
      </ScrollView>

      <View style={styles.container}>
        {isSpecialtyInputOpen ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter specialty"
              value={newSpecialty}
              onChangeText={setNewSpecialty}
            />
            <Button
              title={isEditing ? "Done" : "Done"}
              onPress={handleSaveSpecialty}
              disabled={!isEditing && newSpecialty === ""}
            />
          </>
        ) : specialty.length > 0 ? (
          <>
            <View style={styles.specialtyContainer}>
              <Text style={styles.specialtyText}>
                Specialties: {specialty.join(", ")}
              </Text>
              {!isEditing && (
                <Button title="Edit" onPress={handleEditSpecialty} />
              )}
            </View>
          </>
        ) : (
          <Button title="Add Specialty" onPress={handleSpecialtyChange} />
        )}
        {!isSpecialtyInputOpen && specialty.length > 0 && (
          <Button title="Edit" onPress={handleEditSpecialty} />
        )}
      </View>
      {!showCalendar && (
        <Button
          title="Booking"
          onPress={handleBookingButton}
          style={styles.button}
        />
      )}
      {showCalendar && (
        <View style={styles.genderContainer}>
          <Text>Availability:</Text>
          <Calendar
            onDayPress={handleAvailabilityChange}
            markedDates={availability}
            markingType="period"
          />
          {showDoneButton && (
            <Button
              title="Done"
              onPress={handleDoneButton}
              style={styles.button}
            />
          )}
        </View>
      )}
      <View style={styles.container}>
        {isEditingLocation ? (
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={handleLocationChange}
          />
        ) : (
          <Text style={styles.locationText}>{location}</Text>
        )}
        <Button
          title={isEditingLocation ? "Done" : "Edit Location"}
          onPress={() => setIsEditingLocation(!isEditingLocation)}
          style={styles.button}
        />
      </View>
      <View style={styles.container}>
        {isEditingContactInfo ? (
          <TextInput
            style={styles.input}
            placeholder="Contact Info"
            value={contactInfo}
            onChangeText={handleContactInfoChange}
          />
        ) : (
          <Text style={styles.ContactInfoText}>{contactInfo}</Text>
        )}
        <Button
          title={isEditingContactInfo ? "Done" : "Edit Contact Info"}
          onPress={() => setIsEditingContactInfo(!isEditingContactInfo)}
          style={styles.button}
        />
      </View>
      <View style={styles.genderContainer}>
        {showGenderOptions ? (
          <View>
            <Button
              title="Choose Gender"
              onPress={toggleGenderOptions}
              style={styles.chooseGenderButton}
            />
          </View>
        ) : (
          <Button
            title={gender ? `Selected Gender: ${gender}` : "Choose Gender"}
            onPress={toggleGenderOptions}
            style={styles.chooseGenderButton}
          />
        )}

        {showGenderOptions && (
          <View style={styles.genderOptions}>
            <Button
              title="Female"
              onPress={() => handleGenderChange("female")}
              style={[
                styles.genderButton,
                gender === "female" && styles.selectedGenderButton,
              ]}
            />
            <Button
              title="Male"
              onPress={() => handleGenderChange("male")}
              style={[
                styles.genderButton,
                gender === "male" && styles.selectedGenderButton,
              ]}
            />
            <Button
              title="Prefer not to say"
              onPress={() => handleGenderChange("other")}
              style={[
                styles.genderButton,
                gender === "other" && styles.selectedGenderButton,
              ]}
            />
            <Button
              title="Cancel"
              onPress={toggleGenderOptions}
              style={styles.cancelButton}
            />
          </View>
        )}
      </View>
      <View>
        <Button title="Submit" onPress={submitForm} style={styles.button} />
      </View>
    </View>
  );
};

export default Profile;
