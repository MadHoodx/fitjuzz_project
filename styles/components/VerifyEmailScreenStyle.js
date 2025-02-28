import { StyleSheet } from "react-native";
import {colors, sizes} from "../style"
const VerifyEmailScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 2,
      borderColor: "red",
    },
  
    resetpassword__section: {
      borderWidth: 2,
      borderColor: "red",
      gap: 28,
    },
    digit__section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      
    },
    input__minibox: {
        width: 56,
        height: 60,
        fontSize: sizes.size_lg,
        textAlign: 'center',
        borderRadius: 20,
        backgroundColor: colors.clr_gray,
        opacity: 0.7,
    },
    
  });

export default VerifyEmailScreenStyle;