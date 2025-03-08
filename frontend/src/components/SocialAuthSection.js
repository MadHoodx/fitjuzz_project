import * as React from "react";
import { View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import styles, { colors, sizes } from "../styles/style";
import { useEffect  } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as WebBrowser from 'expo-web-browser'
WebBrowser.maybeCompleteAuthSession()
import * as Google from "expo-auth-session/providers/google";

export default function SocialAuthSection () {

    const navigation = useNavigation()
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
      });

      useEffect(() => {
        const checkToken = async () => {
          userToken = await AsyncStorage.getItem("userToken");
          userGoogleToken = await AsyncStorage.getItem("userGoogleToken");
          if (userToken) {
            navigation.navigate("MyTabs");
          } else if (userGoogleToken) {
            navigation.navigate("MyTabs");
          }
        };
        checkToken();
      },);
    
    
      useEffect(() => {
        handleSigninWithGoogle();
      }, [response]);
    
      const handleSigninWithGoogle = async () => {
        if (response?.type === "success") {
          await getGoogleUserInfo(response.authentication.accessToken);
    
          navigation.navigate("MyTabs");
        }
      };
    
      const getGoogleUserInfo = async (token) => {
        try {
          const response = await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
    
          const user = await response.json();
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
    

    return (
        <View style={SocialAuthSectionStyle.button__box}>
        <TouchableOpacity style={SocialAuthSectionStyle.button}>
          <Image
            source={require("../assets/images/facebook-logo.png")}
            style={SocialAuthSectionStyle.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={SocialAuthSectionStyle.button}
          disabled={!request}
          onPress={() => promptAsync()}
        >
          <Image
            source={require("../assets/images/google-logo.png")}
            style={SocialAuthSectionStyle.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity style={SocialAuthSectionStyle.button}>
          <Image
            source={require("../assets/images/apple-logo.png")}
            style={SocialAuthSectionStyle.logo}
          />
        </TouchableOpacity>
      </View>
    )

}


const SocialAuthSectionStyle = StyleSheet.create({
    button__box: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
      },
      button: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        backgroundColor: "#FFDFDF",
        borderColor: colors.clr_orange,
        borderWidth: 1,
        borderRadius: 10,
      },
      logo: {
        width: 40,
        height: 40,
      },
})