import { Platform, StyleSheet } from "react-native"


export const sizes = {
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


}

export const colors = {
  clr_white: '#FFFFFF',
  clr_gray: '#C0C0C0',
  clr_black: '#1C2431',
  clr_slate: '#334357',
  clr_orange: '#E77339'
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    paddingHorizontal: 40,
    marginTop: Platform.OS === "android" ? sizes.size_5xl : 0
  },
  section: {
    marginTop: 28
  },
  whiteText: {
    color: colors.clr_white
  },
  orangeText: {
    color: colors.clr_orange
  },
  button: {
    backgroundColor: colors.clr_black,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 120
    
  },
  buttonText: {
    fontSize: sizes.size_base,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.clr_white
  }
})


export default styles;