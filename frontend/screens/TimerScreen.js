import * as React from 'react';
import { View, Text, Button } from 'react-native';
import Header from '../components/Header';
import styles from '../styles/style';
import TimerScreenStyle from '../styles/components/TimerScreenStyle';

export default function HomeScreen({}) {
  return (
    
    <View style={[TimerScreenStyle.container]}>
      <Header></Header>
      <View style={[styles.container]}>

      </View>
    </View>
  
  );
}
