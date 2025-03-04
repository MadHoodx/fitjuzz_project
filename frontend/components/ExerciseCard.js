import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../styles/style";
import { sizes } from "../styles/style";
import AntDesign from "react-native-vector-icons/AntDesign";

const ExerciseCard = (props) => {
  return (
    <View style={[ExerciseCardstyles.box]}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/images/profileplaceholder.jpeg")}
          style={{ width: 70, height: 50 }}
        />
      </View>
      <View>
        <Text style={[ExerciseCardstyles.text_name]}>{props.name}</Text>
        <Text style={[ExerciseCardstyles.text_des]}>{props.des}</Text>
      </View>

      <TouchableOpacity style={[ExerciseCardstyles.button]}>
        <AntDesign name={"plussquare"} size={20} color={"green"}></AntDesign>
      </TouchableOpacity>
    </View>
  );
};

export default ExerciseCard;

const ExerciseCardstyles = StyleSheet.create({
  box: {
    width: 125,
    height: 180,
    backgroundColor: colors.clr_white,
    borderRadius: 20,
    paddingHorizontal: 15,

    gap: 10,
    paddingVertical: 20,
  },
  text_name: {
    fontSize: sizes.size_sm,
    fontWeight: "bold",
    color: colors.clr_slate,
  },
  text_des: {
    fontSize: sizes.size_3xs,
    color: "gray",
    flexWrap: "wrap",
  },
  button: {
    position: "absolute",
    top: 145,
    left: 90,
  },
});
