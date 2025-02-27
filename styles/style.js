import { Platform, StyleSheet } from "react-native"


const baseSize = 16; // This acts as the equivalent of 1rem

export const rem = (value) => {
  return baseSize * value;
};

export const colors = {
  clr_white: '#FFFFFF',
  clr_black: '#1C2431',
  clr_slate: '#334357',
  clr_orange: '#E77339'
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    paddingHorizontal: rem(1.75),
    marginTop: Platform.OS === "android" ? rem(3) : 0
  },
  section: {
    marginTop: rem(1.75)
  },
  whiteText: {
    color: colors.clr_white
  },
  orangeText: {
    color: colors.clr_orange
  },
  button: {
    backgroundColor: colors.clr_black,
    borderRadius: rem(1.2),
    paddingVertical: rem(1.125),
    paddingHorizontal: rem(7.5)
    
  },
  buttonText: {
    fontSize: rem(1),
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.clr_white
  }
})


export default styles;