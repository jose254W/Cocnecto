import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import JobDetails from "./jod-details/job";
import { getAuth, signOut } from "firebase/auth";

import { COLORS, icons, images, SIZES } from "../constants";

import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

const Stack = createStackNavigator();

function Home() {
  const router = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  //   const auth = getAuth();

  //    const handleLogout = async () => {
  //       try {
  //         await signOut(auth);
  //         console.log("Logged Out")
  //         router.navigate('Login');
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Welcome
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleClick={() => {
                if (searchTerm) {
                  router.push(`/search/${searchTerm}`);
                }
              }}
            />
          </View>
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Cocnecto() {
  const auth = getAuth();
  const router = useNavigation();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged Out");
      router.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%'/>
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />
      <Stack.Screen name="JobDetails" component={JobDetails} />
    </Stack.Navigator>
  );
}

export default Cocnecto;
