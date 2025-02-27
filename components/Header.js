import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import styles, { colors } from '../styles/style';
import { sizes } from '../styles/style';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Header() {
  return (
    <View style={[header.container]}>
        <Text style={[styles.orangeText, {textAlign:'center', fontSize: sizes.size_2xl, fontWeight: 'bold', paddingTop: 60}]}>
            Myapp
        </Text>
        <View style={header.header__section}>
            <View style={header.header__details}>
                <Text style={[styles.whiteText , {fontSize: sizes.size_base, fontWeight: 'bold'}]}>Good Morning (usernameoooooooo)</Text>
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
        flex: 0.275,
        marginHorizontal: 0,
        paddingHorizontal: 16,
        backgroundColor: colors.clr_slate, 
        borderRadius: 20,
        marginTop: -10, 
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
