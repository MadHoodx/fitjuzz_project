import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import styles, { colors, sizes } from "../styles/style";
import SigninScreenStyle from "../styles/components/SigninScreenStyle";
import { useNavigation } from "@react-navigation/native";
import InputWithEye from "../components/InputWithEye";
import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useEffect } from "react";

// API client
import axios from "axios";

export default function SigninScreen({ updateActiveScreen }) {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [activeIcon, setActiveIcon] = useState(true);

  const handleHiddenPassword = () => {
    setVisible(!visible);
    setActiveIcon(!activeIcon);
  };

  const iconName = activeIcon === true ? "eye" : "eye-off";



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            // Validate token on server if needed
            navigation.navigate('Home'); // Or your protected screen
        }
    };
    checkToken();
  },)

  const handleSignin = async () => {
    console.log('Sending signin request:', {email, password});
    try {
      const response =  await axios.post('http://192.168.221.234:5000/api/signin', { // Replace with your server IP
        email,
        password,
      });

      // Store token in AsyncStorage (for persistent login)
      // await AsyncStorage.setItem('token', response.data.token);

      console.log('Signin response:', response.data);
      Alert.alert('Success', response.data.message);
      // Navigate to home screen or protected route
      navigation.navigate("Profile")
      
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred during signin.');
      }
    }
  };



  return (
    <View style={[styles.container]}>
      <View
        style={[
          SigninScreenStyle.input__section,
          { borderColor: "purple", paddingTop: 20 },
        ]}
      >


        <TextInput
          style={[styles.input__box]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.input__subsection}>
          <TextInput
            secureTextEntry={visible}
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={handleHiddenPassword}
           placeholder={"Password"}>
            <Icon
              name={iconName}
              size={20}
              color="#888"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        </View>

        {/* <InputWithEye 
        value={password}
        onChangeText={setPassword} placeholder={"Password"}></InputWithEye> */}

        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={[styles.orangeText, SigninScreenStyle.forgetPassword]}>
            Forget Password?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[SigninScreenStyle.button__section]}>
        <TouchableOpacity style={styles.button} onPress={handleSignin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <View style={SigninScreenStyle.line__section}>
          <View style={SigninScreenStyle.line} />
          <Text style={{ fontSize: sizes.size_xl, fontWeight: "bold" }}>
            Or login with
          </Text>
          <View style={SigninScreenStyle.line} />
        </View>
        <View style={SigninScreenStyle.button__box}>
          <TouchableOpacity style={SigninScreenStyle.button}>
            <Image
              source={require("../assets/images/facebook-logo.png")}
              style={SigninScreenStyle.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity style={SigninScreenStyle.button}>
            <Image
              source={require("../assets/images/google-logo.png")}
              style={SigninScreenStyle.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity style={SigninScreenStyle.button}>
            <Image
              source={require("../assets/images/apple-logo.png")}
              style={SigninScreenStyle.logo}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={SigninScreenStyle.footer__section}>
        <Text style={{ fontSize: sizes.size_base, fontWeight: "bold" }}>
          if you don't have an account.
        </Text>
        <TouchableOpacity onPress={() => updateActiveScreen("signup")}>
          <Text
            style={[
              styles.orangeText,
              { fontSize: sizes.size_base, fontWeight: "bold" },
            ]}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
