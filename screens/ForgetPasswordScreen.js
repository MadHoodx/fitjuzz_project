import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles, { sizes } from "../styles/style";
import HeaderAlternative from "../components/HeaderAlternative";
import ForgetPasswordScreenStyle from "../styles/components/ForgetPasswordScreenStyle";


export default function ForgetPasswordScreen({  }) {

  return (

    <View style={ForgetPasswordScreenStyle.container}>
        <HeaderAlternative isVisible={true} isResetPasswordPage={true} isResetPassword={true}></HeaderAlternative>
        <View style={[styles.container, { borderColor: "green" }]}>
        <Text>Forget</Text>
        </View>
    </View>
    
   
  );
}
