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
export default function SignupScreen({ updateActiveScreen }) {
  const navigation = useNavigation();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/signup`,
        {
          username,
          email,
          password,
        }
      );

      await AsyncStorage.setItem("userToken", response.data.token);
      console.log(response.data)

      navigation.navigate("MyTabs");
    } catch (error) {
      setLoading(1);
      if (error.status == 409) {
        setError("User already exists");
      } else if (error.status == 500) {
        setError("An unexpected error occurred");
        console.log(error.status)
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
