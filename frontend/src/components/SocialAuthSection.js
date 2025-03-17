import * as React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";

import Constants from 'expo-constants';
import { colors } from "../styles/style";
const EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID  = Constants.expoConfig.extra.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID
const EXPO_PUBLIC_WEB_CLIENT_ID = Constants.expoConfig.extra.EXPO_PUBLIC_WEB_CLIENT_ID
const EXPO_PUBLIC_X_CLIENT_ID = Constants.expoConfig.extra.EXPO_PUBLIC_X_CLIENT_ID
const EXPO_PUBLIC_X_CLIENT_SECRET= Constants.expoConfig.extra.EXPO_PUBLIC_X_CLIENT_SECRET

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://twitter.com/i/oauth2/authorize",
  tokenEndpoint: "https://api.twitter.com/2/oauth2/token",
  revocationEndpoint: "https://api.twitter.com/2/oauth2/revoke",
};

const redirectUri = AuthSession.makeRedirectUri({
  native: "fitjuzz://oauthredirect",
});

export default function SocialAuthSection() {
  const navigation = useNavigation();

  // Google Sign-In
  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      androidClientId: EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
      webClientId: EXPO_PUBLIC_WEB_CLIENT_ID,
    });

  // X (Twitter) Sign-In
  const [xRequest, xResponse, xPromptAsync] = AuthSession.useAuthRequest(
    {
      clientId: EXPO_PUBLIC_X_CLIENT_ID,
      redirectUri: redirectUri,
      scopes: ["tweet.read", "users.read", "offline.access"],
      responseType: "code",
      usePKCE: true,
      prompt: "consent",
    },
    discovery
  );

  useEffect(() => {
    handleGoogleSignIn();
  }, [googleResponse]);

  useEffect(() => {
    handleXSignIn();
  }, [xResponse]);


  const handleGoogleSignIn = async () => {
    if (googleResponse?.type === "success") {
      await fetchGoogleUserInfo(googleResponse.authentication.accessToken);
      navigation.navigate("MyTabs");
    }
  };

  const fetchGoogleUserInfo = async (token) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      console.log(user)
      if (user) {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/signin`,
          {
            googleId: user.id,
            name: user.name,
            givenName: user.given_name,
            familyName: user.family_name,
            email: user.email,
            picture: user.picture,
          }
        );
        await AsyncStorage.setItem("userGoogleToken", response.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleXSignIn = async () => {
    if (xResponse?.type === "success") {
      exchangeCodeForToken(xResponse.params.code);
      navigation.navigate("MyTabs");
    }
  };

  const exchangeCodeForToken = async (code) => {
    try {
      const authHeader = btoa(
        `${EXPO_PUBLIC_X_CLIENT_ID}:${EXPO_PUBLIC_X_CLIENT_SECRET}`
      );
      const tokenResponse = await axios.post(
        discovery.tokenEndpoint,
        new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
          client_id: EXPO_PUBLIC_X_CLIENT_ID,
          code_verifier: xRequest.codeVerifier,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${authHeader}`,
          },
        }
      );

      const tokenData = tokenResponse.data;
      if (tokenData.access_token) {
        fetchXUserInfo(tokenData.access_token);
      }
    } catch (error) {
      console.error("Token Exchange Error:", error);
    }
  };

  const fetchXUserInfo = async (accessToken) => {
    try {
      const userResponse = await axios.get(
        "https://api.twitter.com/2/users/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(userResponse.data)
      const userData = userResponse.data;
      if (userData) {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/signin`,
          {
            xId: userData.data.id,
            name: userData.data.name,
            username: userData.data.username,
          }
        );
        await AsyncStorage.setItem("userXToken", response.data.token);
      }
    } catch (error) {
      console.error("User Info Error:", error);
    }
  };

  return (
    <View style={SocialAuthSectionStyle.button__box}>
      <TouchableOpacity
        style={SocialAuthSectionStyle.button}
        onPress={() => googlePromptAsync()}
      >
        <Image
          source={require("../assets/images/white-google-logo.png")}
          style={SocialAuthSectionStyle.logo}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={SocialAuthSectionStyle.button}
        onPress={() => xPromptAsync()}
      >
        <Image
          source={require("../assets/images/white-x-logo.png")}
          style={[SocialAuthSectionStyle.logo, {left: 2}]}
        />
      </TouchableOpacity>
     
    </View>
  );
}

const SocialAuthSectionStyle = StyleSheet.create({
  button__box: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  button: {

    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor:'#575757',
    borderColor: colors.clr_black,
    borderWidth: 1,
    borderRadius: 30,
  },
  logo: {
    width: 24,
    height: 24,
  },
});
