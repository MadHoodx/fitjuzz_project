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
      setError("Please enter your username");
    } else if (username !== "" && email == "" && password !== "") {
      setError("Please enter your email");
    } else if (username == "" && email == "" && password !== "") {
      setError("Please enter your username and email");
    } else if (username == "" && email !== "" && password == "") {
      setError("Please enter your username and password");
    } else if (username !== "" && email !== "" && password == "") {
      setError("Please enter your password");
    } else if (username !== "" && email == "" && password == "") {
      setError("Please enter your email and password");
    } else if (username == "" && email == "" && password == "") {
      setError("Please enter your incredentials");
    } else if (password !== confirmPassword) {
      setLoading(1);
      setError("Passwords do not match");
    }

    try {
      const response = await axios.post(
        "http://192.168.221.234:5000/api/user/signup",

        {
          username,
          email,
          password,
        }
      );

      await AsyncStorage.setItem("token", response.data.token);
      navigation.navigate("MyTabs");
     

    } catch (error) {
      setLoading(1);
      if (error.status == 409) {
        setError("User already exists");
      } else {
        setError("Signup failed. Please try again.");
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
