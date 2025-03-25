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
    paddingHorizontal: 15,
    paddingVertical: 13,
    height: 130,
    width: "48%",
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
    width: '100%'

  },

  profile_box: {
    padding: 20,
    height: 200,
    alignItems: "center",
  },
  profile: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderRadius: 100,
    position: "absolute",
    top: 2,
    zIndex: 1,
    overflow: "hidden",
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
  },
  username_text: {
    color: colors.clr_white,
    fontSize: sizes.size_lg,
    textAlign: "center",
    paddingTop: 50,
    fontWeight: "bold",
  },
  inside_box: {
    gap: 10,
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
    color: colors.clr_slate,
    fontSize: sizes.size_xs,
    fontWeight: "bold",
  },
  header_box_bmi: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body_box: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  body__data__box: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
  },
  body_text_number: {
    fontSize: sizes.size_4xl,
    fontWeight: "bold",
  },
  body_text_unit: {
    fontSize: sizes.size_2xs,
    color: "gray",
  },
  body_box_bmi: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  bmi_text: {
    color: colors.clr_slate,
    fontSize: sizes.size_xl,
    fontWeight: "bold",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    fontSize: sizes.size_3xs,
    marginRight: 5,
  },
  pointer: {
    borderLeftWidth: 3,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "black",
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
    backgroundColor: "black",
  },
  modal_header_text: {
    fontSize: sizes.size_xl,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  modal_input_box: {
    borderBottomWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
  },
  modal_text_input: {
    fontSize: sizes.size_2xl,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modal_button: {
    padding: 10,
    borderRadius: 5,
  },
  table_header: {
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor : 'lightblue',
    marginTop: 8
  },
  table_header_cell: {
    borderWidth: 1,
    textAlign: 'center'
  },
  table_row: {
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor : 'lightgray',

  },
  table_row_cell: {
    borderWidth: 1,
    backgroundColor : 'lightgray',
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
    flexDirection:'row',
    justifyContent:'space-between',
  },
  muscle__inside__box:{
    flexDirection:'row',
    justifyContent:'space-between',
  }
});

export default ProfileScreenStyle;
