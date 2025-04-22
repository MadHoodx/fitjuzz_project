import * as React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Touchable,
  TouchableOpacity,
  Modal,
} from "react-native";
import Header from "../components/Header";
import styles from "../styles/style";
import HomeScreenStyle from "../styles/components/HomeScreenStyle";
import axios from "axios";
import { colors } from "../styles/style";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";
import NoteScreenStyle from "../styles/components/NoteScreenStyle";

export default function HomeScreen({}) {
  const [exercisesHistory, setExercisesHistory] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const formattedDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };

  useEffect(() => {
    fetchUser();
  }, [selectedMonth, exercisesHistory]);

  const fetchUser = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const userGoogleToken = await AsyncStorage.getItem("userGoogleToken");
    const userXToken = await AsyncStorage.getItem("userXToken");

    if (userToken) {
      const decodedUserToken = jwtDecode(userToken);
      fetchExerciseHistory(decodedUserToken);
    } else if (userGoogleToken) {
      const decodedUserGoogleToken = jwtDecode(userGoogleToken);
      fetchExerciseHistory(decodedUserGoogleToken);
    } else if (userXToken) {
      const decodedUserXToken = jwtDecode(userXToken);
      fetchExerciseHistory(decodedUserXToken);
    }
  };

  const fetchExerciseHistory = async (allUserToken) => {
    const userId = allUserToken.userId;
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/${userId}/getExercisesHistory`
      );

      setExercisesHistory(response.data);

      return;
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedMonth, setSelectedMonth] = useState(new Date()); // Store the current selected month
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    filterExercisesByMonth();
  }, [selectedMonth, exercisesHistory]);

  // Format a given date into "Month Year" format (e.g., "April 2025")
  const formatMonth = (date) => {
    const options = { month: "long", year: "numeric" }; // Full month name + year
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // Filters exercises to only include those within the selected month
  const filterExercisesByMonth = () => {
    // Get the first day of the selected month
    const startOfMonth = new Date(
      selectedMonth.getFullYear(), // e.g., 2025
      selectedMonth.getMonth(), // e.g., 3 (April, since months are 0-indexed)
      1
    );

    // Get the last day of the selected month
    const endOfMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1, // Go to next month
      0 // Day 0 gives you the last day of previous month
    );

    // Filter all exercise entries to include only those within start and end of selected month
    const filtered = exercisesHistory.filter((item) => {
      const exerciseDate = new Date(item.date); // Convert date string to Date object
      return exerciseDate >= startOfMonth && exerciseDate <= endOfMonth;
    });

    // Save the filtered list to state
    setFilteredExercises(filtered);
  };

  // Function to change the selected month when left or right arrow is clicked
  const handleMonthChange = (direction) => {
    const newDate = new Date(selectedMonth); // Copy current selected date
    if (direction === "next") {
      newDate.setMonth(newDate.getMonth() + 1); // Move to next month
    } else if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1); // Move to previous month
    }
    setSelectedMonth(newDate); // Update the selected month
  };
  return (
    <View style={[HomeScreenStyle.container]}>
      <Header></Header>

      <View
        style={[
          {
            flex: 1,
            marginHorizontal: 0,
            paddingHorizontal: 10,
            alignItems: "center",
            backgroundColor: colors.clr_background,
          },
        ]}
      >
        <View style={HomeScreenStyle.monthSelectorContainer}>
          <TouchableOpacity onPress={() => handleMonthChange("prev")}>
            <AntDesign
              name="leftcircle"
              size={30}
              color={colors.clr_brightblue}
            />
          </TouchableOpacity>
          <Text style={HomeScreenStyle.monthText}>
            {formatMonth(selectedMonth)}
          </Text>
          <TouchableOpacity onPress={() => handleMonthChange("next")}>
            <AntDesign
              name="rightcircle"
              size={30}
              color={colors.clr_brightblue}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.date}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={HomeScreenStyle.exerciseCardContainer}>
              <View style={HomeScreenStyle.exerciseNumber}>
                <Text
                  style={{
                    color: colors.clr_white,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Text>
              </View>
              <TouchableOpacity
                style={HomeScreenStyle.exerciseBox}
                onPress={() => {
                  setModalVisible(true);
                  setSelectedExercises(item.exercises);
                  setSelectedDate(item.date);
                }}
              >
                <View style={HomeScreenStyle.exerciseCardContent}>
                  <Text style={HomeScreenStyle.exerciseDateText}>
                    Exercise date: {formattedDate(item.date)}
                  </Text>
                  <Text style={HomeScreenStyle.exerciseInfoText}>
                    {item.exercises.length} exercises
                  </Text>
                </View>
              </TouchableOpacity>
              <Modal visible={isModalVisible} transparent={true}>
                <View style={[NoteScreenStyle.box_modal, {}]}>
                  <View
                    style={[NoteScreenStyle.inside_box_modal, { width: "90%" }]}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 10,
                      }}
                    >
                      <Text style={[NoteScreenStyle.modal_header_text_]}>
                        Date: {formattedDate(selectedDate)}
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(false);
                        }}
                      >
                        <AntDesign
                          name={"closecircle"}
                          size={20}
                          color={colors.clr_gray}
                          style={{ paddingVertical: 10 }}
                        />
                      </TouchableOpacity>
                    </View>

                    <FlatList
                      data={selectedExercises}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item) => item.name}
                      renderItem={({ item }) => (
                        <View style={{ marginBottom: 20 }}>
                          <View style={HomeScreenStyle.exerciseCard}>
                            <View style={HomeScreenStyle.exerciseCardHeader}>
                              <Text
                                style={HomeScreenStyle.exerciseCardHeaderText}
                              >
                                {item.name}
                              </Text>
                            </View>

                            <View style={HomeScreenStyle.tableHeader}>
                              <Text style={HomeScreenStyle.headerCell}>
                                Set
                              </Text>
                              <Text style={HomeScreenStyle.headerCell}>
                                Weight
                              </Text>
                              <Text style={HomeScreenStyle.headerCell}>
                                Reps
                              </Text>
                              <Text style={HomeScreenStyle.headerCell}>
                                Timer
                              </Text>
                            </View>

                            <FlatList
                              nestedScrollEnabled={true}
                              showsVerticalScrollIndicator={false}
                              data={item.sets}
                              keyExtractor={(set, index) => index.toString()}
                              renderItem={({ item: set }) => (
                                <View style={HomeScreenStyle.row}>
                                  <Text style={HomeScreenStyle.cell}>
                                    {set.setNumber}
                                  </Text>
                                  <Text style={HomeScreenStyle.cell}>
                                    {set.weight}
                                  </Text>
                                  <Text style={HomeScreenStyle.cell}>
                                    {set.reps}
                                  </Text>
                                  <Text style={HomeScreenStyle.cell}>
                                    {set.timer}
                                  </Text>
                                </View>
                              )}
                            />
                          </View>
                        </View>
                      )}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          )}
        ></FlatList>
      </View>
    </View>
  );
}
