import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  Image,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styles, { sizes, colors } from "../styles/style";
import Header from "../components/Header";
import ProfileScreenStyle from "../styles/components/ProfileScreenStyle";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import moment from "moment";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

export default function ProfileScreen({}) {
  const [username, setUsername] = useState("");
  const [weight, setWeight] = useState(0);
  const [tempWeight, setTempWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [tempHeight, setTempHeight] = useState(0);
  const [fat, setFat] = useState(0);
  const [tempFat, setTempFat] = useState(0);
  const [updatedAt, setUpdatedAt] = useState("");
  const [isModalVisibleWeight, setModalVisibleWeight] = useState(false);
  const [isModalVisibleHeight, setModalVisibleHeight] = useState(false);
  const [isModalVisibleFat, setModalVisibleFat] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const userGoogleToken = await AsyncStorage.getItem("userGoogleToken");
    const userXToken = await AsyncStorage.getItem("userXToken");

    if (userToken) {
      const decodedUserToken = jwtDecode(userToken);
      fetchUserProfile(decodedUserToken);
    } else if (userGoogleToken) {
      const decodedUserGoogleToken = jwtDecode(userGoogleToken);
      fetchUserProfile(decodedUserGoogleToken);
    } else if (userXToken) {
      const decodedUserXToken = jwtDecode(userXToken);
      fetchUserProfile(decodedUserXToken);
    }
  };

  const fetchUserProfile = async (allUserToken) => {
    const userId = allUserToken.userId;
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/${userId}/profile`
      );
      const { username, weight, height, fat, picture, updatedAt } =
        response.data;
      setUsername(username || response.data.givenName || response.data.name);
      setWeight(weight);
      setHeight(height);
      setFat(fat);
      setSelectedImage(picture);
      setUpdatedAt(updatedAt);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const updateWeightForUser = async (allUserToken) => {
    const decodedAllUserToken = jwtDecode(allUserToken);
    const userId = decodedAllUserToken.userId;
    try {
      await axios.put(
        `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/${userId}/updateWeight`,
        {
          weight: parseFloat(tempWeight),
        }
      );
      setWeight(tempWeight);
      setModalVisibleWeight(false);
    } catch (error) {
      console.error("Error updating weight:", error);
      Alert.alert("Error", "An error occurred while updating weight.", error);
    }
  };

  const updateHeightForUser = async (allUserToken) => {
    const decodedAllUserToken = jwtDecode(allUserToken);
    const userId = decodedAllUserToken.userId;

    try {
      await axios.put(
        `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/${userId}/updateHeight`,
        {
          height: parseFloat(tempHeight),
        }
      );
      setHeight(tempHeight);
      setModalVisibleHeight(false);
    } catch (error) {
      console.error("Error updating height:", error);
      Alert.alert("Error", "An error occurred while updating height.", error);
    }
  };

  const updateFatForUser = async (allUserToken) => {
    const decodedAllUserToken = jwtDecode(allUserToken);
    const userId = decodedAllUserToken.userId;

    try {
      await axios.put(
        `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/${userId}/updateFat`,
        {
          fat: parseFloat(tempFat),
        }
      );
      setFat(tempFat);
      setModalVisibleFat(false);
    } catch (error) {
      console.error("Error updating fat:", error);
      Alert.alert("Error", "An error occurred while updating fat.", error);
    }
  };

  const handleWeightUpdate = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const userGoogleToken = await AsyncStorage.getItem("userGoogleToken");
    const userXToken = await AsyncStorage.getItem("userXToken");

    if (userToken) {
      await updateWeightForUser(userToken);
    } else if (userGoogleToken) {
      await updateWeightForUser(userGoogleToken);
    } else if (userXToken) {
      await updateWeightForUser(userXToken);
    }
  };

  const handleHeightUpdate = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const userGoogleToken = await AsyncStorage.getItem("userGoogleToken");
    const userXToken = await AsyncStorage.getItem("userXToken");

    if (userToken) {
      await updateHeightForUser(userToken);
    } else if (userGoogleToken) {
      await updateHeightForUser(userGoogleToken);
    } else if (userXToken) {
      await updateHeightForUser(userXToken);
    }
  };

  const handleFatUpdate = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const userGoogleToken = await AsyncStorage.getItem("userGoogleToken");
    const userXToken = await AsyncStorage.getItem("userXToken");

    if (userToken) {
      await updateFatForUser(userToken);
    } else if (userGoogleToken) {
      await updateFatForUser(userGoogleToken);
    } else if (userXToken) {
      await updateFatForUser(userXToken);
    }
  };

  const updatePictureForUser = async (allUserToken, uri) => {
    const decodedAllUserToken = jwtDecode(allUserToken);
    const userId = decodedAllUserToken.userId;

    try {
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/${userId}/updatePicture`,
        {
          picture: uri,
        }
      );
      console.log("Image upload successful:", response);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleImagePicker = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const userGoogleToken = await AsyncStorage.getItem("userGoogleToken");
    const userXToken = await AsyncStorage.getItem("userXToken");

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setSelectedImage(uri);

      if (userToken) {
        await updatePictureForUser(userToken, uri);
      } else if (userGoogleToken) {
        await updatePictureForUser(userGoogleToken, uri);
      } else if (userXToken) {
        await updatePictureForUser(userXToken, uri);
      }
    }
  };

  const haddleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userGoogleToken");
      await AsyncStorage.removeItem("userXToken");

      navigation.navigate("Main");
    } catch (error) {
      console.log("Log out failed");
    }
  };

  const handleEditWeight = () => {
    setModalVisibleWeight(true);
  };

  const handleEditHeight = () => {
    setModalVisibleHeight(true);
  };

  const handleEditFat = () => {
    setModalVisibleFat(true);
  };

  const calLBM = () => {
    const lbm = weight * (1 - fat / 100);
    return lbm;
  };

  const calBMR = (activityLevel) => {
    // Men
    const bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * 22;
    if (activityLevel === "sedentary") {
      return (bmr * 1.2).toString().split(".")[0];
    } else if (activityLevel === "lightly") {
      return (bmr * 1.375).toString().split(".")[0];
    } else if (activityLevel === "moderately") {
      return (bmr * 1.55).toString().split(".")[0];
    } else if (activityLevel === "highintensity") {
      return (bmr * 1.725).toString().split(".")[0];
    } else if (activityLevel === "extraintensity") {
      return (bmr * 1.9).toString().split(".")[0];
    }
    // const bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age) // True formula
    return bmr.toString().split(".")[0];
  };

  const calBmi = () => {
    if (height > 0) {
      const calculatedBmi = weight / Math.pow(height / 100, 2);

      return calculatedBmi.toFixed(2);
    } else {
      return "0.00";
    }
  };

  const getBMIColor = (value) => {
    if (value < 18) return "lightgreen";
    if (value >= 18 && value < 23) return "green";
    if (value >= 23 && value < 25) return "pink";
    if (value >= 25 && value < 30) return "orange";
    if (value >= 30) return "red";
  };

  const getPointerPosition = (value) => {
    if (value < 0) return 0;
    if (value > 40) return 100;

    if (value < 18) {
      return (value / 18) * 20; // 0-20%
    } else if (value < 23) {
      return 20 + ((value - 18) / (23 - 18)) * 20; // 20-40%
    } else if (value < 25) {
      return 40 + ((value - 23) / (25 - 23)) * 20; // 40-60%
    } else if (value < 30) {
      return 60 + ((value - 25) / (30 - 25)) * 20; // 60-80%
    } else {
      return 80 + ((value - 30) / (40 - 30)) * 20; // 80-100%
    }
  };
  const calculatedBmi = parseFloat(calBmi());
  const pointerPosition = getPointerPosition(calculatedBmi);
  const bmiColor = getBMIColor(calculatedBmi);
  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Your Weight"],
  };

  return (
    <View style={[ProfileScreenStyle.container]}>
      <Header />
      <ScrollView style={[styles.container]}>
        <View style={{ gap: 20, paddingBottom: 60 }}>
          <View style={[ProfileScreenStyle.profile_box]}>
            <TouchableOpacity
              style={[ProfileScreenStyle.profile_button_edit]}
              onPress={handleImagePicker}
            >
              <IconEntypo name={"edit"} size={10} color={colors.clr_gray} />
            </TouchableOpacity>

            <View style={[ProfileScreenStyle.profile]}>
              <Image
                source={{ uri: selectedImage }}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View style={[ProfileScreenStyle.profile_container]}>
              <Text style={[ProfileScreenStyle.username_text]}>{username}</Text>
              <View
                style={[{ alignItems: "center", justifyContent: "center" }]}
              >
                <TouchableOpacity style={[ProfileScreenStyle.button]}>
                  <IconMaterialCommunityIcons
                    name={"plus-thick"}
                    size={10}
                    color={"white"}
                  />
                  <Text style={[ProfileScreenStyle.button__text]}>
                    Insert data
                  </Text>
                </TouchableOpacity>
                <Text style={[{ color: "red", fontSize: sizes.size_3xs }]}>
                  If you don’t insert data we can’t analysis data
                </Text>
              </View>
            </View>
          </View>
          {/* Profile Box Section */}

          {/* Data health Section */}
          <Text style={[ProfileScreenStyle.text__topic]}>Health Metrics</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
            <View
              style={[ProfileScreenStyle.box, { backgroundColor: "#3A506B" }]}
            >
              <View style={[ProfileScreenStyle.inside_box]}>
                <View style={[ProfileScreenStyle.header_box]}>
                  <Text style={[ProfileScreenStyle.header_text]}>Weight</Text>
                  <TouchableOpacity
                    style={[
                      ProfileScreenStyle.button_edit,
                      { backgroundColor: "#4C688B" },
                    ]}
                    onPress={handleEditWeight}
                  >
                    <IconEntypo
                      name={"edit"}
                      size={8}
                      color={colors.clr_white}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[ProfileScreenStyle.body__box]}>
                  <View style={[ProfileScreenStyle.body__data__box]}>
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
              <View style={[ProfileScreenStyle.box_modal]}>
                <View style={[ProfileScreenStyle.inside_box_modal]}>
                  <Text style={[ProfileScreenStyle.modal_header_text]}>
                    Edit Weight.
                  </Text>
                  <TextInput
                    style={[ProfileScreenStyle.modal_text_input]}
                    keyboardType="numeric"
                    onChangeText={(text) => setTempWeight(text)}
                  />
                  <View style={[ProfileScreenStyle.modal_input_box]} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setModalVisibleWeight(false)}
                      style={[
                        ProfileScreenStyle.modal_button,
                        { backgroundColor: "lightgray" },
                      ]}
                    >
                      <Text>close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleWeightUpdate}
                      style={[
                        ProfileScreenStyle.modal_button,
                        { backgroundColor: "green" },
                      ]}
                    >
                      <Text style={{ color: "white" }}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View
              style={[ProfileScreenStyle.box, { backgroundColor: "#5C946E" }]}
            >
              <View style={[ProfileScreenStyle.inside_box]}>
                <View style={[ProfileScreenStyle.header_box]}>
                  <Text style={[ProfileScreenStyle.header_text]}>Height</Text>
                  <TouchableOpacity
                    style={[
                      ProfileScreenStyle.button_edit,
                      { backgroundColor: "#6FB184" },
                    ]}
                    onPress={handleEditHeight}
                  >
                    <IconEntypo
                      name={"edit"}
                      size={8}
                      color={colors.clr_white}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[ProfileScreenStyle.body__box]}>
                  <View style={[ProfileScreenStyle.body__data__box]}>
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
              <View style={[ProfileScreenStyle.box_modal]}>
                <View style={[ProfileScreenStyle.inside_box_modal]}>
                  <Text style={[ProfileScreenStyle.modal_header_text]}>
                    Edit Height.
                  </Text>
                  <TextInput
                    style={[ProfileScreenStyle.modal_text_input]}
                    keyboardType="numeric"
                    onChangeText={(text) => setTempHeight(text)}
                  />
                  <View style={[ProfileScreenStyle.modal_input_box]} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setModalVisibleHeight(false)}
                      style={[
                        ProfileScreenStyle.modal_button,
                        { backgroundColor: "lightgray" },
                      ]}
                    >
                      <Text>close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleHeightUpdate}
                      style={[
                        ProfileScreenStyle.modal_button,
                        { backgroundColor: "green" },
                      ]}
                    >
                      <Text style={{ color: "white" }}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View
              style={[ProfileScreenStyle.box, { backgroundColor: "#4B778D" }]}
            >
              <View style={[ProfileScreenStyle.inside_box]}>
                <View style={[ProfileScreenStyle.header_box]}>
                  <Text style={[ProfileScreenStyle.header_text]}>
                    Body fat %
                  </Text>
                  <TouchableOpacity
                    style={[
                      ProfileScreenStyle.button_edit,
                      { backgroundColor: "#5A8DA7" },
                    ]}
                    onPress={handleEditWeight}
                  >
                    <IconEntypo
                      name={"edit"}
                      size={8}
                      color={colors.clr_white}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[ProfileScreenStyle.body__box]}>
                  <View style={[ProfileScreenStyle.body__data__box]}>
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
              <View style={[ProfileScreenStyle.box_modal]}>
                <View style={[ProfileScreenStyle.inside_box_modal]}>
                  <Text style={[ProfileScreenStyle.modal_header_text]}>
                    Edit Body Fat %.
                  </Text>
                  <TextInput
                    style={[ProfileScreenStyle.modal_text_input]}
                    keyboardType="numeric"
                    onChangeText={(text) => setTempFat(text)}
                  />
                  <View style={[ProfileScreenStyle.modal_input_box]} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setModalVisibleFat(false)}
                      style={[
                        ProfileScreenStyle.modal_button,
                        { backgroundColor: "lightgray" },
                      ]}
                    >
                      <Text>close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleFatUpdate}
                      style={[
                        ProfileScreenStyle.modal_button,
                        { backgroundColor: "green" },
                      ]}
                    >
                      <Text style={{ color: "white" }}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View
              style={[ProfileScreenStyle.box, { backgroundColor: "#6A0572" }]}
            >
              <View style={[ProfileScreenStyle.inside_box]}>
                <View>
                  <View>
                    <View style={[ProfileScreenStyle.header_box_bmi]}>
                      <Text style={[ProfileScreenStyle.header_text]}>BMI</Text>
                      <View style={ProfileScreenStyle.textContainer}>
                        {calculatedBmi < 18 && (
                          <IconMaterialCommunityIcons
                            name={"emoticon-sad"}
                            size={30}
                            color={bmiColor}
                          />
                        )}
                        {calculatedBmi >= 18 && calculatedBmi < 23 && (
                          <IconMaterialCommunityIcons
                            name={"emoticon-happy"}
                            size={30}
                            color={bmiColor}
                          />
                        )}
                        {calculatedBmi >= 23 && calculatedBmi < 25 && (
                          <IconMaterialCommunityIcons
                            name={"emoticon-confused"}
                            size={30}
                            color={bmiColor}
                          />
                        )}
                        {calculatedBmi >= 25 && calculatedBmi < 30 && (
                          <IconMaterialCommunityIcons
                            name={"emoticon-angry"}
                            size={30}
                            color={bmiColor}
                          />
                        )}
                        {calculatedBmi >= 30 && (
                          <IconMaterialCommunityIcons
                            name={"emoticon-dead"}
                            size={30}
                            color={bmiColor}
                          />
                        )}
                      </View>
                    </View>
                    <>
                      <Text style={[ProfileScreenStyle.bmi_text]}>
                        {calBmi()}
                      </Text>
                    </>
                  </View>
                </View>

                <View style={ProfileScreenStyle.bmiRange}>
                  <View style={ProfileScreenStyle.rangeLabels}>
                    <Text style={ProfileScreenStyle.rangeLabel}>0</Text>
                    <Text style={ProfileScreenStyle.rangeLabel}>18</Text>
                    <Text style={ProfileScreenStyle.rangeLabel}>23</Text>
                    <Text style={ProfileScreenStyle.rangeLabel}>25</Text>
                    <Text style={ProfileScreenStyle.rangeLabel}>30</Text>
                    <Text style={ProfileScreenStyle.rangeLabel}>40</Text>
                  </View>
                  <View style={ProfileScreenStyle.barColors}>
                    <View
                      style={[
                        ProfileScreenStyle.colorBlock,
                        { backgroundColor: "lightgreen" },
                      ]}
                    />

                    <View
                      style={[
                        ProfileScreenStyle.colorBlock,
                        { backgroundColor: "green" },
                      ]}
                    />
                    <View
                      style={[
                        ProfileScreenStyle.colorBlock,
                        { backgroundColor: "pink" },
                      ]}
                    />
                    <View
                      style={[
                        ProfileScreenStyle.colorBlock,
                        { backgroundColor: "orange" },
                      ]}
                    />
                    <View
                      style={[
                        ProfileScreenStyle.colorBlock,
                        { backgroundColor: "red" },
                      ]}
                    />
                    <View
                      style={[
                        ProfileScreenStyle.pointer,
                        { left: `${pointerPosition}%` },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={[
                ProfileScreenStyle.muscle__box,
                { backgroundColor: "#4D3170" },
              ]}
            >
              <View style={{ gap: 10 }}>
                <View style={[ProfileScreenStyle.header_box]}>
                  <Text style={[ProfileScreenStyle.header_text]}>Muscle</Text>
                </View>
                <View style={[ProfileScreenStyle.body__box]}>
                  <View style={[ProfileScreenStyle.body__data__box]}>
                    <Text style={[ProfileScreenStyle.body_text_number]}>
                      {fat}
                    </Text>
                    <Text style={[ProfileScreenStyle.body_text_unit]}>%</Text>
                  </View>
                  <IconMaterialCommunityIcons
                    name={"human"}
                    size={50}
                    color={"white"}
                  />
                  <View>
                    <Text>Arm</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={[
                ProfileScreenStyle.longbox,
                { backgroundColor: "#F3FF9D" },
              ]}
            >
              <View style={[ProfileScreenStyle.inside_box]}>
                <View>
                  <View>
                    <View style={[ProfileScreenStyle.header_box_bmi]}>
                      <Text style={[ProfileScreenStyle.bmi_text]}>
                        Lean Body Mass (LBM)
                      </Text>
                    </View>

                    <View
                      style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                      <Text
                        style={[
                          ProfileScreenStyle.body_text_number,
                          { fontSize: sizes.size_base },
                        ]}
                      >
                        Estimate LBM: {calLBM()}
                      </Text>
                      <Text style={[ProfileScreenStyle.body_text_unit]}>
                        KG
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={[
                ProfileScreenStyle.longbox,
                { backgroundColor: "#F3FF9D", marginBottom: 20 },
              ]}
            >
              <View style={[ProfileScreenStyle.inside_box]}>
                <View>
                  <View>
                    <View style={[ProfileScreenStyle.header_box_bmi]}>
                      <Text style={[ProfileScreenStyle.bmi_text]}>
                        Basal Metabolic Rate (BMR)
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                      <Text
                        style={[
                          ProfileScreenStyle.body_text_number,
                          { fontSize: sizes.size_base },
                        ]}
                      >
                        BMR: {calBMR()}
                      </Text>
                      <Text style={[ProfileScreenStyle.body_text_unit]}>
                        {" "}
                        Calories/day
                      </Text>
                    </View>

                    <View style={ProfileScreenStyle.table_header}>
                      <Text
                        style={[
                          ProfileScreenStyle.table_header_cell,
                          { flex: 0.8 },
                        ]}
                      >
                        Activity level
                      </Text>
                      <Text
                        style={[
                          ProfileScreenStyle.table_header_cell,
                          { flex: 0.2 },
                        ]}
                      >
                        Calorie
                      </Text>
                    </View>
                    <View style={ProfileScreenStyle.table_row}>
                      <Text
                        style={[
                          ProfileScreenStyle.table_row_cell,
                          { flex: 0.8 },
                        ]}
                      >
                        Sedentary: little or no exercise
                      </Text>
                      <Text
                        style={[
                          ProfileScreenStyle.table_row_cell,
                          { flex: 0.2, textAlign: "center" },
                        ]}
                      >
                        {" "}
                        {calBMR("sedentary")}
                      </Text>
                    </View>
                    <View style={ProfileScreenStyle.table_row}>
                      <Text
                        style={[
                          ProfileScreenStyle.table_row_cell,
                          { flex: 0.8 },
                        ]}
                      >
                        Exercise 1-3 times/week
                      </Text>
                      <Text
                        style={[
                          ProfileScreenStyle.table_row_cell,
                          { flex: 0.2, textAlign: "center" },
                        ]}
                      >
                        {" "}
                        {calBMR("lighly")}
                      </Text>
                    </View>

                    <View style={ProfileScreenStyle.table_row}>
                      <Text
                        style={[
                          ProfileScreenStyle.table_row_cell,
                          { flex: 0.8 },
                        ]}
                      >
                        Exercise 4-5 times/week
                      </Text>
                      <Text
                        style={[
                          ProfileScreenStyle.table_row_cell,
                          {
                            flex: 0.2,
                            textAlign: "center",
                            alignItems: "center",
                          },
                        ]}
                      >
                        {" "}
                        {calBMR("moderately")}
                      </Text>
                    </View>

                    <View style={ProfileScreenStyle.table_row}>
                      <Text
                        style={[
                          ProfileScreenStyle.table_row_cell,
                          { flex: 0.8 },
                        ]}
                      >
                        Intense exercise 6-7 times/week
                      </Text>
                      <Text
                        style={[
                          ProfileScreenStyle.table_row_cell,
                          { flex: 0.2, textAlign: "center" },
                        ]}
                      >
                        {" "}
                        {calBMR("highintensity")}
                      </Text>
                    </View>
                    <View style={ProfileScreenStyle.table_row}>
                      <Text
                        style={[
                          ProfileScreenStyle.table_row_cell,
                          { flex: 0.8 },
                        ]}
                      >
                        Very intense exercise daily, or physical job
                      </Text>
                      <Text
                        style={[
                          ProfileScreenStyle.table_row_cell,
                          { flex: 0.2, textAlign: "center" },
                        ]}
                      >
                        {" "}
                        {calBMR("extraintensity")}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
              />
            </View>
            <Text style={{ color: "white" }}>
              Last update : {moment(updatedAt).format("DD/MM/YYYY HH:mm:ss")}{" "}
            </Text>
            {/* Data health Section */}

            {/* Analysist Section */}
            <>
              <Text style={[ProfileScreenStyle.text__topic]}>Analysist</Text>
            </>
            {/* Analysist Section */}

            {/* Logout button Section */}
            <>
              <TouchableOpacity
                style={[styles.button, styles.buttonText]}
                onPress={haddleLogout}
              >
                <Text style={[styles.buttonText]}>Log out</Text>
              </TouchableOpacity>
            </>
            {/* Logout button Section */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
