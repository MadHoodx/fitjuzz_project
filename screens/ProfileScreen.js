import * as React from "react";
import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import styles from "../styles/style";
import Header from "../components/Header";
import ProfileScreenStyle from "../styles/components/ProfileScreenStyle";

export default function NoteScreen({ navigation }) {
  return (
    <View style={[ProfileScreenStyle.container]}>
      <Header />
      <ScrollView>
        <View style={[styles.container, { gap: 20 }]}>
          <View
            style={[
              ProfileScreenStyle.box,
              {
                height: 150,
                alignSelf: "stretch",
                flexDirection: "row",
                gap: 25,
              },
            ]}
          >
            <View style={[ProfileScreenStyle.profile]}></View>
            <View>
              <Text>Username</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            <View
              style={[ProfileScreenStyle.box, { height: 150, width: "48%" }]}
            ></View>
            <View
              style={[ProfileScreenStyle.box, { height: 150, width: "48%" }]}
            ></View>
            <View
              style={[ProfileScreenStyle.box, { height: 150, width: "48%" }]}
            ></View>
            <View
              style={[ProfileScreenStyle.box, { height: 150, width: "48%" }]}
            ></View>
          </View>
          <TouchableOpacity style={[styles.button, styles.buttonText]}>
            <Text style={[styles.buttonText]}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
