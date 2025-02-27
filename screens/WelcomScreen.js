import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from '../styles/style'

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={style.container}>Welcom to Myapp</Text>
      <TouchableOpacity style={style.button}  onPress={() => navigation.navigate('MyTabs')}>
        <Text>Get Started</Text>
      </TouchableOpacity>
        
    </View>
  );
}
