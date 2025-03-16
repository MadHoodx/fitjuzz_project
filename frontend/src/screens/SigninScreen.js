import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, } from "react-native";
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
          { marginTop: 16 }]}
      >
        <View style={{}}>
          <Text style={[styles.whiteText, { fontWeight: 'bold' }]}>Username</Text>
          <TextInput
            style={[styles.input__box]}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={{ }}>
          <Text style={[styles.whiteText, { fontWeight: 'bold' }]}>Password</Text>
          <InputWithEye
            value={password}
            onChangeText={setPassword}

          ></InputWithEye>
        </View>
        {loading ? <Text style={SigninScreenStyle.error}>{error}</Text> : null}

        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
          <Text style={[SigninScreenStyle.forgetPassword, { color: colors.clr_brightblue, }]}>
            Forget Password?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[SigninScreenStyle.button__section, { justifyContent: 'space-around', gap: 12 }]}>


        <SocialAuthSection></SocialAuthSection>
        <TouchableOpacity style={[styles.buttonAuth, {
          paddingHorizontal: 52,
          paddingVertical: 10,
        }]} onPress={handleSignin}>
          <Text style={styles.buttonText}>Sign in ➝</Text>
        </TouchableOpacity>

      </View>
      <View style={[SigninScreenStyle.footer__section]}>
        <Text style={[styles.whiteText, { fontWeight: "bold" }]}>
          if you don't have an account.
        </Text>
        <TouchableOpacity onPress={() => updateActiveScreen("signup")}>
          <Text
            style={[

              { fontSize: sizes.size_base, fontWeight: "bold", color: colors.clr_brightblue },
            ]}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
   
    </View>

  );
}
