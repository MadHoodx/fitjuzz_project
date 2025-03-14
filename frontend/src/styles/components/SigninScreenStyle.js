import { StyleSheet } from "react-native";
import { colors, sizes } from "../style";

const SigninScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  input__section: {
  
    marginTop: 20,
    gap: 16,
  },
  forgetPassword: {
    textAlign: "right",
    fontWeight: "bold",
  },
  line__section: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 26,
    gap: 14,
  },
  line: {
    borderWidth: 1,
    borderColor: colors.clr_gray,
    paddingHorizontal: 40,
  },
  button__section: {
    flexDirection: 'row',
    marginVertical: 16,
    
  },
  footer__section: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  
    marginBottom: 10,
    gap:4
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontSize: sizes.size_sm
  }
});

export default SigninScreenStyle;
