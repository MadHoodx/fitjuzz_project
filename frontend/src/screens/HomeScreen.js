// screens/HomeScreen.js
import * as React from 'react';
import { View, Text, Button, FlatList, Touchable, TouchableOpacity, Modal } from 'react-native';
import Header from '../components/Header';
import styles from '../styles/style';
import HomeScreenStyle from '../styles/components/HomeScreenStyle';
import axios from 'axios';
import { colors } from '../styles/style';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from "react-native-vector-icons/AntDesign";
import NoteScreenStyle from '../styles/components/NoteScreenStyle';
const exercise = [
  {
    id: 1, date: '20/4', name: 'chest', sets: [
      { setNumber: 1, weight: 20 }
    ]
  },
  {
    id: 2, date: '23/4', name: 'chest', sets: [
      { setNumber: 1, weight: 20 }
    ]
  }
]


export default function HomeScreen({ }) {


  const [exercisesHistory, setExercisesHistory] = useState([])
  const [exercises, setExercises] = useState()
  const [exercisesDate, setExercisesDate] = useState()
  const [isModalVisible, setModalVisible] = useState(false)


  useEffect(() => {
    fetchUser();
  }, []);



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
    const userId = allUserToken.userId
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/${userId}/getExercisesHistory`)
      console.log(response.data)
      setExercisesHistory(response.data)
      setExercises(response.data.exercises)
      setExercisesDate(response.data.date)
      return
    }
    catch (error) {
      console.log(error)
    }
  }



  return (

    <View style={[HomeScreenStyle.container]}>
      <Header></Header>
      <View style={[styles.container, { alignItems: 'center' }]}>
        <Text>
          {exercisesHistory?.date}
        </Text>
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) =>
            <View>
              <TouchableOpacity style={HomeScreenStyle.box}
                onPress={() => setModalVisible(true)}>
                <Text>{item.name}</Text>


              </TouchableOpacity>
              <Modal
                visible={isModalVisible}

                transparent={true}

              >
                <View style={[NoteScreenStyle.box_modal]}>
                  <View style={[NoteScreenStyle.inside_box_modal]}>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 10,
                      }}
                    >
                      <Text style={[NoteScreenStyle.modal_header_text_]}>
                        Exercise History
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
                      data={exercises}
                      keyExtractor={(item) => item.name}
                      renderItem={({ item }) =>
                        <View style={{alignItems: 'center'}}>
                           <View style={[HomeScreenStyle.box, {width: 250, height: 400,}]}>
                          <Text>{item.name}</Text>
                          <Text>set number: {item.sets[0]?.sets}</Text>
                          <Text>weight: {item.sets[0]?.weight}</Text>
                          <Text>reps: {item.sets[0]?.reps}</Text>
                          <Text>timer: {item.sets[0]?.timer}</Text>
                          <Text>set number: {item.sets[0]?.sets}</Text>
                          <Text>weight: {item.sets[1]?.weight}</Text>
                          <Text>reps: {item.sets[1]?.reps}</Text>
                          <Text>timer: {item.sets[1]?.timer}</Text>
                        </View>
                        </View>
                       

                      }>

                    </FlatList>





                  </View>
                </View>
              </Modal>
            </View>

          }>

        </FlatList>


      </View>
    </View >

  );
}
