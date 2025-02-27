// screens/HomeScreen.js
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/style';
import NoteScreenStyle from '../styles/components/NoteScreenStyle';
import Header from '../components/Header';

export default function NoteScreen({ navigation }) {
  return (
    <View style={[NoteScreenStyle.container]}>
      <Header></Header>
      <View style={[styles.container]}>

      </View>
    </View>
  );
}
