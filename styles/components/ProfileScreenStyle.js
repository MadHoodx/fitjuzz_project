import { StyleSheet } from "react-native";
import { colors } from "../style";

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
    padding: 20
  },
 profile:{
  width: 100,
  height: 100,
  backgroundColor: 'red',
  borderRadius: 100
  
 }
});

export default ProfileScreenStyle;
