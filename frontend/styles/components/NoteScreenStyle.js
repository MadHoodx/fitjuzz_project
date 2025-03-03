import { StyleSheet } from "react-native"
import { colors, sizes } from "../style";

const NoteScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  input__section: {

    fontSize: sizes.size_base,
    paddingLeft: 20,
    paddingRight: 15,
    borderRadius: 20,
    backgroundColor: colors.clr_gray,
    opacity: 0.7,
    height: 60,
    flexDirection: "row", // จัดวางในแนวนอน
    justifyContent: "space-between", // จัดวางให้ icon อยู่ทางขวา
    alignItems: "center", // จัดวางกึ่งกลางแนวตั้ง
  },
  
  dateText: {
    color: colors.clr_gray,
    fontSize: sizes.size_base,
    marginTop: 28,
    textAlign: "center",
    marginBottom: 30,
  },

  addButtonText: {
    fontSize: sizes.size_base,
    color: "grey",

    
  },
  icon: {
    marginLeft: 10,
  },

  addExerciseBoxText: {
    color: colors.clr_orange,
    fontSize: sizes.size_base,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    textDecorationLine: "underline", 
  },

})


export default NoteScreenStyle;