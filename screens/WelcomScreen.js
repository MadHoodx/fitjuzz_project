import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/style';
import { sizes, colors } from '../styles/style';
import WelcomeScreenStyle from '../styles/components/WelcomScreenStyle';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={[styles.container, WelcomeScreenStyle.container]}>
      <Image
        source={require('../assets/placeholder.jpg')}
        style={WelcomeScreenStyle.placeholder}
      />
      <Text style={styles.section}></Text>
      <Text style={[styles.whiteText, {fontSize: 40}]}>Welcom to</Text>
      <Text style={[styles.orangeText, {fontSize: 60}]}>Myapp</Text>
      <TouchableOpacity style={[styles.button, styles.section]}  onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
        
    </View>
  );
}
