import { StyleSheet } from "react-native";
import { colors, sizes } from "../style";

const SignupScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  input__section: {
    borderColor: "red",
    borderWidth: 2,
    marginTop: 20,
    gap: 16,
  },
  input__subsection: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: colors.clr_gray,
    opacity: 0.7,
    height: 60,
  },
  input__box: {
    fontSize: sizes.size_base,
    paddingLeft: 20,
    paddingRight: 50,
    borderRadius: 20,
    backgroundColor: colors.clr_gray,
    opacity: 0.7,
    height: 60,
  },
  input: {
    flex: 1,
    fontSize: sizes.size_base,
    paddingLeft: 20,
    paddingRight: 10,
  },
  forgetPassword: {
    textAlign: "right",
  },
  line__section: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 14,
  },
  line: {
    borderWidth: 1,
    borderColor: colors.clr_gray,
    paddingHorizontal: 40,
  },
  button__section: {
    marginVertical: 16,
    borderColor: "red",
    borderWidth: 2,
  },
  button__box: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "#FFDFDF",
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
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 2,
    marginBottom: 10, 
    gap: 4
  },
});

export default SignupScreenStyle;
