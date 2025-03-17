import { StyleSheet } from "react-native";
import { colors, sizes } from "../style";
const ForgetPasswordScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
  },

  resetpassword__section: {
    gap: 15,
  },
  verify__section: {
    gap: 28,
  },
  digit__section: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input__minibox: {
    width: 56,
    height: 60,
    fontSize: sizes.size_lg,
    textAlign: "center",
    borderRadius: 20,
    backgroundColor: colors.clr_gray,
    opacity: 0.7,
  },
  successful__section: {
    alignItems: 'center',
    gap: 28,
},
logo: {
    width: 100,
    height: 100
},
error: {
  textAlign: 'center',
  paddingHorizontal: 16,
  color: 'red',
  fontSize: sizes.size_base
}

});

export default ForgetPasswordScreenStyle;
