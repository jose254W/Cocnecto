import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import "firebase/firestore";
import styles from "./loginstyles";
import { Ionicons } from "@expo/vector-icons";

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

const LoginScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email: routeEmail, password: routePassword } = route.params || {};
  const [email, setEmail] = useState(routeEmail || "");
  const [password, setPassword] = useState(routePassword || "");
  const [userType, setUserType] = useState("mixologist");
  const [showPassword, setShowPassword] = useState(false);
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userId = user.uid;
      console.log("Login Successful");

      setShowUserTypeModal(true);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/wrong-password") {
        Alert.alert("Wrong Password", "The password you entered is incorrect.");
      } else {
        Alert.alert("Login Failed", "An error occurred while logging in.");
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleRegistration = () => {
    navigation.navigate("RegisterScreen");
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserTypeSelection = async (selectedUserType) => {
    setUserType(selectedUserType);
    setShowUserTypeModal(false);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userId = user.uid;

    if (selectedUserType === "mixologist") {
      navigation.navigate("Mixologies", { loggedInUserId: userId });
    } else if (selectedUserType === "client") {
      const profileDataString = await AsyncStorage.getItem("profileData");
      const profileData = JSON.parse(profileDataString);
      navigation.navigate("ProfileView", {
        loggedInUserId: userId,
        profileData: { ...profileData },
      });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1592858167090-2473780d894d?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODQxNTIyNTB8&ixlib=rb-4.0.3&q=85",
        }}
        style={styles.image}
      >
        <Text style={styles.text}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter @email"
          onChangeText={setEmail}
        />
        <Text style={styles.text}>Password:</Text>
        <View style={styles.input}>
          <TextInput
            value={password}
            placeholder="Enter password"
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={toggleShowPassword}
            style={[styles.showPasswordButton, { alignSelf: "center" }]}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
              style={{ marginTop: -14 }}
            />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showUserTypeModal}
          onRequestClose={() => setShowUserTypeModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select User Type</Text>
              <View style={styles.modalButton}>
                <Button
                  title="Mixologist"
                  onPress={() => handleUserTypeSelection("mixologist")}
                />
              </View>
              <View style={styles.modalButton}>
                <Button
                  title="Client"
                  onPress={() => handleUserTypeSelection("client")}
                />
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.button}>
          <Button title="Login" onPress={handleEmailLogin} />
        </View>
        <View style={styles.button}>
          <Button title="Register" onPress={handleRegistration} />
        </View>
        <View style={styles.button}>
          <Button title="Forgot Password" onPress={handleForgotPassword} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
