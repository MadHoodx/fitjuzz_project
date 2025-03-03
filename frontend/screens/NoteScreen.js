import * as React from "react";
import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import styles, { colors } from "../styles/style";
import NoteScreenStyle from "../styles/components/NoteScreenStyle";
import Header from "../components/Header";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function NoteScreen({}) {
  const [currentDate, setCurrentDate] = useState("");
  const [exercises, setExercises] = useState([
    { id: 1, name: "Ex.1" },
    { id: 2, name: "Ex.2" },
    { id: 3, name: "Ex.3" },
  ]);

  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    setCurrentDate(`Today ${day}/${month}/${year}`);
  }, []);

  const handleAddBox = () => {
    setExercises([
      ...exercises,
      { id: exercises.length + 1, name: `Ex ${exercises.length + 1}` },
    ]);
  };

  const handleAddExercise = () => {
    console.log("Add exercise pressed");
  };


  return (
    <View style={[NoteScreenStyle.container]}>
      <Header />
      <View style={[styles.container]}>
        <Text style={[NoteScreenStyle.dateText]}>{currentDate}</Text>

        <TouchableOpacity style={[styles.button, { marginBottom: 35 }]}>
          <Text style={[styles.buttonText]}>Start</Text>
        </TouchableOpacity>
        <ScrollView>
        {exercises.map((exercise) => (
          <View
            key={exercise.id}
            style={[NoteScreenStyle.input__section, { marginBottom: 17 }]}
          >
            <Text style={[NoteScreenStyle.addButtonText]}>{exercise.name}</Text>
            <TouchableOpacity onPress={handleAddExercise}>
              <AntDesign
                name="pluscircle"
                size={24}
                color="#4CAF50"
                style={NoteScreenStyle.icon}
              />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity onPress={handleAddBox}>
          <Text style={[NoteScreenStyle.addExerciseBoxText]}>
            + add exercise box
          </Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

