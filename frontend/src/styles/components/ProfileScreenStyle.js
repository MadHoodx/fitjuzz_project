import { StyleSheet } from "react-native";
import { colors, sizes } from "../style";

const ProfileScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  text__topic: {
    color: colors.clr_white,
    fontSize: sizes.size_lg,
    fontWeight: "bold",
  },
  box: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 110,
    width: "49%",
  },
  longbox: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingHorizontal: 15,
    paddingVertical: 13,
    width: "100%",
  },

  profile_box: {
    padding: 20,
    height: 200,
    alignItems: "center",
  },
  profile: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 100,
    position: "absolute",
    top: 2,
    zIndex: 1,
    overflow: "hidden",
    backgroundColor: colors.clr_white,
  },
  profile_button_edit: {
    width: 20,
    height: 20,
    backgroundColor: colors.clr_brightblue,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 180,
    zIndex: 2,
  },

  profile_container: {
    backgroundColor: colors.clr_background_modal,
    width: 310,
    height: 150,
    marginTop: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    alignItems: "center",
    gap: 10,
  },
  username_text: {
    color: colors.clr_white,
    fontSize: sizes.size_lg,
    textAlign: "center",
    paddingTop: 40,
    fontWeight: "bold",
  },
  button: {
    width: 100,
    height: 30,
    backgroundColor: colors.clr_blue,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  button__text: {
    color: colors.clr_lightgray,
    fontSize: sizes.size_2xs,
  },
  inside_box: {
    gap: 5,
    justifyContent: "center",
  },
  button_edit: {
    width: 20,
    height: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  footer__box: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header_text: {
    color: colors.clr_lightgray,
    fontSize: sizes.size_xs,
    fontWeight: "bold",
  },
  header_box_bmi: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body__box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  body__data__box: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
  },
  body_text_number: {
    fontSize: sizes.size_4xl,
    fontWeight: "bold",
    color: colors.clr_white,
  },
  body_text_unit: {
    fontSize: sizes.size_2xs,
    color: colors.clr_lightgray,
  },
  bmi_text: {
    color: colors.clr_white,
    fontSize: sizes.size_2xl,
    fontWeight: "bold",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  pointer: {
    borderLeftWidth: 3,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: colors.clr_lightgray,
    position: "absolute",
    transform: [{ translateX: -3 }],
    marginTop: 4,
  },
  rangeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rangeLabel: {
    fontSize: sizes.size_3xs,
    color: colors.clr_lightgray,
  },
  barColors: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },
  colorBlock: {
    width: "20%",
    height: 5,
  },
  box_modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inside_box_modal: {
    borderRadius: 10,
    padding: 20,
    width: 315,
    height: 550,
    backgroundColor: "#3A3A3A",
    alignItems:'center'
  },
  modal_header_text: {
    fontSize: sizes.size_xl,
    fontWeight: "bold",
    color: colors.clr_lightgray,
    textAlign:'center'
  },
  modal_input_box: {
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
  },
 

  modal_button: {
    alignItems:'center',
    width:128,
    height:39,
    padding: 10,
    borderRadius: 20,
  },
  modal_sex_button: {
    width: 110,
    height: 110,
    borderRadius: 100,
    alignItems: "center",
    backgroundColor:colors.clr_graybutton
  },
  selectedSex: {
    backgroundColor: colors.clr_brightblue, 
  },
  
  table_header: {
    flexDirection: "row",
    borderWidth: 1,
    backgroundColor: "lightblue",
    marginTop: 8,
  },
  table_header_cell: {
    borderWidth: 1,
    textAlign: "center",
  },
  table_row: {
    flexDirection: "row",
    borderWidth: 1,
    backgroundColor: "lightgray",
  },
  table_row_cell: {
    borderWidth: 1,
    backgroundColor: "lightgray",
  },
  muscle__box: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingHorizontal: 15,
    paddingVertical: 13,
    height: 130,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  muscle__inside__box: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dumbbell_top: {
    position: "absolute",
    top: 0,
    right: 40,
    opacity: 0.1,
    zIndex: 0,
    transform: [{ rotate: "-55deg" }],
  },
  dumbbell_middle: {
    position: "absolute",
    top: 20,
    right: 80,
    opacity: 0.2,
    zIndex: 0,
    transform: [{ rotate: "45deg" }],
  },
  dumbbell_bottom: {
    position: "absolute",
    top: 60,
    right: 40,
    opacity: 0.3,
    zIndex: 0,
    transform: [{ rotate: "-50deg" }],
  },
});

export default ProfileScreenStyle;
