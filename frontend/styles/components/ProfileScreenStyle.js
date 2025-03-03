import { StyleSheet } from "react-native";
import { colors, sizes } from "../style";

const ProfileScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    backgroundColor: "white",
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

  profile_box: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    padding: 20,
    height: 150,
    alignSelf: "stretch",
    flexDirection: "row",
    gap: 25,
  },
  profile: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  edit_profile_image: {
    position: "absolute",
    width: 25,
    height: 20,
    backgroundColor: colors.clr_slate,
    zIndex: 1,
    top:100,
    right:195,
    borderRadius: 20,
    alignItems:'center',
    justifyContent:'center'
  },
  footer_profile_box: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: 150,
  },
  footer_profile_box_text: {
    fontSize: sizes.size_2xs,
    color: colors.clr_gray,
  },
  inside_box: {
    gap: 15,
    justifyContent: "center",
  },
  button_edit: {
    width: 41,
    height: 22,
    backgroundColor: colors.clr_slate,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 3,
  },
  button_text: {
    textAlign: "center",
    color: colors.clr_gray,
    fontSize: sizes.size_3xs,
    fontWeight: "bold",
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
  body_text_number: {
    fontSize: sizes.size_2xl,
    fontWeight: "bold",
  },
  body_text_unit: {
    fontSize: sizes.size_xs,
    fontWeight: "bold",
  },
  body_box_bmi: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  bmi_text: {
    color: colors.clr_slate,
    fontSize: sizes.size_2xl,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  inside_box_modal: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modal_header_text_: {
    fontSize: sizes.size_xl,
    fontWeight: "bold",
    marginBottom: 10,
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
});

export default ProfileScreenStyle;
