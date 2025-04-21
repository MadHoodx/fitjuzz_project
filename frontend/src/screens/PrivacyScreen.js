import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles, { sizes, colors } from "../styles/style";
import React from "react";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
const PrivacyScreen = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate("MyTabs", { screen: "Profile" });
  };
  const dataPolicy = [
    {
      id: "information",
      topic: "Information We Collect",
      subtitle: "We may collect the following data",
      detail: [
        "Your name or nickname",
        "Weight, height, BMI, and body fat percentage",
        "Any other health-related data you input",
        "Usage data such as your last login time",
      ],
    },
    {
      id: "data",
      topic: "How We Use Your Data",
      subtitle: "We use your information to",
      detail: [
        "Track and display your health progress",
        "Analyze your data to suggest goals and activities",
        "Improve the app experience for you",
      ],
    },
    {
      id: "sharing",
      topic: "Sharing Your Data",
      subtitle: "We do not share your personal data with third parties, unless",
      detail: [
        "Your name or nickname",
        "Weight, height, BMI, and body fat percentage",
        "Any other health-related data you input",
        "Usage data such as your last login time",
      ],
    },
    {
      id: "stroage",
      topic: "Data Storage and Security",
      detail: [
        "Your name or nickname",
        "Weight, height, BMI, and body fat percentage",
        "Any other health-related data you input",
        "Usage data such as your last login time",
      ],
    },
    {
      id: "rights",
      topic: "Your Rights",
      subtitle: "You have the right to",
      detail: [
        "Your name or nickname",
        "Weight, height, BMI, and body fat percentage",
        "Any other health-related data you input",
        "Usage data such as your last login time",
      ],
    },
    {
      id: "changes",
      topic: "Changes to This Policy",
      detail: [
        "Your name or nickname",
        "Weight, height, BMI, and body fat percentage",
        "Any other health-related data you input",
        "Usage data such as your last login time",
      ],
    },
  ];
  const Dumbbells = () => {
    return (
      <View style={[{ position: "absolute", right: 0, top: 0 }]}>
        <IconFontAwesome5
          name={"dumbbell"}
          size={50}
          color={colors.clr_lightgray}
          style={PrivacyScreenStyles.dumbbell_top}
        />
        <IconFontAwesome5
          name={"dumbbell"}
          size={60}
          color={colors.clr_lightgray}
          style={PrivacyScreenStyles.dumbbell_middle}
        />
        <IconFontAwesome5
          name={"dumbbell"}
          size={70}
          color={colors.clr_lightgray}
          style={PrivacyScreenStyles.dumbbell_bottom}
        />
      </View>
    );
  };
  return (
    <View style={[PrivacyScreenStyles.container]}>
      <ScrollView style={[styles.container]}>
        <Dumbbells/>
        <View style={[{ paddingBottom: 60 }]}>
          <View style={[{ paddingTop: 20 }]}>
            <View>
              <TouchableOpacity
                style={[PrivacyScreenStyles.goback__button]}
                onPress={handleBack}
              >
                <IconMaterialIcons
                  name={"arrow-back-ios-new"}
                  size={20}
                  color={"white"}
                />
                <Text style={[PrivacyScreenStyles.text__header]}>
                Privacy Policy
              </Text>
              </TouchableOpacity>
            </View>
            <View style={[{ gap: 10, paddingTop: 20 }]}>
              
              <Text style={[PrivacyScreenStyles.text__detail]}>
                Welcome to Fitjuzz! Your privacy is important to us. This
                Privacy Policy explains how we collect, use, and protect your
                personal information when you use our app.
              </Text>
            </View>
          </View>
          <View style={[{ gap: 20, paddingTop: 20 }]}>
            {dataPolicy.map((datasPolicy) => (
              <View key={datasPolicy.id} style={[{ gap: 10 }]}>
                <Text style={[PrivacyScreenStyles.text__topic]}>
                  {datasPolicy.topic}
                </Text>
                <View>
                  {datasPolicy.detail.map((line, index) => (
                    <Text
                      key={index}
                      style={[PrivacyScreenStyles.text__detail]}
                    >
                      • {line}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
          <Text style={[PrivacyScreenStyles.text__detail,{paddingTop:20}]}>Last Update : 16 April 2025</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyScreen;

const PrivacyScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goback__button: {
    width: '100%',
    height: 30,
    borderRadius: 100,
    gap:5,
    alignItems: "center",
    flexDirection:'row'
  },
  text__header: {
    fontSize: sizes.size_base,
    color: colors.clr_white,
    fontWeight: "bold",
  },
  text__detail: {
    fontSize: sizes.size_xs,
    color: colors.clr_lightgray,
    width: 310,
  },
  text__topic: {
    fontSize: sizes.size_base,
    color: colors.clr_lightgray,
    fontWeight: "bold",
  },
  dumbbell_top: {
    position: "absolute",
    top: -20,
    right: 0,
    opacity: 0.1,
    zIndex: 0,
    transform: [{ rotate: "-55deg" }],
  },
  dumbbell_middle: {
    position: "absolute",
    top: 20,
    right: 50,
    opacity: 0.2,
    zIndex: 0,
    transform: [{ rotate: "45deg" }],
  },
  dumbbell_bottom: {
    position: "absolute",
    top: 80,
    right: -10,
    opacity: 0.3,
    zIndex: 0,
    transform: [{ rotate: "-50deg" }],
  },
});
