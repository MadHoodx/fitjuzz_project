import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import styles, { colors } from '../styles/style';
import { sizes } from '../styles/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';

export default function HeaderAlternative() {
    const [isSelected, setIsSelected] = useState(1);
    const [welcomeMessage, setWelcomeMessage] = useState('Let’s get you signed in !');

    const handleSetIsSelected = () => {
        setIsSelected(!isSelected);
    };
    const changeToSignedIn = () => {
        setWelcomeMessage('Let’s get you signed in !');
    };
    const changeToRegistered = () => {
        setWelcomeMessage('Let’s get you registered !');
    };

    const onPressHandler = () => {
        handleSetIsSelected();
        changeToSignedIn();
    };
    const onPressHandler1 = () => {
        handleSetIsSelected();
        changeToRegistered();
    };
  return (
    <View style={[headerAlternative.container]}>
        <Text style={[styles.whiteText, {fontSize: sizes.size_2xl, fontWeight: 'bold', paddingTop: 70}]}>
            {welcomeMessage}
        </Text>

        <View style={headerAlternative.button__section}>
            
            <TouchableOpacity
            style={[headerAlternative.button, {left: 26}, isSelected ? headerAlternative.selected : headerAlternative.notSelected]}
            onPress={onPressHandler}
            >
                <Text style={[headerAlternative.buttonText, isSelected ? headerAlternative.selectedText : headerAlternative.notSelectedText]}>
                    Signi In
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[headerAlternative.button, {right: 26},isSelected ? headerAlternative.notSelected : headerAlternative.selected]}
            onPress={onPressHandler1}
            >
                <Text style={[headerAlternative.buttonText, isSelected ? headerAlternative.notSelectedText : headerAlternative.selectedText]}>
                    Sign Up
                </Text>
            </TouchableOpacity>

        
        </View>
      
    </View>
  );
}

const headerAlternative = StyleSheet.create ({
    container: {
        flexBasis: 200,
        marginHorizontal: 0,
        paddingHorizontal: 40,
        backgroundColor: colors.clr_slate, 
        borderRadius: 20,
        marginTop: -10, 
    },
    button__section: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 28,
    },
    button: {
        borderRadius: 40,
        paddingVertical: 16,
        paddingHorizontal: 66

    },
    buttonText: {
        fontSize: sizes.size_base,
    },
    selected: {
        backgroundColor: colors.clr_orange,
        borderColor: colors.clr_orange,
        zIndex: 1
    },
    notSelected: {
        backgroundColor: colors.clr_white,
        borderColor: colors.clr_white,
        zIndex: 0
    },
    selectedText: {
        color: colors.clr_white,
    },
    notSelectedText: {
        color: colors.clr_black,
    }
})
