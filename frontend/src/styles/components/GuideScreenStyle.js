import { StyleSheet } from "react-native";
import { colors, sizes } from "../style";

const GuideScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.clr_background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
  },
  contentContainer: {
    paddingBottom: 10,
  },
  titleSection: {
    marginVertical: 5,
    alignItems: 'center',
  },
  mainTitle: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.clr_white,
    marginBottom: 25,
  },
  categoryCard: {
    height: 130,
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  categoryTitle: {
    color: colors.clr_white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GuideScreenStyle; 