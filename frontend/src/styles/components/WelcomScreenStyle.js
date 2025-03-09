import { Platform, StyleSheet } from "react-native"
import { colors } from "../style";

const WelcomeScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: colors.clr_slate,
  },
  placeholder: {
    maxWidth: '100%',
    height: '40%'
  }
})


export default WelcomeScreenStyle;