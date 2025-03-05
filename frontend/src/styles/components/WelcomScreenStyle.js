import { Platform, StyleSheet } from "react-native"
import { colors } from "../style";

const WelcomeScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.clr_slate,
    marginTop: Platform.OS === 'android' ? 50 : 0
  },
  placeholder: {
    maxWidth: '100%',
    height: '40%'
  }
})


export default WelcomeScreenStyle;