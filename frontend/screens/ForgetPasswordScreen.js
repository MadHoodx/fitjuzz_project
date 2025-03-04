import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import styles, { sizes, colors } from "../styles/style";
import HeaderAlternative from "../components/HeaderAlternative";
import ForgetPasswordScreenStyle from "../styles/components/ForgetPasswordScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";

import { useRef } from "react";
import InputWithEye from "../components/InputWithEye";

export default function ForgetPasswordScreen({}) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [isSentItoVisible, setIsSentItoVisible] = useState(1);
  const [isOtpVisible, setIsOtpVisible] = useState(0);
  const [isPasswordResetVisible, setIsPasswordResetVisible] = useState(0);
  const [isSuccessfullyResetVisible, setIsSuccessfullyResetVisible] = useState(0)
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState(new Array(5).fill(""));
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value) {
      if (index < 4) {
        inputRefs.current[index + 1].focus();
      }
    } else if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSentOtp = async () => {
    try {
      const response = await axios.post(
        "http://192.168.221.234:5000/api/user/sentOtp",
        {
          email,
        }
      );

      Alert.alert("Succesfully sent otp", response.data.message);
      setIsSentItoVisible(0);
      setIsOtpVisible(1);
    } catch (error) {
      console.error("Error sending OTP:", error.data.message);
      Alert.alert("Error sending OTP", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        "http://192.168.221.234:5000/api/user/verifyOtp",
        {
          email,
          otp,
        }
      );
      Alert.alert(response.data.message);

      setIsOtpVisible(0);
      setIsPasswordResetVisible(1);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Error verifying OTP");
    }
  };

  const handleChangePassword = async () => {

    if(password !== ConfirmPassword){
      return Alert.alert("password do not match eact other")
    }

    try {
      await axios.put('http://192.168.221.234:5000/api/user/passwordReset', {
        email,
        password : password
      })

      console.log("Successfully reset password")
      Alert.alert("Success")
      setIsPasswordResetVisible(0)
      setIsSuccessfullyResetVisible(1)
    }
    catch (error) {
      console.log(error)
      Alert.alert("Failed")
    }
  }

  return (
    <View style={ForgetPasswordScreenStyle.container}>
      <HeaderAlternative isResetPasswordPage={true}></HeaderAlternative>
      {isSentItoVisible ? (
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

            <TouchableOpacity style={styles.button} onPress={handleSentOtp}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {isOtpVisible ? (
        <View style={ForgetPasswordScreenStyle.container}>
          <View style={[styles.container]}>
            <View
              style={[ForgetPasswordScreenStyle.verify__section, styles.section]}
            >
              <Text style={styles.title}>Check your email</Text>
              <Text style={styles.sub__title}>
                We sent OTP to your
                <Text style={{ fontWeight: "bold", color: colors.clr_black }}>
                  {" "}
                  {email}{" "}
                </Text>
                enter 5 digit code that mentioned in email
              </Text>
              <View style={ForgetPasswordScreenStyle.digit__section}>
                {otp.map((otp, index) => (
                  <TextInput
                    key={index}
                    value={otp}
                    style={ForgetPasswordScreenStyle.input__minibox}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(otp) => handleInputChange(index, otp)}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                  ></TextInput>
                ))}
              </View>

              <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
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
      ) : null}

      {isPasswordResetVisible ? (
        <View style={[styles.container]}>
          <View
            style={[
              ForgetPasswordScreenStyle.resetpassword__section,
              styles.section,
            ]}
          >
            <Text style={styles.title}>Password reset</Text>
            <Text style={styles.sub__title}>
              create a new password. Ensure it differs from previous one for
              security
            </Text>
            <InputWithEye
              placeholder={"Password"}
              value={password}
              onChangeText={setPassword}
            ></InputWithEye>
            <InputWithEye
              placeholder={"Confirm Password"}
              value={ConfirmPassword}
              onChangeText={setConfirmPassword}
            ></InputWithEye>
            <TouchableOpacity
              style={styles.button}
              onPress={handleChangePassword}
            >
              <Text style={styles.buttonText}>Update Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {isSuccessfullyResetVisible ? <View style={[styles.container]}>
        <View
          style={[
            ForgetPasswordScreenStyle.successful__section,
            styles.section,
          ]}
        >
          <View style={styles.section}></View>
          <Image
            source={require("../assets/images/successful.png")}
            style={ForgetPasswordScreenStyle.logo}
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
      </View> : null}
    </View>
  );
}
