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

export default function Header() {
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");

  const calGreeting = () => {
    const date = new Date();
    const todayHours = date.getHours();
    console.log(date);
    console.log(todayHours);

    if (todayHours >= 6 && todayHours < 12) {
      setGreeting("Good morning");
    } else if (todayHours >= 12 && todayHours < 15) {
      setGreeting("Good afternoon");
    } else if (todayHours >= 15 && todayHours < 19) {
      setGreeting("Good evening");
    } else if (todayHours >= 19) {
      setGreeting("Good night");
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

  useEffect(() => {
    fetchUsername();
    calGreeting();
  }, );

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
      <View style={header.header__section}>
        <View style={header.header__details}>
          <Text
            style={[
              styles.whiteText,
              { fontSize: sizes.size_base, fontWeight: "bold" },
            ]}
          >
            {greeting}: {username}
          </Text>
          <Text style={{ color: colors.clr_gray }}>
            Today, your program are :
            <Text style={[styles.whiteText, { fontWeight: "bold" }]}>
              {" "}
              (leg)
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
