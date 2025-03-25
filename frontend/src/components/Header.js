import * as React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import styles, { colors, sizes } from "../styles/style";

import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconFeather from "react-native-vector-icons/Feather";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
export default function Header({ }) {
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("qd");
  const [emoji, setEmoji] = useState("");

  const motivationalQuote = [
    " As twilight paints the sky, let your spirit take flight.",
    " The worldis a stage, and your workout is your spotlight.",
    " As stars begin to gleam, chase the dreams that shimmer within.",
    " Let your workout be a dance of dedication.",
    " Sleep is the best meditation.",
  ];

  useEffect(() => {
    fetchUsername();
    calGreeting();
    // randomMotivationalQuote()
  });

  const randomMotivationalQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuote.length);
    const item = motivationalQuote[randomIndex];
    setQuote(item);
  };

  const calGreeting = () => {
    const date = new Date();
    const todayHours = date.getHours();

    if (todayHours >= 6 && todayHours < 12) {
      setGreeting("Good morning");
      setQuote(motivationalQuote[0]);
      setEmoji("sunrise");
    } else if (todayHours >= 12 && todayHours < 15) {
      setGreeting("Good afternoon");
      setQuote(motivationalQuote[1]);
      setEmoji("sun");
    } else if (todayHours >= 15 && todayHours < 19) {
      setGreeting("Good evening");
      setQuote(motivationalQuote[2]);
      setEmoji("sunset");
    } else if (todayHours >= 19 && todayHours < 24) {
      setGreeting("Good night");
      setQuote(motivationalQuote[3]);
      setEmoji("moon");
    } else {
      setGreeting("Time to bed");
      setQuote(motivationalQuote[4]);
      setEmoji("battery-charging");
    }
  };

  const fetchUsername = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const userGoogleToken = await AsyncStorage.getItem("userGoogleToken");
    const userXToken = await AsyncStorage.getItem("userXToken");
    try {
      if (userToken) {
        const decodedUserToken = jwtDecode(userToken);
        const userId = decodedUserToken.userId;

        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/${userId}/profile`
        );
        setUsername(response.data.username);
      } else if (userGoogleToken) {
        const decodedUserGoogleToken = jwtDecode(userGoogleToken);
        const userId = decodedUserGoogleToken.userId;

        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/${userId}/profile`
        );
        setUsername(response.data.givenName);
      } else if (userXToken) {
        const decodedUserXToken = jwtDecode(userXToken);
        const userId = decodedUserXToken.userId;

        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/${userId}/profile`
        );

        setUsername(response.data.name);
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  return (
    <View>
      <ImageBackground
        source={require("../assets/images/person-exercise2.jpg")} // Use local image
        style={header.backgroundImage}
        imageStyle={header.imageStyle}
        resizeMode="cover" // or "contain", "stretch"
      >
        <View style={[header.container,]}>
          <Text
            style={[
             
              {
                textAlign: "center",
                fontSize: sizes.size_2xl,
                fontWeight: "bold",
                paddingTop: 20,
                color: colors.clr_brightblue,
              },
            ]}
          >
            Fitjuzz
          </Text>
          <View style={[header.header__section]}>
            <View style={[header.header__details]}>
              <Text
                style={[
                  styles.whiteText,
                  { fontSize: sizes.size_lg, fontWeight: "bold" },
                ]}
              >
                {greeting}: {username}
              </Text>
              <Text
                style={{
                  color: colors.clr_gray,
                  width: 300,
                }}
              >
                Motavaltional quote:
                <Text style={[styles.whiteText, { fontWeight: "bold" }]}>
                  {quote}
                </Text>
              </Text>
            </View>

            <IconFeather name={emoji} size={25} color={colors.clr_white} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const header = StyleSheet.create({
  container: {
    flexBasis: '22.5%',
    marginHorizontal: 0,
    paddingHorizontal: 25,
    zIndex: 1
  },
  header__section: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  
  },
  header__details: {
    gap: 4,
  },
  backgroundImage: {
    backgroundColor: colors.clr_background
  },
  imageStyle: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    opacity: 0.7
  }
});
