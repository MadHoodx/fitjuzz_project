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
    backgroundColor: "#E0E0E0",
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  dateText: {
    color: colors.clr_gray,
    fontSize: sizes.size_base,
    marginTop: 0,
    textAlign: "center",
    marginBottom: 30,
  },

  addButtonText: {
    fontSize: sizes.size_base,
    color: "#424242",
    fontWeight: "500",
  },
  icon: {
    marginLeft: 10,
  },

  addExerciseBoxText: {
    color: colors.clr_orange,
    fontSize: sizes.size_base,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 0,
    marginBottom: 0,
    textDecorationLine: "underline",
  },

  removeExerciseBoxText: {
    color: colors.clr_orange,
    fontSize: sizes.size_base,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 0,
    textDecorationLine: "underline",
  },

  box_modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  inside_box_modal: {
    backgroundColor: colors.clr_background_modal,
    borderRadius: 10,
    padding: 25,
    width: "80%",
    height: "85%",
  },
  modal_header_text_: {
    fontSize: sizes.size_2xl,
    fontWeight: "bold",
    color: colors.clr_brightblue,
  },
  modal_category_box: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
  },
  modal_category_inside: {
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
  modal_category_inside_text: {
    fontSize: sizes.size_xs,
    fontWeight: "bold",
  },
  modal_body: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingTop: 20,
    flexWrap: "wrap",
  },
  exercisecard: {
    flexDirection: 'row',
    alignItems : 'center',
    width: "100%",
    height: 70,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    opacity: 0.3,
    zIndex: 0,
    transform: [{ rotate: "-50deg" }],
  },
  userExerciseDisplay: {
    alignItems: "center",
  },
  userWorkoutTrackInput: {

  },
  continueButton: {
    width: "50%",
    backgroundColor: colors.clr_black,
    borderRadius: 20,
    paddingVertical: 10,
    elevation: 24,
    marginVertical: 14
  },

  tableContainer: {
    borderColor: 'red',
    borderWidth: 2
  },
  tableHeader: {

    flexDirection: "row",
    backgroundColor: "#ddd",
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",


  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: sizes.size_base,
    borderColor: 'gray',
    borderWidth: 1,
    paddingVertical: 6

  },
  row: {

    flexDirection: "row",
    padding: 0,
    width: "100%",



  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: sizes.size_base,
    borderColor: 'gray',
    borderWidth: 1,
    paddingVertical: 6

  },
  nextButton: {
    width: "50%",
    backgroundColor: colors.clr_black,
    borderRadius: 20,
    paddingVertical: 10,
    elevation: 24,
    marginVertical: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: sizes.size_base,
    textAlign: 'center',
  },
  searchbar: {
    flexDirection: 'row',
    height: 40,
    borderColor: colors.clr_black,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'

  },
  searchbarInput: {
    flex: 1,
    fontSize: sizes.size_sm,
    paddingLeft: 10,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  clearIcon: {

    paddingRight: 10,

  },
});

export default NoteScreenStyle;
