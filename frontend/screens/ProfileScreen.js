import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styles, { sizes } from "../styles/style";
import { colors } from "../styles/style";
import Header from "../components/Header";
import ProfileScreenStyle from "../styles/components/ProfileScreenStyle";
import IconIonIcons from "react-native-vector-icons/Ionicons";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IconFontisto from "react-native-vector-icons/Fontisto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

import axios from "axios";

export default function ProfileScreen({}) {
  const [weight, setWeight] = useState(0);
  const [tempWeight, setTempWeight] = useState('');
  const [height, setHeight] = useState(0);
  const [tempHeight, setTempHeight] = useState(0);
  const [fat, setFat] = useState(0);
  const [tempFat, setTempFat] = useState(0);
  const [isModalVisibleWeight, setModalVisibleWeight] = useState(false);
  const [isModalVisibleHeight, setModalVisibleHeight] = useState(false);
  const [isModalVisibleFat, setModalVisibleFat] = useState(false);
  
  const navigation = useNavigation();

  // const { userId } = route.params;
  
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('token');
  //       console.log(token)
  //       if (token) {
          
  //         const response = await axios.get(`http://192.168.221.234:5000/api/user/${userId}`);
  //         setWeight(String(response.data.weight)); // Initialize weight input

  //       }
  //        // Replace with your server IP
        
  //       setWeight(String(response.data.weight)); // Initialize weight input

  //     } catch (error) {
  //       console.error('Error fetching user:', error);
        
  //     }
  //   };

  //   fetchUser();
  // }, [userId]);
  
  // const fetchProfileData = async () => {  // Define fetchUsername outside useEffect
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     console.log(token)
  //     if (token) {
  //       const decodedToken = jwtDecode(token);
  //       setUsername(decodedToken.user.username);
  //       setWeight(decodedToken.user.weight);
  //       setHeight(decodedToken.user.height);
  //       setFat(decodedToken.user.fat);

          

  //     }
  //   } catch (error) {
  //     console.error('Error fetching profile data:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProfileData();
  // },[]);

  const handleWeightUpdate = async () => {

    
    try {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user.id;

      console.log(decodedToken.user.id)


      await axios.post(`http://192.168.221.234:5000/api/user/${userId}/updateWeight`, {
        weight: parseFloat(weight) // Convert weight to number
      });


      
      // Alert.alert('Success', 'Weight updated successfully!');
      setWeight(weight)
      setModalVisibleWeight(false)
    } catch (error) {
     
     
      Alert.alert('Error', 'An error occurred while updating weight.');
    }
  };

  const handleHeightUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user.id;

      const response = await axios.put(`http://192.168.221.234:5000/api/users/${userId}/height`, {
        height: parseFloat(height) // Convert weight to number
      });

    
      
      // Alert.alert('Success', 'Height updated successfully!');
      setHeight(height)
      setModalVisibleHeight(false)

    } catch (error) {
      console.error('Error updating height:', error);
      Alert.alert('Error', 'An error occurred while updating height.');
    }
  };


  const handleFatUpdate = async () => {

    try{
      const token = await AsyncStorage.getItem('token')
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.user.id
      
      const response = await axios.put(`http://192.168.221.234:5000/api/users/${userId}/bodyfat`, {
        fat: parseFloat(fat) // Convert weight to number
      })

      setFat(fat)
      setModalVisibleFat(false)
    }
    catch (error) {
      console.error('Error updating bodyfat:', error);
      Alert.alert('Error', 'An error occurred while updating bodyfat.');
    }
  }






  const haddleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("Successfully log out");
      navigation.navigate("Main");
    } catch (error) {
      console.log("Log out failed");
    }
  };

  const handleEditWeight = () => {
    setModalVisibleWeight(true);
    // setTempWeight(weight);
  };

  // const handleSaveWeight = (newWeight) => {
  //   setWeight(newWeight);
  //   setModalVisibleWeight(false);
  // };
  const handleEditHeight = () => {
    setModalVisibleHeight(true);
    // setTempWeight(height);
  };

  // const handleSaveHeight = (newHeight) => {
  //   setHeight(newHeight);
  //   setModalVisibleHeight(false);
  // };
  const handleEditFat = () => {
    setModalVisibleFat(true);
    // setTempFat(fat);
  };

  // const handleSaveFat = (newFat) => {
  //   setFat(newFat);
  //   setModalVisibleFat(false);
  // };
  return (
    <View style={[ProfileScreenStyle.container]}>
      <Header />
      <ScrollView style={[styles.container]}>
        <View style={{ gap: 20 }}>
          <View
            style={[
              ProfileScreenStyle.profile_box,
              {
                height: 150,
                alignSelf: "stretch",
                flexDirection: "row",
                gap: 25,
              },
            ]}
          >
            <View style={[ProfileScreenStyle.profile]}></View>
            <View
              style={{
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <View>
                <Text style={{ fontWeight: "bold", fontSize: sizes.size_xl }}>
                  username
                </Text>
              </View>
              <View style={[ProfileScreenStyle.footer_profile_box]}>
                <View>
                  <Text style={[ProfileScreenStyle.footer_profile_box_text]}>
                    Day Streak
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <IconFontisto name={"fire"} color={colors.clr_orange} />
                    <Text
                      style={{ fontSize: sizes.size_2xs, fontWeight: "bold" }}
                    >
                      0
                    </Text>
                  </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={[ProfileScreenStyle.footer_profile_box_text]}>
                    Highest Streak
                  </Text>
                  <Text
                    style={{ fontSize: sizes.size_2xs, fontWeight: "bold" }}
                  >
                    100 days
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            <View
              style={[ProfileScreenStyle.box, { height: 130, width: "48%" }]}
            >
              <View style={[ProfileScreenStyle.inside_box]}>
                <View style={[ProfileScreenStyle.header_box]}>
                  <Text style={[ProfileScreenStyle.header_text]}>Weight</Text>
                  <TouchableOpacity
                    style={[ProfileScreenStyle.button_edit]}
                    onPress={handleEditWeight}
                  >
                    <Text style={[ProfileScreenStyle.button_text]}>Edit</Text>
                    <IconEntypo
                      name={"edit"}
                      size={10}
                      color={colors.clr_gray}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[ProfileScreenStyle.body_box]}>
                  <IconIonIcons
                    name={"scale"}
                    size={50}
                    color={colors.clr_orange}
                  />
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                    <Text style={[ProfileScreenStyle.body_text_number]}>
                      {weight}
                    </Text>
                    <Text style={[ProfileScreenStyle.body_text_unit]}>KG</Text>
                  </View>
                </View>
              </View>
            </View>
            <Modal
              visible={isModalVisibleWeight}
              animationType="slide"
              transparent={true}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 20,
                    width: "80%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    Edit Weight.
                  </Text>
                  <TextInput
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                    keyboardType="numeric"
                    value={tempWeight}
                    onChangeText={(text) => setTempWeight(text)}
                  />
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "gray",
                      marginBottom: 20,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setModalVisibleWeight(false)}
                      style={{
                        backgroundColor: "lightgray",
                        padding: 10,
                        borderRadius: 5,
                      }}
                    >
                      <Text>close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleWeightUpdate}
                      style={{
                        backgroundColor: "green",
                        padding: 10,
                        borderRadius: 5,
                      }}
                    >
                      <Text style={{ color: "white" }}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View
              style={[ProfileScreenStyle.box, { height: 130, width: "48%" }]}
            >
              <View style={[ProfileScreenStyle.inside_box]}>
                <View style={[ProfileScreenStyle.header_box]}>
                  <Text style={[ProfileScreenStyle.header_text]}>Height</Text>
                  <TouchableOpacity
                    style={[ProfileScreenStyle.button_edit]}
                    onPress={handleEditHeight}
                  >
                    <Text style={[ProfileScreenStyle.button_text]}>Edit</Text>
                    <IconEntypo
                      name={"edit"}
                      size={10}
                      color={colors.clr_gray}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[ProfileScreenStyle.body_box]}>
                  <IconMaterialCommunityIcons
                    name={"human-male-height-variant"}
                    size={50}
                    color={colors.clr_slate}
                  />
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                    <Text style={[ProfileScreenStyle.body_text_number]}>
                      {height}
                    </Text>
                    <Text style={[ProfileScreenStyle.body_text_unit]}>CM</Text>
                  </View>
                </View>
              </View>
            </View>
            <Modal
              visible={isModalVisibleHeight}
              animationType="slide"
              transparent={true}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 20,
                    width: "80%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    Edit Height.
                  </Text>
                  <TextInput
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                    keyboardType="numeric"
                    // value={tempHeight}
                    onChangeText={(text) => setHeight(text)}
                  />
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "gray",
                      marginBottom: 20,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setModalVisibleHeight(false)}
                      style={{
                        backgroundColor: "lightgray",
                        padding: 10,
                        borderRadius: 5,
                      }}
                    >
                      <Text>close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleHeightUpdate}
                      style={{
                        backgroundColor: "green",
                        padding: 10,
                        borderRadius: 5,
                      }}
                    >
                      <Text style={{ color: "white" }}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View
              style={[ProfileScreenStyle.box, { height: 130, width: "48%" }]}
            >
              <View style={[ProfileScreenStyle.inside_box]}>
                <View style={[ProfileScreenStyle.header_box]}>
                  <Text style={[ProfileScreenStyle.header_text]}>
                    Body fat %
                  </Text>
                  <TouchableOpacity
                    style={[ProfileScreenStyle.button_edit]}
                    onPress={handleEditFat}
                  >
                    <Text style={[ProfileScreenStyle.button_text]}>Edit</Text>
                    <IconEntypo
                      name={"edit"}
                      size={10}
                      color={colors.clr_gray}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[ProfileScreenStyle.body_box]}>
                  <IconMaterialCommunityIcons
                    name={"human-child"}
                    size={50}
                    color={"darkyellow"}
                  />
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                    <Text style={[ProfileScreenStyle.body_text_number]}>
                      {fat}
                    </Text>
                    <Text style={[ProfileScreenStyle.body_text_unit]}>%</Text>
                  </View>
                </View>
              </View>
            </View>
            <Modal
              visible={isModalVisibleFat}
              animationType="slide"
              transparent={true}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 20,
                    width: "80%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    Edit Body Fat %.
                  </Text>
                  <TextInput
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                    keyboardType="numeric"
                    // value={tempFat}
                    onChangeText={(text) => setFat(text)}
                  />
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "gray",
                      marginBottom: 20,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setModalVisibleFat(false)}
                      style={{
                        backgroundColor: "lightgray",
                        padding: 10,
                        borderRadius: 5,
                      }}
                    >
                      <Text>close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleFatUpdate}
                      style={{
                        backgroundColor: "green",
                        padding: 10,
                        borderRadius: 5,
                      }}
                    >
                      <Text style={{ color: "white" }}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View
              style={[ProfileScreenStyle.box, { height: 130, width: "48%" }]}
            >
              <View style={[ProfileScreenStyle.inside_box]}>
                <View style={[ProfileScreenStyle.header_box_bmi]}>
                  <View style>
                    <Text
                      style={{
                        color: colors.clr_slate,
                        fontSize: sizes.size_2xl,
                        fontWeight: "bold",
                      }}
                    >
                      BMI
                    </Text>
                    <Text
                      style={{
                        color: colors.clr_slate,
                        fontSize: sizes.size_2xl,
                        fontWeight: "bold",
                      }}
                    >
                      32
                    </Text>
                  </View>

                  <IconMaterialCommunityIcons
                    name={"emoticon-angry"}
                    size={30}
                    color={"red"}
                  />
                </View>
                <View style={[ProfileScreenStyle.body_box_bmi]}>
                  <View style={[ProfileScreenStyle.bmi_bar]}></View>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.button, styles.buttonText]}
            onPress={haddleLogout}
          >
            <Text style={[styles.buttonText]}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
