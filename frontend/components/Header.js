import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import styles, { colors } from "../styles/style";
import { sizes } from "../styles/style";
import Icon from "react-native-vector-icons/MaterialIcons";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Header({}) {
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("qd");



  const motivationalQuote = [
    "As twilight paints the sky, let your spirit take flight.",
    "The worldis a stage, and your workout is your spotlight.",
    "As stars begin to gleam, chase the dreams that shimmer within.",
    "Let your workout be a dance of dedication.",
    
  ];







  useEffect(() => {
  
    fetchUsername();
    calGreeting();
    // randomMotivationalQuote()
 
    
  },);

  const randomMotivationalQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuote.length);

    const item = motivationalQuote[randomIndex];

    setQuote(item)
  

  
  };

 


  const calGreeting = () => {
    const date = new Date();
    const todayHours = date.getHours();

 
    if (todayHours >= 6 && todayHours < 12) {
      setGreeting("Good morning");
      setQuote(motivationalQuote[0])
    } else if (todayHours >= 12 && todayHours < 15) {
      setGreeting("Good afternoon");
      setQuote(motivationalQuote[1])
    } else if (todayHours >= 15 && todayHours < 19) {
      setGreeting("Good evening");
      setQuote(motivationalQuote[2])
    } 
    else if (todayHours >= 19 && todayHours < 23) {
      setGreeting("Good evening");
      setQuote(motivationalQuote[3])
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
      <View
        style={[header.header__section, { borderColor: "red", borderWidth: 2 }]}
      >
        <View style={header.header__details}>
          <Text
            style={[
              styles.whiteText,
              { fontSize: sizes.size_base, fontWeight: "bold" },
            ]}
          >
            {greeting}: {username}
          </Text>
          <Text
            style={{
              color: colors.clr_gray,
              borderColor: "red",
              borderWidth: 2,
            
              width: 320,
        
            }}
          >
            Motavaltional quote: 
            <Text style={[styles.whiteText, { fontWeight: "bold", borderWidth: 2, borderColor: 'blue'}]}>
              {quote}
            </Text>
      
          </Text>
        </View>
        <TouchableOpacity>
          <Icon name="notifications" size={36} color={colors.clr_white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const header = StyleSheet.create({
  container: {
    flexBasis: 200,
    marginHorizontal: 0,
    paddingHorizontal: 16,
    backgroundColor: colors.clr_slate,
    borderRadius: 20,
    marginTop: -20,
  },
  header__section: {
    flexDirection: "row",
    marginTop: 28,
    justifyContent: "space-between",
  },
  header__details: {
    gap: 10,
  },
});
