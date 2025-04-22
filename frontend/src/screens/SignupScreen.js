import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import styles, { sizes, colors } from "../styles/style";
import SignupScreenStyle from "../styles/components/SignupScreenStyle";
import Icon from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import InputWithEye from "../components/InputWithEye";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import SocialAuthSection from "../components/SocialAuthSection";
import Constants from 'expo-constants';

const EXPO_PUBLIC_ENDPOINT_API = Constants.expoConfig.extra.EXPO_PUBLIC_ENDPOINT_API;

export default function SignupScreen({ updateActiveScreen }) {
  const navigation = useNavigation();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


   // Function to validate username
   const validateUsername = (username) => {
    if (username.length < 5) {
      return "Username must be at least 5 characters long.";
    }
    if (/\s/.test(username)) {
      return "Username cannot contain spaces.";
    }
    return '';
  };

  // Function to validate password
  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 16) {
      return "Password must be 8 - 16 characters long.";
    }
   
    return '';
  };

  // Function to validate email using regex
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
    return '';
  };

  const handleSignup = async () => {
    if (username == "" && email !== "" && password !== "") {
      setLoading(1);
      setError("Please enter your username");
      return;
    } else if (username !== "" && email == "" && password !== "") {
      setLoading(1);
      setError("Please enter your email");
      return;
    } else if (username == "" && email == "" && password !== "") {
      setLoading(1);
      setError("Please enter your username and email");
      return;
    } else if (username == "" && email !== "" && password == "") {
      setLoading(1);
      setError("Please enter your username and password");
      return;
    } else if (username !== "" && email !== "" && password == "") {
      setLoading(1);
      setError("Please enter your password");
      return;
    } else if (username !== "" && email == "" && password == "") {
      setLoading(1);
      setError("Please enter your email and password");
      return;
    } else if (username == "" && email == "" && password == "") {
      setLoading(1);
      setError("Please enter your incredentials");
      return;
    } else if (password !== confirmPassword) {
      setLoading(1);
      setError("Passwords do not match");
      return;
    } 
  
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const emailError = validateEmail(email);

    if (usernameError || passwordError || emailError) {
      setError(usernameError || passwordError || emailError);
      return;
    }
    try {
      const response = await axios.post(
        `${EXPO_PUBLIC_ENDPOINT_API}/api/user/signup`,
        {
          username,
          email,
          password,
        }
      );

      await AsyncStorage.setItem("userToken", response.data.token);
;
    
      navigation.navigate("MyTabs");
     
    } catch (error) {
      setLoading(1);

      if (error.status == 409) {
        setError("User already exists");
      } else if (error.status == 500) {
        setError("An unexpected error occurred");
        console.log(error.status);
      }
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={[SignupScreenStyle.input__section]}>
        <View>
          <Text style={[styles.whiteText, { fontWeight: "bold" }]}>
            Username
          </Text>
          <TextInput
            style={styles.input__box}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View>
          <Text style={[styles.whiteText, { fontWeight: "bold" }]}>
            Email Address
          </Text>
          <TextInput
            style={styles.input__box}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View>
          <Text style={[styles.whiteText, { fontWeight: "bold" }]}>
            Password
          </Text>
          <InputWithEye
            value={password}
            onChangeText={setPassword}
          ></InputWithEye>
        </View>
        <View>
          <Text style={[styles.whiteText, { fontWeight: "bold" }]}>
            ConfirmPassword
          </Text>
          <InputWithEye
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          ></InputWithEye>
        </View>
        {loading ? <Text style={SignupScreenStyle.error}>{error} </Text> : null}
      </View>
      <View
        style={[
          SignupScreenStyle.button__section,
          { justifyContent: "space-around", gap: 12 },
        ]}
      >
        <SocialAuthSection></SocialAuthSection>
        <TouchableOpacity
          style={[
            styles.buttonAuth,
            {
              paddingHorizontal: 52,
              paddingVertical: 10,
            },
          ]}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>Sign up ➝</Text>
        </TouchableOpacity>
      </View>
      <View style={[SignupScreenStyle.footer__section]}>
        <Text style={[styles.whiteText, { fontWeight: "bold" }]}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => updateActiveScreen("signin")}>
          <Text
            style={[
              styles.orangeText,
              {
                fontSize: sizes.size_base,
                fontWeight: "bold",
                color: colors.clr_brightblue,
              },
            ]}
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
