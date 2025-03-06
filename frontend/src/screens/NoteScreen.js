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
    { id: 1, name: "Exercise", exercises: [] },
    { id: 2, name: "Exercise", exercises: [] },
    { id: 3, name: "Exercise", exercises: [] },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentExerciseId, setCurrentExerciseId] = useState(null);

  const allExercises = [
    {
      name: "Bench Press",
      des: "Bench Press is a compound exercise that targets the chest, shoulders, and triceps. It involves lying on a bench with a barbell, and pressing the barbell straight up to the chest.",
      pathImage: myImage,
      category: "Chest"
    },
    {
      name: "Push Up",
      des: "A bodyweight exercise that works your chest, shoulders, triceps, and core. Start in a plank position and lower your body until your chest nearly touches the ground, then push back up.",
      pathImage: myImage,
      category: "Chest"
    },
    {
      name: "Squat",
      des: "A fundamental lower body exercise that targets quadriceps, hamstrings, glutes, and core. Stand with feet shoulder-width apart, lower your body by bending your knees, then return to standing.",
      pathImage: myImage,
      category: "Leg"
    },
    {
      name: "Deadlift",
      des: "A compound exercise that works multiple muscle groups including back, legs, and core. With a barbell in front of you, hinge at your hips to lift the weight while keeping your back straight.",
      pathImage: myImage,
      category: "Back"
    },
    {
      name: "Pull Up",
      des: "An upper body exercise that targets your back, biceps, and shoulders. Hang from a bar with palms facing away, then pull yourself up until your chin is over the bar.",
      pathImage: myImage,
      category: "Back"
    },
    {
      name: "Shoulder Press",
      des: "Also known as overhead press, this exercise targets your shoulders and triceps. Press a barbell or dumbbells from shoulder level to overhead.",
      pathImage: myImage,
      category: "Arms"
    },
    {
      name: "Bicep Curl",
      des: "An isolation exercise for the biceps. Hold dumbbells with palms facing up, keep your upper arms still, and curl the weights toward your shoulders.",
      pathImage: myImage,
      category: "Arms"
    },
    {
      name: "Plank",
      des: "A core strengthening exercise. Hold a push-up position with your body forming a straight line from head to heels, engaging your core muscles.",
      pathImage: myImage,
      category: "ABS"
    },
    {
      name: "Leg Press",
      des: "A machine exercise that targets your legs. Sit in the leg press machine, place your feet on the platform, and push the weight away by extending your legs.",
      pathImage: myImage,
      category: "Leg"
    },
    {
      name: "Lat Pulldown",
      des: "A back exercise performed on a cable machine. Grip the bar with hands wider than shoulder-width, then pull it down to your upper chest while keeping your back straight.",
      pathImage: myImage,
      category: "Back"
    }
  ];

  const getAvailableExercises = () => {
    const selectedExercises = exercises.map(ex => ex.name);
    const filteredExercises = allExercises.filter(ex => 
      (!selectedExercises.includes(ex.name) || ex.name === "Exercise") &&
      (selectedCategory === "All" || ex.category === selectedCategory)
    );
    return filteredExercises;
  };

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
      { id: Date.now(), name: "Exercise", exercises: [] },
    ]);
  };

  const handleRemoveBox = () => {
    setExercises([]);
  };

  const handleAddExercise = (exerciseId) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (exercise.name === "Exercise") {
      setCurrentExerciseId(exerciseId);
      setModalVisible(true);
    } else {
      setExercises(exercises.map(ex => 
        ex.id === exerciseId 
          ? { ...ex, name: "Exercise" }
          : ex
      ));
    }
  };

  const handleSelectExercise = (exerciseName) => {
    setExercises(exercises.map(exercise => 
      exercise.id === currentExerciseId 
        ? { ...exercise, name: exerciseName }
        : exercise
    ));
    setModalVisible(false);
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const handleRemoveExercise = (id) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  return (
    <View style={[NoteScreenStyle.container]}>
      <Header />
      <View style={[styles.container]}>
        <View style={{}}>
          <Text style={[NoteScreenStyle.dateText]}>{currentDate}</Text>
          <TouchableOpacity style={[styles.button, { marginBottom: 35 }]}>
            <Text style={[styles.buttonText]}>Start</Text>
          </TouchableOpacity>
        </View>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10 }}
        >
          {exercises.map((exercise) => (
            <View key={exercise.id} style={{ marginBottom: 10, position: 'relative', width: '100%' }}>
              <View style={[
                NoteScreenStyle.input__section,
                exercise.name !== "Exercise" && {
                  backgroundColor: '#E8F5E9',  
                  borderWidth: 1,
                  borderColor: '#4CAF50'  
                }
              ]}>
                <View style={{ flex: 1 }}>
                  <Text style={[
                    NoteScreenStyle.addButtonText,
                    exercise.name !== "Exercise" && {
                      color: '#2E7D32'  
                    }
                  ]}>
                    {exercise.name}
                  </Text>
                </View>
                <View style={{ position: 'absolute', right: 15, height: '100%', justifyContent: 'center' }}>
                  <TouchableOpacity onPress={() => handleAddExercise(exercise.id)}>
                    <AntDesign
                      name={exercise.name === "Exercise" ? "pluscircle" : "closecircle"}
                      size={24}
                      color={exercise.name === "Exercise" ? "#4CAF50" : "#E77339"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {exercise.name === "Exercise" && (
                <View style={{ position: 'absolute', top: -10, right: -4, zIndex: 1 }}>
                  <TouchableOpacity onPress={() => handleRemoveExercise(exercise.id)}>
                    <View style={{ 
                      borderRadius: 12,
                      width: 24,
                      height: 24,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <AntDesign
                        name="minuscircle"
                        size={15}
                        color="#E77339"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
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
                    marginBottom: 15
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
                    />
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
                      ]}rr
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
                <ScrollView 
                  style={{ marginTop: 20, flex: 1 }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  <View style={{ 
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                    paddingBottom: 20
                  }}>
                    {getAvailableExercises().map((exercise, index) => (
                      <TouchableOpacity 
                        key={index} 
                        onPress={() => handleSelectExercise(exercise.name)}
                        style={[NoteScreenStyle.exercisecard]}
                      >
                        <ExerciseCard
                          name={exercise.name}
                          des={exercise.des}
                          pathImage={exercise.pathImage}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
          <TouchableOpacity onPress={handleAddBox}>
            <Text style={[NoteScreenStyle.addExerciseBoxText]}>
              + add exercise box
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemoveBox}>
            <Text style={[NoteScreenStyle.removeExerciseBoxText, { marginBottom: 25 }]}>
              - remove all exercise box
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}