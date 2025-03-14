import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground
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

    <View>

      <ImageBackground
        source={ activeScreen === 'signin' ? require("../assets/images/person-exercise.jpg"): require("../assets/images/person-exercise2.jpg") } // Use local image
        style={headerAlternative.backgroundImage}
        imageStyle={headerAlternative.imageStyle}
        resizeMode="cover" // or "contain", "stretch"
      >
        <View
          style={[headerAlternative.container,
          activeScreen === 'signin' ? { flexBasis: "50%" } : { flexBasis: "22.5%" }]}>

          <Text
            style={[
              styles.whiteText,
              isResetPasswordPage === true && headerAlternative.hide,
              { fontSize: sizes.size_xl, fontWeight: "bold",},
              activeScreen === 'signin' ? { fontSize: sizes.size_4xl, paddingTop: 70,  } : { fontSize: sizes.size_xl, paddingTop: 32, }
            ]}
          >
            {headerText}
          </Text>
          <Text
            style={[
              styles.whiteText,
              isResetPasswordPage === false && headerAlternative.hide,
              { fontSize: sizes.size_xl, fontWeight: "bold", paddingTop: 105 },
            ]}
          >
            Let’s reset your password!
          </Text>
          <View
            style={[
              headerAlternative.button__section,
              isResetPasswordPage === true && headerAlternative.hide,
              activeScreen === 'signin' ? { paddingTop: 150 } : { paddingTop: 44 }
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
        </View>

      </ImageBackground>


    </View>
  );
}

const headerAlternative = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    paddingHorizontal: 40,
    zIndex: 1
  },
  button__section: {
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
    backgroundColor: colors.clr_blue,
    zIndex: 1,
  },
  activeButtonText: {
    color: colors.clr_white,
  },
  hide: {
    display: "none",
  },
  backgroundImage: {
    backgroundColor: colors.clr_background
  },
  imageStyle: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    opacity: 0.7
  }
});
