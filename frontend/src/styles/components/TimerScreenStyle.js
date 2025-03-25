import { StyleSheet } from "react-native";
import { colors, sizes } from "../style";

const TimerScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  all: {
    flex: 1,
  },
  time: {
    fontSize: sizes.size_6xl,
    fontWeight: "bold",
    marginBottom:20,
    textAlign: "center",
    // borderWidth: 2,
    // borderColor: "red",
    marginTop:60,
    color:colors.clr_white
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
    backgroundColor: colors.clr_graybutton,
    width:60,
    height:60,
    borderRadius: 100,
    justifyContent:'center',
  },
  line:{
    width: 300,
    height: 1,
    backgroundColor: colors.clr_white,
    marginTop: 3,
    alignSelf: 'center',
  },
  startButton: {
    backgroundColor:colors.clr_brightblue,
    width:60,
    height:60,
    borderRadius: 100,
    justifyContent:'center',
  },
  buttonText: {
    fontSize: sizes.size_2xs,
    fontWeight: "bold",
    color: "white",
    textAlign:'center'
  },
  lapsContainer: {
    width: "100%",
    maxHeight: 300,
  },
  lapText: {
    fontSize: sizes.size_base,
    paddingVertical:7,
    color: colors.clr_lightgray,
    paddingLeft: 20,
  },
});

export default TimerScreenStyle;
