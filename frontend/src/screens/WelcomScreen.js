import * as React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  FlatList,
  ImageBackground,
} from "react-native";
import styles, { colors } from "../styles/style";
import { sizes } from "../styles/style";
import WelcomeScreenStyle from "../styles/components/WelcomScreenStyle";
import { useRef, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import personexercise1 from "../assets/images/person-exercise.jpg";
import personexercise2 from "../assets/images/person-exercise2.jpg";
import personexercise3 from "../assets/images/person-exercise3.jpg";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    title: "Welcome!",
    description: "This is the begining of your fitness journey",
    image: personexercise1,
  },
  {
    id: 2,
    title: "Track Workouts",
    description: "Easily track your exercises and progress",
    image: personexercise2,
  },
  {
    id: 3,
    title: "Stay Motivated",
    description: "Achive your fitness goals!",
    image: personexercise3,
  },
];

export default function WelcomeScreen({ navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    checkUserToken(navigation);
  }, [navigation]);

  const checkUserToken = async (navigation) => {
    try {
      // Check all possible tokens
      const userToken = await AsyncStorage.getItem("userToken");
      const userGoogleToken = await AsyncStorage.getItem("userGoogleToken");
      const userXToken = await AsyncStorage.getItem("userXToken");

      const tokenToCheck = userToken || userGoogleToken || userXToken;

      if (!tokenToCheck) {
        console.log("No token found.");
        navigation.navigate("Welcome");
        return;
      }

      // Decode token and check expiry
      const decoded = jwtDecode(tokenToCheck);
      const currentTime = Math.floor(Date.now() / 1000); // in seconds
      const timeLeft = decoded.exp - currentTime;

      console.log(
        "Token expires at:",
        new Date(decoded.exp * 1000).toLocaleString()
      );
      console.log("Time left before expire (seconds):", timeLeft);

      if (timeLeft <= 0) {
        console.log(
          "Token has expired. Clearing storage and redirecting to login."
        );
        await AsyncStorage.multiRemove([
          "userToken",
          "userGoogleToken",
          "userXToken",
        ]);
        navigation.navigate("Welcome");
        return;
      }

      // Token is valid — navigate to Home
      console.log("Token is still valid. Redirecting to home.");
      navigation.navigate("MyTabs");
    } catch (error) {
      console.error("Failed to check token:", error);
      navigation.navigate("Welcome");
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace("Main");
    }
  };

  return (
    <View style={[WelcomeScreenStyle.container]}>
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <ImageBackground
              source={item.image}
              style={[WelcomeScreenStyle.backgroundImage]}
              imageStyle={WelcomeScreenStyle.imageStyle}
              resizeMode="cover"
            ></ImageBackground>

            <View style={[WelcomeScreenStyle.detailContainer]}>
              <View style={[WelcomeScreenStyle.slide__section, { width }]}>
                <Text style={WelcomeScreenStyle.title}>{item.title}</Text>
                <Text style={WelcomeScreenStyle.description}>
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
      <View style={WelcomeScreenStyle.indicatorContainer}>
        {slides.map((item, index) => (
          <View
            key={index}
            style={[
              WelcomeScreenStyle.indicator,
              currentIndex === index
                ? { backgroundColor: colors.clr_brightblue, width: 60 }
                : { backgroundColor: "white" },
            ]}
          ></View>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.button, { width: "50%", borderRadius: 30 }]}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
