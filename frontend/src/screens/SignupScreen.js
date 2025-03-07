import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import styles, { sizes } from "../styles/style";
import SignupScreenStyle from "../styles/components/SignupScreenStyle";
import Icon from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import InputWithEye from "../components/InputWithEye";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

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
      return
    } else if (username !== "" && email == "" && password !== "") {
      setLoading(1);
      setError("Please enter your email");
      return
    } else if (username == "" && email == "" && password !== "") {
      setLoading(1);
      setError("Please enter your username and email");
      return
    } else if (username == "" && email !== "" && password == "") {
      setLoading(1);
      setError("Please enter your username and password");
      return
    } else if (username !== "" && email !== "" && password == "") {
      setLoading(1);
      setError("Please enter your password");
      return
    } else if (username !== "" && email == "" && password == "") {
      setLoading(1);
      setError("Please enter your email and password");
      return
    } else if (username == "" && email == "" && password == "") {
      setLoading(1);
      setError("Please enter your incredentials");
      return
    } else if (password !== confirmPassword) {
      setLoading(1);
      setError("Passwords do not match");
      return
    } 
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/signup`,
        {
          username,
          email,
          password
        }
      );

      await AsyncStorage.setItem("userToken", response.data.token);
      navigation.navigate("MyTabs");
    } catch (error) {
      setLoading(1);
      if (error.status == 409) {
        setError("User already exists");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={SignupScreenStyle.input__section}>
        <TextInput
          style={styles.input__box}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input__box}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <InputWithEye
          placeholder={"Password"}
          value={password}
          onChangeText={setPassword}
        ></InputWithEye>
        <InputWithEye
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder={"Confirm Password"}
        ></InputWithEye>

        {loading ? <Text style={SignupScreenStyle.error}>{error} </Text> : null}
      </View>
      <View style={SignupScreenStyle.button__section}>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <View style={SignupScreenStyle.line__section}>
          <View style={SignupScreenStyle.line} />
          <Text style={{ fontSize: sizes.size_xl, fontWeight: "bold" }}>
            Or login with
          </Text>
          <View style={SignupScreenStyle.line} />
        </View>
        <View style={SignupScreenStyle.button__box}>
          <TouchableOpacity style={SignupScreenStyle.button}>
            <Image
              source={require("../assets/images/facebook-logo.png")}
              style={SignupScreenStyle.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity style={SignupScreenStyle.button}>
            <Image
              source={require("../assets/images/google-logo.png")}
              style={SignupScreenStyle.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity style={SignupScreenStyle.button}>
            <Image
              source={require("../assets/images/apple-logo.png")}
              style={SignupScreenStyle.logo}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={SignupScreenStyle.footer__section}>
        <Text style={{ fontSize: sizes.size_base, fontWeight: "bold" }}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => updateActiveScreen("signin")}>
          <Text
            style={[
              styles.orangeText,
              { fontSize: sizes.size_base, fontWeight: "bold" },
            ]}
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
