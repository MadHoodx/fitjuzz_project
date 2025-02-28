import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles, { sizes } from "../styles/style";
import SignupScreenStyle from "../styles/components/SignupScreenStyle";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";

export default function SignupScreen({ updateActiveScreen }) {
  const [visible, setVisible] = useState(false);
  const [activeIcon, setActiveIcon] = useState(true);

  const handleHiddenPassword = () => {
    setVisible(!visible);
    setActiveIcon(!activeIcon);
  };

  const iconName = activeIcon === true ? "eye" : "eye-off";

  return (
    <View style={[styles.container]}>
      <View style={SignupScreenStyle.input__section}>
        <TextInput
          style={SignupScreenStyle.input__box}
          placeholder="Username"
        />
        <TextInput style={SignupScreenStyle.input__box} placeholder="Email" />
        <View style={SignupScreenStyle.input__subsection}>
          <TextInput
            secureTextEntry={visible}
            style={SignupScreenStyle.input}
            placeholder="Password"
          />
          <TouchableOpacity onPress={handleHiddenPassword}>
            <Icon
              name={iconName}
              size={20}
              color="#888"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        </View>
        <View style={SignupScreenStyle.input__subsection}>
          <TextInput
            secureTextEntry={visible}
            style={SignupScreenStyle.input}
            placeholder="Confirm Password"
          />
          <TouchableOpacity onPress={handleHiddenPassword}>
            <Icon
              name={iconName}
              size={20}
              color="#888"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={SignupScreenStyle.button__section}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <View style={SignupScreenStyle.line__section}>
          <View style={SignupScreenStyle.line} />
          <Text style={{ fontSize: sizes.size_xl, fontWeight: "bold" }}>
            Or login with
          </Text>
          <View style={SignupScreenStyle.line} />
        </View>
        <View style={SignupScreenStyle.button__box}>
          <TouchableOpacity style={SignupScreenStyle.button}>
            <Image
              source={require("../assets/images/facebook-logo.png")}
              style={SignupScreenStyle.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity style={SignupScreenStyle.button}>
            <Image
              source={require("../assets/images/google-logo.png")}
              style={SignupScreenStyle.logo}
            />
          </TouchableOpacity>
          <TouchableOpacity style={SignupScreenStyle.button}>
            <Image
              source={require("../assets/images/apple-logo.png")}
              style={SignupScreenStyle.logo}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={SignupScreenStyle.footer__section}>
        <Text style={{ fontSize: sizes.size_base, fontWeight: "bold" }}>
          Already have account?
        </Text>
        <TouchableOpacity onPress={() => updateActiveScreen("signin")}>
          <Text
            style={[
              styles.orangeText,
              { fontSize: sizes.size_base, fontWeight: "bold" },
            ]}
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
