import { StyleSheet } from "react-native";
import { colors, sizes } from "../style";

const ProfileScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "red",
    borderWidth: 2,
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
  },
  profile: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    borderRadius: 100,
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
  bmi_bar: {
    width: 105,
    height: 5,
    backgroundColor: "red",
  },
});

export default ProfileScreenStyle;
