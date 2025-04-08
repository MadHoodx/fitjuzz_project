import { StyleSheet } from "react-native";
import { colors, sizes } from "../style";

const GuideScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.clr_background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20
  },
  contentContainer: {
    paddingBottom: 10,
  },
  titleSection: {
    marginVertical: 5,
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
  },
  mainTitle: {
    marginTop: 25,
    fontSize: sizes.size_xl,
    fontWeight: "bold",
    color: colors.clr_white,
    marginBottom: 25,
  },
  categoryCard: {
    height: 130,
    borderRadius: 8,
    marginBottom: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  categoryImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.7,
  },
  categoryOverlay: {
    position: "absolute",
    width:'100%',
    height:'100%',
    justifyContent:'center',
    paddingLeft:15
  },
  categoryTitle: {
    color: colors.clr_white,
    fontSize: sizes.size_lg,
    fontWeight: "bold",
  },
  categoryDescription: {
    color: colors.clr_white,
    fontSize: sizes.size_sm,
    marginTop: 5,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 25,
    padding: 8,
  }
});

export default GuideScreenStyle;
