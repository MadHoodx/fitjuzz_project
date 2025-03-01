import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles, { sizes } from "../styles/style";
import HeaderAlternative from "../components/HeaderAlternative";
import PasswordResetScreenStyle from "../styles/components/ForgetPasswordScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import InputWithEye from "../components/InputWithEye";

export default function PasswordResetScreen({}) {
  const navigation = useNavigation();
  
  return (
    <View style={PasswordResetScreenStyle.container}>
      <HeaderAlternative isResetPasswordPage={true}></HeaderAlternative>
      <View style={[styles.container]}>
        <View
          style={[
            PasswordResetScreenStyle.resetpassword__section,
            styles.section,
          ]}
        >
          <Text style={styles.title}>Password reset</Text>
          <Text style={styles.sub__title}>
            create a new password. Ensure it differs from previous one for
            security
          </Text>
          <InputWithEye placeholder={"Password"}></InputWithEye>
          <InputWithEye placeholder={"Confirm Password"}></InputWithEye>
          <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('SuccessfullyReset')} >
            <Text style={styles.buttonText}>Update Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
