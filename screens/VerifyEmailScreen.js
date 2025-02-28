import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import styles, { sizes, colors } from "../styles/style";
import HeaderAlternative from "../components/HeaderAlternative";
import ForgetPasswordScreenStyle from "../styles/components/ForgetPasswordScreenStyle";
import VerifyEmailScreenStyle from "../styles/components/VerifyEmailScreenStyle";
import { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
export default function VerifyEmailScreen({}) {
    const navigation = useNavigation()
    const [otp, setOtp] = useState(new Array(5).fill(""))
    const inputRefs = useRef([])

    const handleInputChange = (index, value) => {
        let newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)


        if (value) {
            if (index < 4) {
                inputRefs.current[index + 1].focus();
            }
        } else if (index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }
  
  return (
    <View style={{ flex: 1 }}>
      <HeaderAlternative isResetPasswordPage={true}></HeaderAlternative>
      <View style={[styles.container]}>
        <View
          style={[
            ForgetPasswordScreenStyle.resetpassword__section,
            styles.section,
          ]}
        >
          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.sub__title}>
            We sent OTP to your
            <Text style={{ fontWeight: "bold", color: colors.clr_black }}>
              {" "}
              adadada@gmail.com{" "}
            </Text>
            enter 5 digit code that mentioned in email
          </Text>
          <View style={VerifyEmailScreenStyle.digit__section}>

            {otp.map((digit, index) => (
                <TextInput 
                    key={index}
                    value={digit}
                    style={VerifyEmailScreenStyle.input__minibox}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(digit) => handleInputChange(index,digit)}
                    ref={(ref)=> inputRefs.current[index] = ref}
                    >

                </TextInput>
            ))}

          </View>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PasswordReset')}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <Text style={{ textAlign: "center" }}>
            Haven't got an email?{" "}
            <Text
              style={{
                fontWeight: "bold",
                color: "#648DDB",
                textDecorationColor: "red",
                textDecorationLine: "underline",
              }}
            >
              Resend email
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
