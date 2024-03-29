import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Cocnecto from "./app/index";
import JobDetails from "./app/jod-details/job";
import LoginScreen from "./src/loginPage/login";
import Profile from "./src/profile/profile";
import ProfileView from './src/profile/ProfileView';
import Mixologies from './components/home/nearby/NearbyJobsScreen';
import Message from "./components/Messaging/message";

import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getAuth } from "firebase/auth";
import RegisterScreen from "./src/registrationPage/RegisterScreen";
import ChatList from "./components/Messaging/ChatList";
import { NearbyJobCard } from "./components";


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

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
         <Stack.Screen name="Mixologies" component={Mixologies} />
         <Stack.Screen name="ChatList" component={ChatList} />
         <Stack.Screen name="NearbyJobCard" component={NearbyJobCard} />
         <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="ProfileView" component={ProfileView } />
        <Stack.Screen name="Cocnecto" component={Cocnecto} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="JobDetails" component={JobDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

