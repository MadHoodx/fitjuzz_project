import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import styles, { colors, sizes } from "../styles/style";
import SigninScreenStyle from "../styles/components/SigninScreenStyle";
import { useNavigation } from "@react-navigation/native";
import InputWithEye from "../components/InputWithEye";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import * as WebBrowser from 'expo-web-browser'
WebBrowser.maybeCompleteAuthSession();
import * as Google from 'expo-auth-session/providers/google'




export default function SigninScreen({ updateActiveScreen }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(0);






  const [userInfo, setUserInfo] = useState('')


  const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  })

  useEffect(() => {
      handleSigninWithGoogle();
  }, [response])

  const handleSigninWithGoogle = async () => {
      if (response?.type === "success") {
          await getGoogleUserInfo(response.authentication.accessToken);
          
        
          navigation.navigate('MyTabs')
      }
  }

  const getGoogleUserInfo = async (token) => {
      try {
          const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
              headers: { Authorization: `Bearer ${token}` }
          })

          const user = await response.json();
          await AsyncStorage.setItem('user', JSON.stringify(user))
          Alert.alert("Sign in with Google", JSON.stringify(user))
          if(user) {
              const response = await axios.post("http://192.168.221.234:5000/api/user/signinGoogle",  {
              username : user.name,
              email : user.email,
              picture : user.picture
            })

            console.log(response)
          }

          console.log(user)
          setUserInfo(user)
      } catch (error) {
          console.log(error)
      }
  }







  useEffect(() => {
    const checkToken = async () => {
      token = await AsyncStorage.getItem("token");
      // user = await AsyncStorage.getItem("@user")
      if (token || user) {
        navigation.navigate("MyTabs");
      }
    };
    checkToken();
  });

  const handleSignin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.221.234:5000/api/user/signin",
        {
          email,
          password,
        }
      );

   
      await AsyncStorage.setItem("token", response.data.token);
      navigation.navigate("MyTabs");

    } catch (error) {
      setLoading(1);
    
      if (error.status == 400) {
        setError("Sorry, looks like that’s the wrong email or password.");
      }
      else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <View style={[styles.container]}>
      <View
        style={[
          SigninScreenStyle.input__section,
          { borderColor: "purple", paddingTop: 20 },
        ]}
      >
        <Text>{JSON.stringify(userInfo, null, 2)}</Text>
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
        <View style={SigninScreenStyle.button__box}>
          <TouchableOpacity style={SigninScreenStyle.button}>
            <Image
              source={require("../assets/images/facebook-logo.png")}
              style={SigninScreenStyle.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={SigninScreenStyle.button}
           
            onPress={() =>  promptAsync() }
          >
            <Image
              source={require("../assets/images/google-logo.png")}
              style={SigninScreenStyle.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity style={SigninScreenStyle.button}>
            <Image
              source={require("../assets/images/apple-logo.png")}
              style={SigninScreenStyle.logo}
            />
          </TouchableOpacity>
        </View>
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
