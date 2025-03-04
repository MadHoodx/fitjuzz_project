import * as React from "react";
import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, ScrollView, Modal } from "react-native";
import styles, { colors } from "../styles/style";
import NoteScreenStyle from "../styles/components/NoteScreenStyle";
import Header from "../components/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
import ExerciseCard from "../components/ExerciseCard";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import myImage from "../assets/images/Welcomimage.png"

export default function NoteScreen({}) {
  const [currentDate, setCurrentDate] = useState("");
  const [exercises, setExercises] = useState([
    { id: 1, name: "Ex.1" },
    { id: 2, name: "Ex.2" },
    { id: 3, name: "Ex.3" },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All"); // กำหนดค่าเริ่มต้นเป็น 'All'

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

  const handleRemoveBox = () => {
    setExercises([
      ...exercises,
      { id: exercises.length -1 , name: `Ex ${exercises.length -1}` },
    ]);
  };

  const handleAddExercise = () => {
    console.log("Add exercise pressed");
    setModalVisible(true);
  };
  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
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
              <Text style={[NoteScreenStyle.addButtonText]}>
                {exercise.name}
              </Text>
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
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
          >
            
            <View style={[NoteScreenStyle.box_modal]}>
              
              <View style={[NoteScreenStyle.inside_box_modal]}>
              <IconFontAwesome5
                      name={"dumbbell"}
                      size={50}
                      color={colors.clr_slate}
                      style={[NoteScreenStyle.dumbbell_top]}
                    />
                    <IconFontAwesome5
                      name={"dumbbell"}
                      size={30}
                      color={colors.clr_slate}
                      style={[NoteScreenStyle.dumbbell_middle]}
                    />
                    <IconFontAwesome5
                      name={"dumbbell"}
                      size={55}
                      color={colors.clr_slate}
                      style={[NoteScreenStyle.dumbbell_bottom]}
                    />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={[NoteScreenStyle.modal_header_text_]}>
                    Your{"\n"}Exercise
                  </Text>

                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <AntDesign
                      name={"closecircle"}
                      size={20}
                      color={colors.clr_gray}
                      style={{ paddingVertical: 10 }}
                    ></AntDesign>
                  </TouchableOpacity>
                </View>
                <View style={[NoteScreenStyle.modal_category_box]}>
                  <TouchableOpacity
                    style={[
                      NoteScreenStyle.modal_category_inside,
                      { width: 50 },
                      {
                        backgroundColor:
                          selectedCategory === "All"
                            ? colors.clr_slate
                            : colors.clr_gray,
                      },
                    ]}
                    onPress={() => handleCategoryPress("All")}
                  >
                    <Text
                      style={[
                        NoteScreenStyle.modal_category_inside_text,
                        {
                          color:
                            selectedCategory === "All"
                              ? colors.clr_white
                              : colors.clr_black,
                        },
                      ]}
                    >
                      All
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      NoteScreenStyle.modal_category_inside,
                      { width: 50 },
                      {
                        backgroundColor:
                          selectedCategory === "Leg"
                            ? colors.clr_slate
                            : colors.clr_gray,
                      },
                    ]}
                    onPress={() => handleCategoryPress("Leg")}
                  >
                    <Text
                      style={[
                        NoteScreenStyle.modal_category_inside_text,
                        {
                          color:
                            selectedCategory === "Leg"
                              ? colors.clr_white
                              : colors.clr_black,
                        },
                      ]}
                    >
                      Leg
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      NoteScreenStyle.modal_category_inside,
                      { width: 50 },
                      {
                        backgroundColor:
                          selectedCategory === "ABS"
                            ? colors.clr_slate
                            : colors.clr_gray,
                      },
                    ]}
                    onPress={() => handleCategoryPress("ABS")}
                  >
                    <Text
                      style={[
                        NoteScreenStyle.modal_category_inside_text,
                        {
                          color:
                            selectedCategory === "ABS"
                              ? colors.clr_white
                              : colors.clr_black,
                        },
                      ]}
                    >
                      ABS
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      NoteScreenStyle.modal_category_inside,
                      { width: 65 },
                      {
                        backgroundColor:
                          selectedCategory === "Back"
                            ? colors.clr_slate
                            : colors.clr_gray,
                      },
                    ]}
                    onPress={() => handleCategoryPress("Back")}
                  >
                    <Text
                      style={[
                        NoteScreenStyle.modal_category_inside_text,
                        {
                          color:
                            selectedCategory === "Back"
                              ? colors.clr_white
                              : colors.clr_black,
                        },
                      ]}
                    >
                      Back
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      NoteScreenStyle.modal_category_inside,
                      { width: 65 },
                      {
                        backgroundColor:
                          selectedCategory === "Chest"
                            ? colors.clr_slate
                            : colors.clr_gray,
                      },
                    ]}
                    onPress={() => handleCategoryPress("Chest")}
                  >
                    <Text
                      style={[
                        NoteScreenStyle.modal_category_inside_text,
                        {
                          color:
                            selectedCategory === "Chest"
                              ? colors.clr_white
                              : colors.clr_black,
                        },
                      ]}
                    >
                      Chest
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      NoteScreenStyle.modal_category_inside,
                      { width: 65 },
                      {
                        backgroundColor:
                          selectedCategory === "Arms"
                            ? colors.clr_slate
                            : colors.clr_gray,
                      },
                    ]}
                    onPress={() => handleCategoryPress("Arms")}
                  >
                    <Text
                      style={[
                        NoteScreenStyle.modal_category_inside_text,
                        {
                          color:
                            selectedCategory === "Arms"
                              ? colors.clr_white
                              : colors.clr_black,
                        },
                      ]}
                    >
                      Arms
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[NoteScreenStyle.modal_body]}>
                  <ExerciseCard
                    name="Bench Press"
                    des="dkgjnifjuhbuhybhubuhbhbuhbhubhbuhbuhbuhbuhbdหกหดกหดกดกดกไดghefuihgefiff"
                    pathImage={myImage}
                  ></ExerciseCard>
                  <ExerciseCard></ExerciseCard>
                  <ExerciseCard></ExerciseCard>
                  <ExerciseCard></ExerciseCard>
                </View>
              </View>
            </View>
          </Modal>
          <TouchableOpacity onPress={handleAddBox}>
            <Text style={[NoteScreenStyle.addExerciseBoxText]}>
              + add exercise box
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemoveBox}>
            <Text style={[NoteScreenStyle.removeExerciseBoxText]}>
              - remove exercise box
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
