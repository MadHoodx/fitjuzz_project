import { StyleSheet } from "react-native";
import {colors, sizes} from "../style"
const PasswordResetScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
     
    },
  
    resetpassword__section: {
      
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

export default PasswordResetScreenStyle;