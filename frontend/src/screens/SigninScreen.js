import * as React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles, { colors, sizes } from "../styles/style";
import SigninScreenStyle from "../styles/components/SigninScreenStyle";
import { useNavigation } from "@react-navigation/native";
import InputWithEye from "../components/InputWithEye";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SocialAuthSection from "../components/SocialAuthSection";

export default function SigninScreen({ updateActiveScreen }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    checkUserToken(navigation);
  }, [navigation]);

  const checkUserToken = async (navigation) => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const userGoogleToken = await AsyncStorage.getItem("userGoogleToken");
      const userXToken = await AsyncStorage.getItem("userXToken");

      if (userToken || userGoogleToken || userXToken) {
        navigation.navigate("MyTabs");
      }
    } catch (error) {
      console.error("Failed to check token:", error);
    }
  };

  const handleSignin = async () => {
    if (email == "" && password !== "") {
      setLoading(1);
      setError("Please enter your email");
      return;
    } else if (email !== "" && password == "") {
      setLoading(1);
      setError("Please enter your password");
      return;
    }
    else if (email == "" && password == "") {
      setLoading(1);
      setError("Please enter your email and password");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/signin`,
        {
          email,
          password,
        }
      );
      await AsyncStorage.setItem("userToken", response.data.token);
      navigation.navigate("MyTabs");
    } catch (error) {
      setLoading(1);
      if (error.status == 400) {
        setError("Sorry, looks like that’s the wrong email or password.");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <View style={[styles.container]}>
      <View
        style={[
          SigninScreenStyle.input__section,
        ]}
      >
        <TextInput
          style={[styles.input__box]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <InputWithEye
          value={password}
          onChangeText={setPassword}
          placeholder={"Password"}
        ></InputWithEye>
        {loading ? <Text style={SigninScreenStyle.error}>{error}</Text> : null}

        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
          <Text style={[styles.orangeText, SigninScreenStyle.forgetPassword]}>
            Forget Password?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[SigninScreenStyle.button__section]}>
        <TouchableOpacity style={styles.button} onPress={handleSignin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <View style={SigninScreenStyle.line__section}>
          <View style={SigninScreenStyle.line} />
          <Text style={{ fontSize: sizes.size_xl, fontWeight: "bold" }}>
            Or login with
          </Text>
          <View style={SigninScreenStyle.line} />
        </View>

        <SocialAuthSection></SocialAuthSection>
        
      </View>
      <View style={SigninScreenStyle.footer__section}>
        <Text style={{ fontSize: sizes.size_base, fontWeight: "bold" }}>
          if you don't have an account.
        </Text>
        <TouchableOpacity onPress={() => updateActiveScreen("signup")}>
          <Text
            style={[
              styles.orangeText,
              { fontSize: sizes.size_base, fontWeight: "bold" },
            ]}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
