import { StyleSheet } from "react-native";
import { colors } from "../style";

const TimerScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
 
  time: {
    fontSize: 60,
    fontWeight: "bold",
    marginBottom:20,
    textAlign: "center",
    // borderWidth: 2,
    // borderColor: "red",
    marginTop:60
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
    // borderWidth: 2,
    // borderColor: "red",
    gap:100
  },
  lapButton: {
    backgroundColor: "lightgray",
    width:60,
    height:60,
    borderRadius: 100,
    justifyContent:'center',
    
  },
  line:{
    width:300,
    height:3,
    backgroundColor:colors.clr_slate,
    
  },
  startButton: {
    backgroundColor: "orange",
    width:60,
    height:60,
    borderRadius: 100,
    justifyContent:'center',
    
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign:'center'
  },
  lapsContainer: {
    width: "80%",
    
    alignItems:'center'
  },
  lapText: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default TimerScreenStyle;
