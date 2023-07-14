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
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import styles from "../loginPage/loginstyles";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = getAuth();

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert("Passwords do not match", "Please confirm your password.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Set user's display name as the full name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      console.log("Register Successful");

      // Redirect to login screen after successful registration
      navigation.navigate("Login", { email, password });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Email Already Registered",
          "This email is already registered. Please try a different email."
        );
      } else {
        console.log(error);
        Alert.alert(
          "Registration Failed",
          "An error occurred while registering."
        );
      }
    }
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1592858321831-dabeabc2dd65?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODkwNjkzMzB8&ixlib=rb-4.0.3&q=85",
        }}
        style={styles.image}
        resizeMode="cover"
      >
        <Text style={styles.text}>First Name:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          placeholder="Enter your first name"
          onChangeText={setFirstName}
        />
        <Text style={styles.text}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          placeholder="Enter your last name"
          onChangeText={setLastName}
        />
        <Text style={styles.text}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter your email"
          onChangeText={setEmail}
        />
        <Text style={styles.text}>Password:</Text>
        <View style={styles.input}>
          <TextInput
            value={password}
            placeholder="Enter your password"
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
        <Text style={styles.text}>Confirm Password:</Text>
        <View style={styles.input}>
          <TextInput
            value={confirmPassword}
            placeholder="Confirm your password"
            onChangeText={setConfirmPassword}
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
        <View style={styles.button}>
          <Button title="Register" onPress={handleRegister} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegisterScreen;
