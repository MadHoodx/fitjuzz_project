import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "../styles/style";
import { sizes } from "../styles/style";

const ExerciseCard = (props) => {
  return (
    <View style={[ExerciseCardstyles.box]}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          // source={require("../assets/images/Welcomimage.png")}
          source={{uri: props.picture}}
          style={{ width: 70, height: 50 }}
        />
      </View>
      <View>
        <Text style={[ExerciseCardstyles.text_name]}>{props.name}</Text>
        <Text style={[ExerciseCardstyles.text_des]}>{props.description}</Text>
      </View>
    </View>
  );
};

export default ExerciseCard;

const ExerciseCardstyles = StyleSheet.create({
  box: {
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
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
});
