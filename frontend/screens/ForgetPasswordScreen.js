import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import styles, { sizes } from "../styles/style";
import HeaderAlternative from "../components/HeaderAlternative";
import ForgetPasswordScreenStyle from "../styles/components/ForgetPasswordScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";

export default function ForgetPasswordScreen({}) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");



  const handleSentOtp = async () => {
    try{

      const response = await axios.post('http://192.168.221.234:5000/api/user/sentOtp', {
        email
      })

      Alert.alert("Succesfully sent otp", response.data.message);
      navigation.navigate('VerifyEmail')

    } catch (error) {
      
      Alert.alert('Error sending OTP', error);
    }
  }

  return (
    <View style={ForgetPasswordScreenStyle.container}>
      <HeaderAlternative isResetPasswordPage={true}></HeaderAlternative>
      <View style={[styles.container]}>
        <View
          style={[
            ForgetPasswordScreenStyle.resetpassword__section,
            styles.section,
          ]}
        >
          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.sub__title}>
            Please enter your email address that you used to create an account
          </Text>
          <TextInput
            style={styles.input__box}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          
          <TouchableOpacity
            style={styles.button}
            onPress={handleSentOtp}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
