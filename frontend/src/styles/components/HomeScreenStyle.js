import { StyleSheet } from "react-native";
import { colors, sizes } from "../style";

const HomeScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  monthSelectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  monthText: {
    fontSize: sizes.size_xl,
    fontWeight: "bold",
    color: colors.clr_brightblue,
    marginHorizontal: 10,
  },
  exerciseCardContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  exerciseBox: {
    backgroundColor: colors.clr_white,
    minWidth: "90%",
    height: 80,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 15,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  exerciseCardContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  exerciseDateText: {
    fontSize: sizes.size_base,
    fontWeight: "bold",
    color: colors.clr_brightblue,
  },
  exerciseInfoText: {
    fontSize: sizes.size_sm,
    color: colors.clr_black,
  },
  exerciseNumber: {
    backgroundColor: colors.clr_brightblue,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 80,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.clr_brightblue,
    borderRadius: 12,
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    fontSize: sizes.size_sm,
    color: colors.clr_white,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.clr_lightgray,
    borderRadius: 12,
    marginBottom: 6,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: sizes.size_sm,
    paddingVertical: 8,
    color: colors.clr_black,
  },
  exerciseCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 4,
  },
  exerciseCardHeader: {
    backgroundColor: colors.clr_brightblue,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 14,
    borderRadius: 8,
  },
  exerciseCardHeaderText: {
    fontSize: sizes.size_xl,
    fontWeight: "bold",
    color: colors.clr_white,
    textAlign: "center",
  },
});

export default HomeScreenStyle;
