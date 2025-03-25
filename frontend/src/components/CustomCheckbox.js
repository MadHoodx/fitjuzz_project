import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../styles/style";



const CustomCheckbox = ({ value, setValue }) => {


    return (

        <TouchableOpacity
            style={[CustomCheckboxStyle.checkbox, value == 1 ? { backgroundColor: colors.clr_brightblue } : { backgroundColor: 'white' }]}
            value={value}
            onPress={() => setValue(!value)}
            >

        </TouchableOpacity>

    )

}

const CustomCheckboxStyle = StyleSheet.create({
    checkbox: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.clr_gray,
        width: 16,
        height: 16,
        marginHorizontal: 6
    }
})


export default CustomCheckbox