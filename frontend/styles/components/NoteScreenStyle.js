import { StyleSheet } from "react-native";
import { colors, sizes } from "../style";

const NoteScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  input__section: {
    fontSize: sizes.size_base,
    paddingLeft: 20,
    paddingRight: 15,
    borderRadius: 20,
    backgroundColor: colors.clr_gray,
    opacity: 0.7,
    height: 60,
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
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

  removeExerciseBoxText:{
    color: colors.clr_orange,
    fontSize: sizes.size_base,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    textDecorationLine: "underline",
  },
  
  box_modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  inside_box_modal: {
    backgroundColor: colors.clr_lightgray,
    borderRadius: 10,
    padding: 25,
    width: "80%",
    height: "85%",
  },
  modal_header_text_: {
    fontSize: sizes.size_3xl,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.clr_slate,
  },
  modal_category_box: {
    marginTop: 15,
    flexDirection:'row',
    flexWrap:'wrap',
    gap:10,
    alignItems:'center'
  },
  modal_category_inside: {
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modal_category_inside_text: {
    
    fontSize: sizes.size_xs,
    fontWeight: "bold",
  },
  modal_body:{
    flexDirection:'row',
    justifyContent:'center',
    gap:10,
    paddingTop:20,
    flexWrap:"wrap"
  },
  dumbbell_top: {
    position: "absolute",
    top: 5,
    right: 30,
    opacity: 0.1,
    zIndex: 0,
    transform: [{ rotate: "-55deg" }],
  },
  dumbbell_middle: {
    position: "absolute",
    top: 40,
    right: 100,
    opacity: 0.2,
    zIndex: 0,
    transform: [{ rotate: "45deg" }],
  },
  dumbbell_bottom: {
    position: "absolute",
    top: 80,
    right: 45,
    opacity: 0.2,
    zIndex: 0,
    transform: [{ rotate: "-50deg" }],
  },
});

export default NoteScreenStyle;
