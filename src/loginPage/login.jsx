import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import firebase from "firebase/app";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("mixologist");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Successful");
      if (userType === "mixologist") {
        navigation.navigate("Cocnecto");
      } else {
        navigation.navigate("Profile");
      }
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

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Register Successful");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Email Already Registered",
          "This email is already registered. Please try a different email."
        );
      } else {
        console.log(error);
      }
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleUserType = () => {
    setUserType(userType === "mixologist" ? "client" : "mixologist");
  };

  return (
    <View style={styles.container}>
    <ImageBackground 
    source={{ uri: "https://images.unsplash.com/photo-1592858167090-2473780d894d?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODQxNTIyNTB8&ixlib=rb-4.0.3&q=85" }}
    style={styles.image}>
      <Text style={styles.text}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Enter @email"
        onChangeText={setEmail}
      />
      <Text style={styles.text}>Password:</Text>
      <View  style={styles.input}>
      <TextInput
        value={password}
        placeholder="Enter password"
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={toggleShowPassword} style={[styles.showPasswordButton, {alignSelf: 'center'}]}>
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="black"
          style={{ marginTop: -14 }}
        />
      </TouchableOpacity>
      </View>
      <Text style={styles.text}>Loggin As:</Text>
      <View style={styles.button}>
        <Button
          title={userType === "mixologist" ? "Mixologist" : "Client"}
          onPress={toggleUserType}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Login with Email and Password"
          onPress={handleEmailLogin}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Register with Email and Password"
          onPress={handleRegister}
        />
      </View>
      <View style={styles.button}>
        <Button title="Forgot Password" onPress={handleForgotPassword} />
      </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
