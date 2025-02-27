import * as React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/style';
import Header from '../components/Header';
import ProfileScreenStyle from '../styles/components/ProfileScreenStyle';

export default function NoteScreen({ navigation }) {
  return (
    <View style={[ProfileScreenStyle.container]}>
      <Header></Header>
      <View style={[styles.container]}>

      </View>
    </View>
  );
}
