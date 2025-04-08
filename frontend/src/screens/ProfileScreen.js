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
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styles, { sizes, colors } from "../styles/style";
import Header from "../components/Header";
import ProfileScreenStyle from "../styles/components/ProfileScreenStyle";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import moment from "moment";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import ScrollPicker from "react-native-wheel-scrollview-picker";

import HorizontalPicker from '@vseslav/react-native-horizontal-picker';


const screenWidth = Dimensions.get("window").width;

export default function ProfileScreen({}) {
  const [username, setUsername] = useState("");
  const [weight, setWeight] = useState(0);
  const [tempWeight, setTempWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [tempHeight, setTempHeight] = useState(0);
  const [fat, setFat] = useState(0);
  const [tempFat, setTempFat] = useState(0);
  const [sex, setSex] = useState(null);
  const [tempSex, setTempSex] = useState(null);
  const [age, setAge] = useState(0);
  const [tempAge, setTempAge] = useState(0);
  const [updatedAt, setUpdatedAt] = useState("");
  const [isModalVisibleWeight, setModalVisibleWeight] = useState(false);
  const [isModalVisibleHeight, setModalVisibleHeight] = useState(false);
  const [isModalVisibleFat, setModalVisibleFat] = useState(false);
  const [isModalVisibleSex, setModalVisibleSex] = useState(false);
  const [isModalVisibleAge, setModalVisibleAge] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const ages = Array.from({ length: 83 }, (_, index) => 18 + index);
  const navigation = useNavigation();
  const heights = Array.from({ length: 161 }, (_, i) => 90 + i);
  const weights = Array.from({ length: 251}, (_, i) => 0 + i);




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
  const updateSexForUser = async (allUserToken) => {
    const decodedAllUserToken = jwtDecode(allUserToken);
    const userId = decodedAllUserToken.userId;

    try {
      await axios.put(
        `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/${userId}/updateSex`,
        {
          sex: tempSex,
        }
      );
      setSex(tempSex);
      setModalVisibleSex(false);
      setModalVisibleAge(true);
    } catch (error) {
      console.error("Error updating sex:", error);
      Alert.alert("Error", "An error occurred while updating sex.", error);
    }
  };
  const updateAgeForUser = async (allUserToken) => {
    const decodedAllUserToken = jwtDecode(allUserToken);
    const userId = decodedAllUserToken.userId;

    try {
      await axios.put(
        `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/${userId}/updateAge`,
        {
          age: parseFloat(tempAge),
        }
      );
      setSex(tempAge);
      setModalVisibleAge(false);
    } catch (error) {
      console.error("Error updating age:", error);
      Alert.alert("Error", "An error occurred while updating age.", error);
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
  const handleSexUpdate = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const userGoogleToken = await AsyncStorage.getItem("userGoogleToken");
    const userXToken = await AsyncStorage.getItem("userXToken");

    if (userToken) {
      await updateSexForUser(userToken);
    } else if (userGoogleToken) {
      await updateSexForUser(userGoogleToken);
    } else if (userXToken) {
      await updateSexForUser(userXToken);
    }
  };
  const handleAgeUpdate = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const userGoogleToken = await AsyncStorage.getItem("userGoogleToken");
    const userXToken = await AsyncStorage.getItem("userXToken");

    if (userToken) {
      await updateAgeForUser(userToken);
    } else if (userGoogleToken) {
      await updateAgeForUser(userGoogleToken);
    } else if (userXToken) {
      await updateAgeForUser(userXToken);
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
  const handleEditSex = () => {
    setModalVisibleSex(true);
  };

  const calLBM = () => {
    const lbm = weight * (1 - fat / 100);
    return lbm;
  };

  const renderItem = (data, index ) => (
    <View style = {{width: 80, justifyContent:'center',alignItems:'center'}}>
      <Text style = {{fontSize:20}}>{data}</Text>
      </View>
  );


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
  const getBMIIcon = (value) => {
    if (value < 18) return "emoticon-sad";
    if (value >= 18 && value < 23) return "emoticon-happy";
    if (value >= 23 && value < 25) return "emoticon-confused";
    if (value >= 25 && value < 30) return "emoticon-angry";
    if (value >= 30) return "emoticon-dead";
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

  const Dumbbells = () => {
    return (
      <View style={[{position: "absolute", right:0, top:0}]}>
        <IconFontAwesome5
          name={"dumbbell"}
          size={30}
          color={colors.clr_lightgray}
          style={ProfileScreenStyle.dumbbell_top}
        />
        <IconFontAwesome5
          name={"dumbbell"}
          size={30}
          color={colors.clr_lightgray}
          style={ProfileScreenStyle.dumbbell_middle}
        />
        <IconFontAwesome5
          name={"dumbbell"}
          size={40}
          color={colors.clr_lightgray}
          style={ProfileScreenStyle.dumbbell_bottom}
        />
      </View>
    );
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
                <TouchableOpacity
                  style={[ProfileScreenStyle.button]}
                  onPress={handleEditSex}
                >
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
          <Modal
            visible={isModalVisibleSex}
            animationType="slide"
            transparent={true}
          >
            <View style={ProfileScreenStyle.box_modal}>
              <View style={[ProfileScreenStyle.inside_box_modal, { gap: 70 }]}>
              <Dumbbells/>
                <View>
                  <Text style={ProfileScreenStyle.modal_header_text}>
                    Tell us about yourself!
                  </Text>
                  <Text style={ProfileScreenStyle.modal_subtitle}>
                    You can always change your height.
                  </Text>
                </View>
                <View style={[{ gap: 20 }]}>
                  <TouchableOpacity
                    style={[
                      ProfileScreenStyle.modal_sex_button,
                      tempSex === "male" && ProfileScreenStyle.selectedSex,
                    ]}
                    onPress={() => setTempSex("male")}
                  >
                    <Text style={[{ fontSize: 60, color: colors.clr_white }]}>
                      ♂
                    </Text>
                    <Text
                      style={[
                        { fontSize: sizes.size_xs, color: colors.clr_white },
                      ]}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      ProfileScreenStyle.modal_sex_button,
                      tempSex === "female" && ProfileScreenStyle.selectedSex,
                    ]}
                    onPress={() => setTempSex("female")}
                  >
                    <Text style={[{ fontSize: 60, color: colors.clr_white }]}>
                      ♀
                    </Text>
                    <Text
                      style={[
                        { fontSize: sizes.size_xs, color: colors.clr_white },
                      ]}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={ProfileScreenStyle.modal_button}
                    onPress={handleSexUpdate}
                  >
                    <Text
                      style={[
                        { fontSize: sizes.size_xs, color: colors.clr_white },
                      ]}
                    >
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            visible={isModalVisibleAge}
            animationType="slide"
            transparent={true}
          >
            <View style={ProfileScreenStyle.box_modal}>
              <View style={[ProfileScreenStyle.inside_box_modal, { gap: 70 }]}>
                <Dumbbells/>
                <View>
                  <Text style={ProfileScreenStyle.modal_header_text}>
                    How old are you?
                  </Text>
                  <Text style={ProfileScreenStyle.modal_subtitle}>
                    You can't change your age.
                  </Text>
                </View>
                <View
                  style={[
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      height: 250,
                    },
                  ]}
                >
                  <ScrollPicker
                    dataSource={ages}
                    selectedIndex={1}
                    renderItem={(data, index) => (
                      <Text
                        style={{
                          fontSize: tempAge === data ? 40 : 22,
                          color: tempAge === data ? colors.clr_brightblue : "#fff", 
                          fontWeight: tempAge === data ? "bold" : "normal",
                        }}
                      >
                        {data}
                      </Text>
                    )}
                    onValueChange={setTempAge}
                    wrapperBackground={"transparent"}
                    itemHeight={50}
                    highlightColor={"#d8d8d8"}
                    highlightBorderWidth={2}
                    highlightWidth={50}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    style={ProfileScreenStyle.modal_button}
                    onPress={handleAgeUpdate}
                  >
                    <Text
                      style={[
                        { fontSize: sizes.size_xs, color: colors.clr_white },
                      ]}
                    >
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
                    Select Your Weight.
                  </Text>
                  <Text style={{ color: "white" }}>
                    you can always change your Weight
                  </Text>
                    <HorizontalPicker
                      data = {weights}
                      renderItem={renderItem}
                      itemWidth={80}
                      onChange={setTempWeight}
                    />


                  <View style={[ProfileScreenStyle.modal_input_box]} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                
                    <TouchableOpacity
                      onPress={handleWeightUpdate}
                      style={[
                        ProfileScreenStyle.modal_button,
                        { backgroundColor: "blue" },
                      ]}
                    >
                      <Text style={{ color: "white" }}>Done</Text>
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
                    Select Your Height
                  </Text>
                  <Text style={{ color: "white" }}>
                    you can always change your Height
                  </Text>
                  <View style = {{width:200 ,height:300, }}>
                    <ScrollPicker
                      dataSource={heights}
                      selectedIndex={heights.indexOf(setHeight)}
                      renderItem={(data, Index) => {
                        return <Text style={{ fontSize: 20 }}>{data}</Text>;
                      }}
                      onValueChange={setTempHeight}
                      wrapperHeight={200}
                      wrapperBackground="#3A3A3A"
                      itemHeight={60}
                      highlightColor="#0046C2"
                      highlightBorderWidth={3}
                    />
                    </View>
                  <View style={[ProfileScreenStyle.modal_input_box]} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      onPress={handleHeightUpdate}
                      style={[
                        ProfileScreenStyle.modal_button,
                        { backgroundColor: "blue" },
                      ]}
                    >
                      <Text style={{ color: "white" }}>Done</Text>
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
                        <IconMaterialCommunityIcons
                          name={getBMIIcon(calculatedBmi)}
                          size={30}
                          color={bmiColor}
                        />
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
                  <Text style={[ProfileScreenStyle.header_text]}>
                    Lean Body Mass (LBM)
                  </Text>
                </View>
                <View style={[ProfileScreenStyle.body__box]}>
                  <View style={[ProfileScreenStyle.body__data__box]}>
                    <Text style={[ProfileScreenStyle.body_text_number]}>
                      100{/* {calLBM()} */}
                    </Text>
                    <Text style={[ProfileScreenStyle.body_text_unit]}>KG</Text>
                  </View>
                  <IconMaterialCommunityIcons
                    name={"human"}
                    size={50}
                    color={"white"}
                  />
                  <View style={[{ width: 60, height: 70 }]}>
                    <Text
                      style={[
                        {
                          color: colors.clr_lightgray,
                          fontSize: sizes.size_2xs,
                        },
                      ]}
                    >
                      Armdsadasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdsadas
                    </Text>
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
              <Text style={{ color: "white" }}>
                Last update : {moment(updatedAt).format("DD/MM/YYYY HH:mm:ss")}{" "}
              </Text>
            </View>
            {/* Data health Section */}

            {/* Analysist Section */}
            <View>
              <Text style={[ProfileScreenStyle.text__topic]}>Analysist</Text>
            </View>
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
