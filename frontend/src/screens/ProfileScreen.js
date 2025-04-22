import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import styles, { sizes, colors } from "../styles/style";
import Header from "../components/Header";
import ProfileScreenStyle from "../styles/components/ProfileScreenStyle";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconIonicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import moment from "moment";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import HorizontalPicker from "@vseslav/react-native-horizontal-picker";

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
  const weights = Array.from({ length: 251 }, (_, i) => 0 + i);
  const fats = Array.from({ length: 60 }, (_, i) => 5 + i);

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
      const { username, weight, height, fat, picture, updatedAt, sex, age } =
        response.data;
      setUsername(username || response.data.givenName || response.data.name);
      setWeight(weight);
      setHeight(height);
      setFat(fat);
      setSelectedImage(picture);
      setUpdatedAt(updatedAt);
      setSex(sex);
      setAge(age);
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
      setAge(tempAge);
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
  const handleMetric = () => {
    navigation.navigate("Metric");
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

  const otherButton = [
    {
      id: "privacy",
      subTitle: "Privacy Policy",
      Icon: "lock",
      screen :'Privacy'
    },
    {
      id: "setting",
      subTitle: "Setting",
      Icon: "setting",
    },
    {
      id: "help",
      subTitle: "Help",
      Icon: "customerservice",
      screen: 'Help'
    },
    {
      id: "logout",
      subTitle: "Logout",
      Icon: "logout",
    },
  ];

  const Dumbbells = () => {
    return (
      <View style={[{ position: "absolute", right: 0, top: 0 }]}>
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
              style={[ProfileScreenStyle.profile]}
              onPress={handleImagePicker}
            >
              <View style={[ProfileScreenStyle.profile__img]}>
                <Image
                  source={{ uri: selectedImage }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <View style={[ProfileScreenStyle.profile_button_edit]}>
                <IconEntypo name={"camera"} size={8} color={colors.clr_black} />
              </View>
            </TouchableOpacity>

            <View style={[ProfileScreenStyle.profile_container]}>
              <Text style={[ProfileScreenStyle.username_text]}>{username}</Text>
              {sex != null && age != 0 ? (
                <View>
                  <Text style={[ProfileScreenStyle.data__text]}>
                    Age : {age} {"  "} Sex :{" "}
                    <Text
                      style={{
                        color:
                          sex === "male" ? colors.clr_brightblue : "#FF3399",
                        fontSize: sizes.size_lg,
                      }}
                    >
                      {sex === "male" ? "♂" : "♀"}
                    </Text>
                  </Text>
                </View>
              ) : (
                <View
                  style={[
                    {
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      marginTop: 10,
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={[ProfileScreenStyle.button]}
                    onPress={handleEditSex}
                  >
                    <IconMaterialCommunityIcons
                      name={"plus-thick"}
                      size={7}
                      color={"white"}
                    />
                    <Text style={[ProfileScreenStyle.button__text]}>
                      Set profile
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={[
                      { color: colors.clr_lightgray, fontSize: sizes.size_3xs },
                    ]}
                  >
                    If you don’t insert data we can’t analysis data
                  </Text>
                </View>
              )}
            </View>
          </View>
          <Modal
            visible={isModalVisibleSex}
            animationType="slide"
            transparent={true}
          >
            <View style={ProfileScreenStyle.box_modal}>
              <View style={[ProfileScreenStyle.inside_box_modal, { gap: 70 }]}>
                <Dumbbells />
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
                      tempSex === "male" && {
                        backgroundColor: colors.clr_brightblue,
                      },
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
                      tempSex === "female" && { backgroundColor: "#FF3399" },
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
                    <Text style={[ProfileScreenStyle.modal__button__text]}>
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
                <Dumbbells />
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
                      height: 250,
                      width: 80,
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
                          color:
                            tempAge === data ? colors.clr_brightblue : "#fff",
                          fontWeight: tempAge === data ? "bold" : "normal",
                          textAlign: "center",
                        }}
                      >
                        {data}
                      </Text>
                    )}
                    onValueChange={setTempAge}
                    wrapperBackground={"transparent"}
                    itemHeight={50}
                    highlightColor={colors.clr_brightblue}
                    highlightBorderWidth={3}
                    highlightWidth={50}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    style={ProfileScreenStyle.modal_button}
                    onPress={handleAgeUpdate}
                  >
                    <Text style={[ProfileScreenStyle.modal__button__text]}>
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* Profile Box Section */}

          {/* Data health Section */}
          <View
            style={[{ justifyContent: "space-between", flexDirection: "row" }]}
          >
            <Text style={[ProfileScreenStyle.text__topic]}>Health Metrics</Text>
            <TouchableOpacity onPress={handleMetric}>
              <Text style={[ProfileScreenStyle.text__seeall]}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
            <View
              style={[
                ProfileScreenStyle.box,
                { backgroundColor: "rgba(0, 188, 212, 1)" },
              ]}
            >
              <View style={[ProfileScreenStyle.inside_box]}>
                <View style={[ProfileScreenStyle.header_box]}>
                  <Text style={[ProfileScreenStyle.header_text]}>Weight</Text>
                  <TouchableOpacity
                    style={[
                      ProfileScreenStyle.button_edit,
                      { backgroundColor: "rgb(63, 142, 179)" },
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
                  <Dumbbells />
                  <Text style={[ProfileScreenStyle.modal_header_text]}>
                    Select Your Weight.
                  </Text>
                  <Text style={[ProfileScreenStyle.modal_subtitle]}>
                    you can always change your Weight
                  </Text>
                  <View
                    style={{
                      height: 250,
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <View style={{ width: 240, alignSelf: "center" }}>
                      <HorizontalPicker
                        data={weights}
                        renderItem={(item, index) => (
                          <View
                            style={{
                              width: 80,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: tempWeight === item ? 40 : 20,
                                color:
                                  tempWeight === item
                                    ? colors.clr_brightblue
                                    : colors.clr_lightgray,
                                textAlign: "center",
                              }}
                            >
                              {String(item).padStart(3, " ")}
                            </Text>
                          </View>
                        )}
                        itemWidth={80}
                        defaultIndex={Math.floor(weights.length / 2)}
                        animatedScrollToDefaultIndex={true}
                        onChange={setTempWeight}
                      />
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={ProfileScreenStyle.modal_button}
                      onPress={handleWeightUpdate}
                    >
                      <Text style={[ProfileScreenStyle.modal__button__text]}>
                        Done
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View
              style={[
                ProfileScreenStyle.box,
                { backgroundColor: "rgba(139, 195, 74, 1)" },
              ]}
            >
              <View style={[ProfileScreenStyle.inside_box]}>
                <View style={[ProfileScreenStyle.header_box]}>
                  <Text style={[ProfileScreenStyle.header_text]}>Height</Text>
                  <TouchableOpacity
                    style={[
                      ProfileScreenStyle.button_edit,
                      { backgroundColor: "rgb(109, 153, 58)" },
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
                <View
                  style={[ProfileScreenStyle.inside_box_modal, { gap: 70 }]}
                >
                  <Dumbbells />
                  <View>
                    <Text style={[ProfileScreenStyle.modal_header_text]}>
                      Select Your Height
                    </Text>
                    <Text style={{ color: "white" }}>
                      you can always change your Height
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        height: 250,
                        width: 80,
                      },
                    ]}
                  >
                    <ScrollPicker
                      dataSource={heights}
                      selectedIndex={1}
                      renderItem={(data, index) => (
                        <Text
                          style={{
                            fontSize: tempHeight === data ? 40 : 22,
                            color:
                              tempHeight === data
                                ? colors.clr_brightblue
                                : "#fff",
                            fontWeight: tempHeight === data ? "bold" : "normal",
                            textAlign: "center",
                          }}
                        >
                          {data}
                        </Text>
                      )}
                      onValueChange={setTempHeight}
                      wrapperBackground={"transparent"}
                      itemHeight={50}
                      highlightColor={colors.clr_brightblue}
                      highlightBorderWidth={3}
                      highlightWidth={50}
                    />
                  </View>

                  <View>
                    <TouchableOpacity
                      style={ProfileScreenStyle.modal_button}
                      onPress={handleHeightUpdate}
                    >
                      <Text style={[ProfileScreenStyle.modal__button__text]}>
                        Done
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View
              style={[
                ProfileScreenStyle.box,
                { backgroundColor: "rgba(255, 152, 0, 1)" },
              ]}
            >
              <View style={[ProfileScreenStyle.inside_box]}>
                <View style={[ProfileScreenStyle.header_box]}>
                  <Text style={[ProfileScreenStyle.header_text]}>
                    Body fat %
                  </Text>
                  <TouchableOpacity
                    style={[
                      ProfileScreenStyle.button_edit,
                      { backgroundColor: "rgb(192, 116, 1)" },
                    ]}
                    onPress={handleEditFat}
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
                    <Text style={[ProfileScreenStyle.body_text_unit_unique]}>%</Text>
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
                <View
                  style={[ProfileScreenStyle.inside_box_modal, { gap: 70 }]}
                >
                  <Dumbbells />
                  <View>
                    <Text style={[ProfileScreenStyle.modal_header_text]}>
                      Edit Body Fat %.
                    </Text>
                    <Text style={[ProfileScreenStyle.modal_subtitle]}>
                      You can always change your Fat
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        height: 250,
                        width: 80,
                      },
                    ]}
                  >
                    <ScrollPicker
                      dataSource={fats}
                      selectedIndex={1}
                      renderItem={(data, index) => (
                        <Text
                          style={{
                            fontSize: tempFat === data ? 40 : 22,
                            color:
                              tempFat === data ? colors.clr_brightblue : "#fff",
                            fontWeight: tempFat === data ? "bold" : "normal",
                            textAlign: "center",
                          }}
                        >
                          {data}
                        </Text>
                      )}
                      onValueChange={setTempFat}
                      wrapperBackground={"transparent"}
                      itemHeight={50}
                      highlightColor={colors.clr_brightblue}
                      highlightBorderWidth={3}
                      highlightWidth={50}
                    />
                  </View>

                  <View>
                    <TouchableOpacity
                      style={ProfileScreenStyle.modal_button}
                      onPress={handleFatUpdate}
                    >
                      <Text style={[ProfileScreenStyle.modal__button__text]}>
                        Done
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View
              style={[
                ProfileScreenStyle.box,
                { backgroundColor: "rgb(184, 54, 207)" },
              ]}
            >
              <View style={[ProfileScreenStyle.inside_box]}>
                <View>
                  <View>
                    <View style={[ProfileScreenStyle.header_box_bmi]}>
                      <View>
                        <Text style={[ProfileScreenStyle.header_text]}>
                          BMI
                        </Text>
                        <Text style={[ProfileScreenStyle.bmi_text]}>
                          {calBmi()}
                        </Text>
                      </View>
                      <IconMaterialCommunityIcons
                        name={getBMIIcon(calculatedBmi)}
                        size={25}
                        color={bmiColor}
                      />
                    </View>
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
                        { backgroundColor: "rgb(28, 115, 245)" },
                      ]}
                    />

                    <View
                      style={[
                        ProfileScreenStyle.colorBlock,
                        { backgroundColor: "rgb(1, 236, 253)" },
                      ]}
                    />
                    <View
                      style={[
                        ProfileScreenStyle.colorBlock,
                        { backgroundColor: "rgba(255, 235, 59, 1)" },
                      ]}
                    />
                    <View
                      style={[
                        ProfileScreenStyle.colorBlock,
                        { backgroundColor: "rgba(255, 152, 0, 1)" },
                      ]}
                    />
                    <View
                      style={[
                        ProfileScreenStyle.colorBlock,
                        { backgroundColor: "rgba(244, 67, 54, 1)" },
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

            <View style={[{ paddingBottom: 30 }]}>
              <Text
                style={{ color: colors.clr_lightgray, fontSize: sizes.size_xs }}
              >
                Last update : {moment(updatedAt).format("DD/MM/YYYY HH:mm")}
              </Text>
            </View>
            {/* Data health Section */}

            {/* Logout button Section */}
             <View style={[{ gap: 15 }]}>
              <Text style={[ProfileScreenStyle.texttopic]}>Other</Text>
              {otherButton.map((otherButtons) => (
                <TouchableOpacity
                  key={otherButtons.id}
                  style={[
                    ProfileScreenStyle.buttonOther,
                    ProfileScreenStyle.buttonTextOther,
                  ]}
                  onPress={()=>{
                    if (otherButtons.subTitle !== 'Logout') {
                      navigation.navigate(otherButtons.screen)
                    }else{
                      haddleLogout();
                    }
                  }}
                >
                  <View style={[ProfileScreenStyle.boxleftOther]}>
                    <View style={[ProfileScreenStyle.boxiconOther]}>
                      <IconAntDesign
                        name={otherButtons.Icon}
                        size={15}
                        color={colors.clr_lightgray}
                      />
                    </View>
                    <Text style={[ProfileScreenStyle.buttonTextOther]}>
                      {otherButtons.subTitle}
                    </Text>
                  </View>
                  <IconIonicons
                    name={"arrow-redo-sharp"}
                    size={15}
                    color={colors.clr_brightblue}
                    style={[{ paddingRight: 10 }]}
                  />
                </TouchableOpacity>
              ))}
            </View>
            {/* Logout button Section */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
