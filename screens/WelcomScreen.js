import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcom to Myapp</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyTabs')}>
        <Text>Get Started</Text>
      </TouchableOpacity>
        
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
})