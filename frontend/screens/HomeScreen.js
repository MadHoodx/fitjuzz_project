// screens/HomeScreen.js
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import Header from '../components/Header';
import styles from '../styles/style';
import HomeScreenStyle from '../styles/components/HomeScreenStyle';

export default function HomeScreen({}) {
  return (
    
    <View style={[HomeScreenStyle.container]}>
      <Header></Header>
      <View style={[styles.container]}>

      </View>
    </View>
  
  );
}
