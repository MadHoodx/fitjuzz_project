import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";
import styles, { colors, sizes } from "../styles/style";
import { useState } from "react";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
export default function HeaderAlternative({
  isResetPasswordPage,
  activeScreen,
  updateActiveScreen,
}) {
  const headerText =
    activeScreen === "signin"
      ? `Let’s get${'\n'}you signed in !`
      : "Let’s get you registered !";



  return (



    <ImageBackground
      source={activeScreen === 'signin' ? require("../assets/images/person-exercise.jpg") : require("../assets/images/person-exercise2.jpg")} // Use local image
      style={[headerAlternative.backgroundImage, activeScreen === 'signin' ? { flexBasis: '50%' } : { flexBasis: '22.5%' }]}
      imageStyle={headerAlternative.imageStyle}
      resizeMode="cover"
    >
      <View style={[headerAlternative.container,]}>

        <Text
          style={[
            styles.whiteText,
            isResetPasswordPage === true && headerAlternative.hide,
            { fontSize: sizes.size_xl, fontWeight: "bold", marginTop: 20 },
            activeScreen === 'signin' ? { fontSize: sizes.size_4xl, } : { fontSize: sizes.size_2xl, }
          ]}
        >
          {headerText}
        </Text>
        <Text
          style={[
            styles.whiteText,
            isResetPasswordPage === false && headerAlternative.hide,
            { fontSize: sizes.size_2xl, fontWeight: "bold", paddingTop: 50 },
          ]}
        >
          Let’s reset your password!
        </Text>
      </View>

      <View
        style={[
          headerAlternative.button__section,
          isResetPasswordPage === true && headerAlternative.hide,
          activeScreen === "signin" ? {paddingBottom: 30} : {paddingBottom: 8} ,
        ]}
      >

        <TouchableOpacity
          style={[
            headerAlternative.button,
            { left: 26 },
            activeScreen === "signin" && headerAlternative.activeButton,
          ]}
          onPress={() => updateActiveScreen('signin')}
        >
          <Text
            style={[
              headerAlternative.buttonText,
              activeScreen === "signin" && headerAlternative.activeButtonText,
            ]}
          >
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            headerAlternative.button,
            { right: 26 },
            activeScreen === "signup" && headerAlternative.activeButton,
          ]}
          onPress={() => updateActiveScreen('signup')}
        >
          <Text
            style={[
              headerAlternative.buttonText,
              activeScreen === "signup" && headerAlternative.activeButtonText,
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>


    </ImageBackground>



  );
}

const headerAlternative = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 0,
    paddingHorizontal: 30,
    zIndex: 1,

  },
  button__section: {

    zIndex: 1,
    flexDirection: "row",
    justifyContent: "center",

  },
  button: {
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 64,
    backgroundColor: colors.clr_white,
  },
  buttonText: {
    fontSize: sizes.size_base,
    fontWeight: "bold",
  },
  activeButton: {
    zIndex: 1,
    backgroundColor: colors.clr_blue,

  },
  activeButtonText: {
    color: colors.clr_white,
  },
  hide: {
    display: "none",
  },
  backgroundImage: {
    backgroundColor: colors.clr_background,
    paddingHorizontal: 20

  },
  imageStyle: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    opacity: 0.7
  }
});
