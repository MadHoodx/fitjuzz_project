import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import styles, { colors } from "../styles/style";
import { sizes } from "../styles/style";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconFeather from "react-native-vector-icons/Feather";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Header({}) {
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("qd");
  const [emoji, setEmoji] = useState("");

  const motivationalQuote = [
    " As twilight paints the sky, let your spirit take flight.",
    " The worldis a stage, and your workout is your spotlight.",
    " As stars begin to gleam, chase the dreams that shimmer within.",
    " Let your workout be a dance of dedication.",
    " เกินเที่ยงคืนแล้วไปนอนอย่าเบียว"
  ];

  useEffect(() => {
    fetchUsername();
    calGreeting();
    // randomMotivationalQuote()
  },);

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
    } else{
      setGreeting("ไปนอนไอสัส");
      setQuote(motivationalQuote[4]);
      setEmoji('battery-charging')
    }
  };

  const fetchUsername = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.user.username);
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  return (
    <View style={[header.container]}>
      <IconFontAwesome5
        name={"dumbbell"}
        size={60}
        color={colors.clr_white}
        style={[header.dumbbell_top]}
      ></IconFontAwesome5>
      <IconFontAwesome5
        name={"dumbbell"}
        size={40}
        color={colors.clr_white}
        style={[header.dumbbell_middle]}
      ></IconFontAwesome5>
      <IconFontAwesome5
        name={"dumbbell"}
        size={80}
        color={colors.clr_white}
        style={[header.dumbbell_bottom]}
      ></IconFontAwesome5>
      <Text
        style={[
          styles.orangeText,
          {
            textAlign: "center",
            fontSize: sizes.size_2xl,
            fontWeight: "bold",
            paddingTop: 60,
          },
        ]}
      >
        Myapp
      </Text>
      <View style={[header.header__section]}>
        <View style={[header.header__details]}>
          <Text
            style={[
              styles.whiteText,
              { fontSize: sizes.size_lg, fontWeight: "bold"},
            ]}
          >
            {greeting} {username}
          </Text>
          <Text
            style={{
              color: colors.clr_gray,
              width: 270,
            }}
          >
            Motavaltional quote: 
            <Text
              style={[
                styles.whiteText,
                { fontWeight: "bold" },
              ]}
            >
              {quote}
            </Text>
          </Text>
        </View>

        <IconFeather
          name={emoji}
          size={35}
          color={colors.clr_white}
        />
      </View>
    </View>
  );
}

const header = StyleSheet.create({
  container: {
    flexBasis: 200,
    marginHorizontal: 0,
    paddingHorizontal: 25,
    backgroundColor: colors.clr_slate,
    borderRadius: 20,
    marginTop: -20,
  },
  header__section: {
    flex: 1,
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  header__details: {
    flex: 1,
    gap: 4,

  },
  dumbbell_top: {
    
    position: "absolute",
    top: 15,
    right: 35,
    opacity: 0.1,
    zIndex: 0,
    transform: [{ rotate: "-55deg" }],
  
  },
  dumbbell_middle: {
    position: "absolute",
    top: 60,
    right: 120,
    opacity: 0.2,
    zIndex: 0,
    transform: [{ rotate: "45deg" }],
  },
  dumbbell_bottom: {
    position: "absolute",
    top: 130,
    right: 50,
    opacity: 0.2,
    zIndex: 0,
    transform: [{ rotate: "-50deg" }],
  },
});
