import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles/style";
import { sizes } from "../styles/style";
import WelcomeScreenStyle from "../styles/components/WelcomScreenStyle";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={[WelcomeScreenStyle.container]}>
      <View style={styles.container}>
      <Image
        source={require("../assets/images/Welcomimage.png")}
        style={WelcomeScreenStyle.placeholder}
      />
      <Text style={[styles.section]}></Text>
      <Text style={[styles.whiteText, { fontSize: sizes.size_4xl , textAlign: 'center'}]}>
        Welcom to
      </Text>
      <Text style={[styles.orangeText, { fontSize: sizes.size_6xl , textAlign: 'center'}]}>
        Fitjuzz
      </Text>
      <TouchableOpacity
        style={[styles.button, styles.section]}
        onPress={() => navigation.navigate("Main")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.section]}
        onPress={() => navigation.navigate("MyTabs")}
      >
       
        <Text style={styles.buttonText}>Tabs</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
