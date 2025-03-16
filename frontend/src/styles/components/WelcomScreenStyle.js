import { Platform, StyleSheet } from "react-native"
import { colors, sizes } from "../style";

const WelcomeScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.clr_background,
    paddingBottom: 50
  },
  detailContainer: {
    marginVertical: 40,
 
  },
  slide__section: {
    
    paddingHorizontal: 40,
    gap: 20
  },

  title: {
    fontSize: sizes.size_2xl,
    fontWeight: "bold",
    textAlign: 'center',
    color: "white",

  },
  description: {
    fontSize: sizes.size_lg,
    color: "white",
    textAlign: 'center',

  },
  indicatorContainer: {
    flexDirection: "row",
    marginBottom: 40,

  },
  indicator: {

    width: 30,
    height: 5,
    borderRadius: 2,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  backgroundImage: {
    flex: 1,
    maxHeight: '65%',
    maxWidth: '100%'
  },
  imageStyle: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    opacity: 0.7
  }

})


export default WelcomeScreenStyle;