import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import styles, { colors } from '../styles/style';
import { sizes } from '../styles/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header() {
    const [username, setUsername] = useState("");

  const fetchUsername = async () => {  // Define fetchUsername outside useEffect
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.user.username);
        
      }
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  useEffect(() => {
    fetchUsername();  // Call fetchUsername inside useEffect
  },);
  return (
    <View style={[header.container]}>
        <Text style={[styles.orangeText, {textAlign:'center', fontSize: sizes.size_2xl, fontWeight: 'bold', paddingTop: 60}]}>
            Myapp
        </Text>
        <View style={header.header__section}>
            <View style={header.header__details}>
                <Text style={[styles.whiteText , {fontSize: sizes.size_base, fontWeight: 'bold'}]}>Good Morning: {username}</Text>
                <Text style={{color: colors.clr_gray}}>Today, your program are : 
                <Text style={[styles.whiteText, {fontWeight: 'bold'}]}> (leg)</Text>
            </Text>
            </View>
            <TouchableOpacity>
                <Icon name="notifications" size={36} color={colors.clr_white} />
            </TouchableOpacity>
        </View>
      
    </View>
  );
}

const header = StyleSheet.create ({
    container: {
        flexBasis: 200,
        marginHorizontal: 0,
        paddingHorizontal: 16,
        backgroundColor: colors.clr_slate, 
        borderRadius: 20,
        marginTop: -20, 
    },
    header__section: {
        flexDirection: 'row',
        marginTop: 28,
        gap: 40,

    },
    header__details: {
        gap: 10
    }
})
