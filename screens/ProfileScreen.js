import * as React from "react";
import { View, Text, Button } from "react-native";
import styles from "../styles/style";
import Header from "../components/Header";
import ProfileScreenStyle from "../styles/components/ProfileScreenStyle";

export default function NoteScreen({ navigation }) {
  return (
    <View style={[ProfileScreenStyle.container]}>
      <Header></Header>
      <View style={[styles.container, { gap: 20 }]}>
        <View
          style={[
            ProfileScreenStyle.box,
            { height: 150, alignSelf: "stretch" },
          ]}
        >
        </View>
        <View
          style={[ProfileScreenStyle.box, { height: 150, width: 150 }]}
        ></View>
        <View
          style={[ProfileScreenStyle.box, { height: 150, width: 150 }]}
        ></View>
      </View>
    </View>
  );
}
