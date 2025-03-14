
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import Header from '../components/Header';
import styles from '../styles/style';
import ExerciseScreenStyle from '../styles/components/ExerciseScreenStyle';

export default function HomeScreen({}) {
  return (
    
    <View style={[ExerciseScreenStyle.container]}>
      <Header></Header>
      <View style={[styles.container]}>

      </View>
    </View>
  
  );
}
