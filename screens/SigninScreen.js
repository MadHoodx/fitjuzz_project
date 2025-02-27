// screens/ProfileScreen.js
import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import styles, { sizes } from '../styles/style';
import SigninScreenStyle from '../styles/components/SigninScreenStyle';
import HeaderAlternative from '../components/HeaderAlternative';

export default function SigninScreen({ navigation }) {
  return (
    
    <View style={[SigninScreenStyle.container]}>
      <HeaderAlternative></HeaderAlternative>
      <View style={[styles.container]}>
          <View style={SigninScreenStyle.input__section}>
            <TextInput
              style={SigninScreenStyle.input}
              placeholder="Email"
            />
            <TextInput
              style={SigninScreenStyle.input}
              placeholder="Password"
            />
            <Text style={[styles.orangeText, SigninScreenStyle.forgetPassword, {fontWeight: 'bold'}]}>Forget Password?</Text>
          </View>
          <View style={[SigninScreenStyle.section]}>
            <TouchableOpacity
              style={[styles.button, styles.section]}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <View style={SigninScreenStyle.line__section}>
              <View style={SigninScreenStyle.line} />
              <Text style={{fontSize: sizes.size_xl, fontWeight: 'bold'}}>Or login with</Text>
              <View style={SigninScreenStyle.line} />
            </View>
            <View style={SigninScreenStyle.button__section}>
              <TouchableOpacity style={SigninScreenStyle.button}>
                <Image source={require('../assets/images/facebook-logo.png')} style={SigninScreenStyle.logo} />
              </TouchableOpacity>
              <TouchableOpacity style={SigninScreenStyle.button}>
                <Image source={require('../assets/images/google-logo.png')} style={SigninScreenStyle.logo} />
              </TouchableOpacity>
              <TouchableOpacity style={SigninScreenStyle.button}>
                <Image source={require('../assets/images/apple-logo.png')} style={SigninScreenStyle.logo} />
              </TouchableOpacity>
            </View>
          
          </View>
          <View style={SigninScreenStyle.footer__section}>
            
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>if you don't have account.</Text>
            <TouchableOpacity>
                <Text style={[styles.orangeText, {fontSize: 16, fontWeight: 'bold'}]}>Sign up</Text>
              </TouchableOpacity>
          </View>

      </View>
    </View>
    
      
  );
}
