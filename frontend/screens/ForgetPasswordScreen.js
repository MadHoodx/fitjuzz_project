import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles, { sizes } from "../styles/style";
import HeaderAlternative from "../components/HeaderAlternative";
import ForgetPasswordScreenStyle from "../styles/components/ForgetPasswordScreenStyle";
import { useNavigation } from "@react-navigation/native";

export default function ForgetPasswordScreen({}) {
    const navigation = useNavigation()
  return (
    <View style={ForgetPasswordScreenStyle.container}>
      <HeaderAlternative isResetPasswordPage={true}></HeaderAlternative>
      <View style={[styles.container]}>
        <View
          style={[
            ForgetPasswordScreenStyle.resetpassword__section,
            styles.section
          ]}
        >
          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.sub__title}>
            Please enter your email address that you used to create an account
          </Text>
          <TextInput style={styles.input__box} placeholder="Email" />

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VerifyEmail')}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
}
