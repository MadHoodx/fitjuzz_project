import { StyleSheet } from "react-native"
import { colors } from "../style";

const SigninScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    borderColor: 'red',
    borderWidth: 2,
  },
  input__section: {
    borderColor: 'red',
    borderWidth: 2,
    marginTop: 20,
    gap: 26
  },
  input: {
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.clr_gray,
    opacity: 0.7,
    paddingLeft: 24,
    height: 60
  },
  forgetPassword: {
    marginTop: -8,
    textAlign: 'right'
  },
  line__section: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 36,
    gap: 14
  },
  line: {
    borderWidth: 1,
    borderColor: colors.clr_gray,
    paddingHorizontal: 40
  },
  button__section: {
    flexDirection: 'row',
    gap: 13
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 26,
    backgroundColor: '#FFDFDF',
    borderColor: colors.clr_orange,
    borderWidth: 1,
    borderRadius: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  footer__section: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderColor: 'red',
    borderWidth: 2,
    marginBottom: 20
  }
})


export default SigninScreenStyle;