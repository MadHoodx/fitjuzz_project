import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "../styles/style";
import { sizes } from "../styles/style";

const ExerciseCard = (props) => {
  return (
    <View style={[ExerciseCardstyles.box, {marginLeft:10 ,width: 180, height:80,}]}>
      <View >
        <Image
          source={{uri: props.picture}}
          style={{ width: 70, height: 50 }}
        />
      </View>
      <View >
        <Text style={[ExerciseCardstyles.text_name]}>{props.name}</Text>
        {/* <Text style={[ExerciseCardstyles.text_category]}>{props.category}</Text> */}
      </View>
    </View>
  );
};

export default ExerciseCard;

const ExerciseCardstyles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,

    alignItems: "center",
    gap: 8
  },
  text_name: {
    fontSize: sizes.size_sm,
    fontWeight: "bold",
    color: colors.clr_slate,
  },
  text_category: {
    fontSize: sizes.size_xs,
    color: "gray",
    flexWrap: "wrap",
  },
});
