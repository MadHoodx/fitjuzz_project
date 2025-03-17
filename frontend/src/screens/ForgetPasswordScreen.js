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

export default function ForgetPasswordScreen({ }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [isSentOtpVisible, setisSentOtpVisible] = useState(1);
  const [isOtpVisible, setIsOtpVisible] = useState(0);
  const [isPasswordResetVisible, setIsPasswordResetVisible] = useState(0);
  const [isSuccessfullyResetVisible, setIsSuccessfullyResetVisible] = useState(0);
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(0);
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
    if (email == "") {
      setLoading(1)
      setError("please enter your email")
      return
    }
    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/sentOtp`,
        {
          email,
        }
      );

      setisSentOtpVisible(0);
      setIsOtpVisible(1);
    } catch (error) {
      if (error.status == 405) {
        setLoading(1)
        setError('Invalid email format')
      }
      else if (error.status == 404) {
        setLoading(1)
        setError('Sorry, user not found')
      }
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/verifyOtp`,
        {
          email,
          otp,
        }
      );


      setIsOtpVisible(0);
      setIsPasswordResetVisible(1);
    } catch (error) {
      if (error.status == 400) {
        setLoading(1)
        setError('Invalid OTP')
      }
    }
  };

  const handleChangePassword = async () => {
    if (password !== ConfirmPassword) {
      setLoading(1)
      setError('Password do not match each other')
      return;
    }

    try {
      await axios.put(`${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/passwordReset`, {
        email,
        password: password,
      });

      setIsPasswordResetVisible(0);
      setIsSuccessfullyResetVisible(1);
    } catch (error) {
      console.log(error);
      Alert.alert("Failed");
    }
  };

  return (
    <View style={ForgetPasswordScreenStyle.container}>
      <HeaderAlternative isResetPasswordPage={true}></HeaderAlternative>
      {isSentOtpVisible ? (
        <View style={[styles.container]}>
          <View
            style={[
              ForgetPasswordScreenStyle.resetpassword__section,
              styles.section,
            ]}
          >
            <Text style={[styles.title, { color: colors.clr_brightblue }]}>Reset password</Text>
            <Text style={styles.sub__title}>
              Please enter your email address that you used to create an account
            </Text>
            <TextInput
              style={[styles.input__box,]}
              placeholder="Enter you email"
              value={email}
              onChangeText={setEmail}
            />
            {loading ? <Text style={ForgetPasswordScreenStyle.error}>{error}</Text> : null}
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
              style={[
                ForgetPasswordScreenStyle.verify__section,
                styles.section,
              ]}
            >
              <Text style={[styles.title, { color: colors.clr_brightblue }]}>Check your email</Text>
              <Text style={styles.sub__title}>
                We sent OTP to your
                <Text style={{ fontWeight: "bold", color: colors.clr_brightblue }}>
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
              {loading ? <Text style={ForgetPasswordScreenStyle.error}>{error}</Text> : null}
              <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>

              <Text style={{ textAlign: "center" }}>
                Haven't got an email?{" "}
                <TouchableOpacity>
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
                </TouchableOpacity>

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
            {loading ? <Text style={ForgetPasswordScreenStyle.error}>{error}</Text> : null}
            <TouchableOpacity
              style={styles.button}
              onPress={handleChangePassword}
            >
              <Text style={styles.buttonText}>Update Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {isSuccessfullyResetVisible ? (
        <View style={[styles.container]}>
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
        </View>
      ) : null}
    </View>
  );
}
