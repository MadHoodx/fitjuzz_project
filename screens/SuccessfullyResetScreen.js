import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles, { sizes } from "../styles/style";
import HeaderAlternative from "../components/HeaderAlternative";
import { useNavigation } from "@react-navigation/native";
import SuccessfullyResetScreenStyle from "../styles/components/SuccessfullyResetScreenStyle";

export default function SuccessfullyResetScreen({}) {
  const navigation = useNavigation();
  return (
    <View style={SuccessfullyResetScreenStyle.container}>
      <HeaderAlternative isResetPasswordPage={true}></HeaderAlternative>
      <View style={[styles.container]}>
        <View
          style={[
            SuccessfullyResetScreenStyle.successful__section,
            styles.section,
          ]}
        >
          <View style={styles.section}></View>
          <Image
            source={require("../assets/images/successful.png")}
            style={SuccessfullyResetScreenStyle.logo}
          ></Image>
          <Text style={styles.title}>Successful</Text>
          <Text style={styles.sub__title}>
            Congratulation! Your password has been changed. Click continue to
            login
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
