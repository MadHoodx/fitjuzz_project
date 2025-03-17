import { StyleSheet } from "react-native"
import { colors } from "../style";


const HomeScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
 
  },
  box: {
   
    backgroundColor : colors.clr_white,
    width: 300,
    height: 80,
    borderRadius: 20,
    textAlign: 'left',
    paddingLeft: 20,
    paddingTop: 10,
    marginBottom: 10
  }
})


export default HomeScreenStyle;