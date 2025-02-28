import { Platform, StyleSheet } from "react-native";

export const sizes = {
  size_3xs: 8,
  size_2xs: 10,
  size_xs: 12,
  size_sm: 14,
  size_base: 16,
  size_lg: 18,
  size_xl: 20,
  size_2xl: 24,
  size_3xl: 30,
  size_4xl: 36,
  size_5xl: 48,
  size_6xl: 60,
  size_7xl: 72,
  size_8xl: 96,
  size_9xl: 128,
};

export const colors = {
  clr_white: "#FFFFFF",
  clr_lightgray: "#EFEFEF",
  clr_gray: "#C0C0C0",
  clr_black: "#1C2431",
  clr_slate: "#334357",
  clr_orange: "#E77339",
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    paddingHorizontal: 40,
    marginTop: Platform.OS === "android" ? sizes.size_5xl : 0,
    // borderWidth: 2,
    // borderColor: "red",

  },
  section: {
    marginTop: 28,
  },
  whiteText: {
    color: colors.clr_white,
  },
  orangeText: {
    color: colors.clr_orange,
  },
  button: {
    width: "100%",
    backgroundColor: colors.clr_black,
    borderRadius: 20,
    paddingVertical: 18,
    elevation: 24,
  },

  buttonText: {
    fontSize: sizes.size_base,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.clr_white,
    color: colors.clr_lightgray,
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
  title: {
    fontSize: sizes.size_xl,
    fontWeight: 'bold'
  },
  sub__title: {
    fontSize: sizes.size_base,
    fontWeight: 'bold',
    color: colors.clr_gray
  }
});

export default styles;
