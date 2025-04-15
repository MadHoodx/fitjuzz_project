import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles, { sizes, colors } from "../styles/style";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IconEntypo from "react-native-vector-icons/Entypo";
import ProfileScreenStyle from "../styles/components/ProfileScreenStyle";

const MetricScreen = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [fat, setFat] = useState(0);
  const [sex, setSex] = useState(null);
  const [age, setAge] = useState(0);
  const [hisWeight, setHisWeight] = useState([]);
  const [hisHeight, setHisHeight] = useState([]);
  const [hisFat, setHisFat] = useState([]);
  const [isModalVisibleBMR, setIsModalVisibleBMR] = useState(false);
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
      const {
        weight,
        height,
        fat,
        sex,
        age,
        weightHistory,
        heightHistory,
        fatHistory,
      } = response.data;
      setWeight(weight);
      setHeight(height);
      setFat(fat);
      setSex(sex);
      setAge(age);
      setHisWeight(weightHistory);
      setHisHeight(heightHistory);
      setHisFat(fatHistory);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const calLBM = () => {
    const lbm = weight - (fat / 100) * weight;
    return lbm;
  };
  const LBMIcon = () => {
    const lbm = calLBM();
    if (sex === "male") {
      if (lbm < 50) {
        return "🫃🏻";
      } else if (lbm > 51 && lbm < 60) {
        return "🧍‍♂️";
      } else if (lbm > 61 && lbm < 70) {
        return "💪🏼";
      } else if (lbm > 71) {
        return "🏋";
      } else {
        return "error";
      }
    } else {
      if (lbm < 35) {
        return "🫃🏻";
      } else if (lbm > 36 && lbm < 45) {
        return "🧍‍♂️";
      } else if (lbm > 46 && lbm < 55) {
        return "💪🏼";
      } else if (lbm > 56) {
        return "🏋";
      } else {
        return "error";
      }
    }
  };

  const calBMR = (activityLevel) => {
    // Men
    const bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age; // True formula
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
  const getBMIText = (value) => {
    if (value < 18) return "Underweight";
    if (value >= 18 && value < 23) return "Fit";
    if (value >= 23 && value < 25) return "Slightly Over";
    if (value >= 25 && value < 30) return "Overweight";
    if (value >= 30) return "Take Care!";
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
  const latestWeightHistory = hisWeight.slice(-7);
  const latestHeightHistory = hisHeight.slice(-7);
  const latestFatHistory = hisFat.slice(-7);
  const sortedHistoryWeight =
    latestWeightHistory.length > 0
      ? latestWeightHistory.sort((a, b) => new Date(a.date) - new Date(b.date))
      : [];
  const sortedHistoryHeight =
    latestHeightHistory.length > 0
      ? latestHeightHistory.sort((a, b) => new Date(a.date) - new Date(b.date))
      : [];
  const sortedHistoryFat =
    latestFatHistory.length > 0
      ? latestFatHistory.sort((a, b) => new Date(a.date) - new Date(b.date))
      : [];

  const chartLabels =
    sortedHistoryWeight.length > 0
      ? sortedHistoryWeight.map((entry) => {
          const date = new Date(entry.date);
          return `${date.getDate()}`;
        })
      : ["", "", "", "", ""];

  const chartWeights =
    sortedHistoryWeight.length > 0
      ? sortedHistoryWeight.map((entry) => entry.weight)
      : [0, 0, 0, 0, 0];

  const colorChartShadowWeight = () => {
    if (chartWeights[6] < chartWeights[5]) {
      return "rgba(246, 64, 64, 0.5)";
    } else if (chartWeights[6] > chartWeights[5]) {
      return "rgba(125, 252, 112, 0.5)";
    }
  };
  const colorChartLineWeight = () => {
    if (chartWeights[6] < chartWeights[5]) {
      return (opacity = 1) => `rgba(250, 49, 112,${opacity})`;
    } else if (chartWeights[6] > chartWeights[5]) {
      return (opacity = 1) => `rgba(125, 252, 112,${opacity})`;
    }
  };
  const weightData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartWeights,
        color: colorChartLineWeight(),
        strokeWidth: 0,
      },
    ],
  };
  const chartHeights =
    sortedHistoryHeight.length > 0
      ? sortedHistoryHeight.map((entry) => entry.height)
      : [0, 0, 0, 0, 0];
  const colorChartShadowHeight = () => {
    if (chartHeights[6] < chartHeights[5]) {
      return "rgba(246, 64, 64, 0.5)";
    } else if (chartHeights[6] > chartHeights[5]) {
      return "rgba(125, 252, 112, 0.5)";
    }
  };
  const colorChartLineHeight = () => {
    if (chartHeights[6] < chartHeights[5]) {
      return (opacity = 1) => `rgba(250, 49, 112,${opacity})`;
    } else if (chartHeights[6] > chartHeights[5]) {
      return (opacity = 1) => `rgba(125, 252, 112,${opacity})`;
    }
  };
  const heightData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartHeights,
        color: colorChartLineHeight(),
        strokeWidth: 2,
      },
    ],
  };

  const chartFats =
    sortedHistoryFat.length > 0
      ? sortedHistoryFat.map((entry) => entry.fat)
      : [0, 0, 0, 0, 0];
  const colorChartShadowFat = () => {
    if (chartFats[6] < chartFats[5]) {
      return "rgba(246, 64, 64, 0.5)";
    } else if (chartHeights[6] > chartHeights[5]) {
      return "rgba(125, 252, 112, 0.5)";
    }
  };
  const colorChartLineFat = () => {
    if (chartFats[6] < chartFats[5]) {
      return (opacity = 1) => `rgba(250, 49, 112,${opacity})`;
    } else if (chartFats[6] > chartFats[5]) {
      return (opacity = 1) => `rgba(125, 252, 112,${opacity})`;
    }
  };
  const fatData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartFats,
        color: colorChartLineFat(),
        strokeWidth: 2,
      },
    ],
  };
  const handleBack = () => {
    navigation.navigate("Profile");
  };
  const handleBMR = () => {
    setIsModalVisibleBMR(true);
  };
  const Dumbbells = () => {
    return (
      <View style={[{ position: "absolute", right: 0, top: 0 }]}>
        <IconFontAwesome5
          name={"dumbbell"}
          size={50}
          color={colors.clr_lightgray}
          style={MetricScreenStyles.dumbbell_top}
        />
        <IconFontAwesome5
          name={"dumbbell"}
          size={60}
          color={colors.clr_lightgray}
          style={MetricScreenStyles.dumbbell_middle}
        />
        <IconFontAwesome5
          name={"dumbbell"}
          size={70}
          color={colors.clr_lightgray}
          style={MetricScreenStyles.dumbbell_bottom}
        />
      </View>
    );
  };

  return (
    <View style={[MetricScreenStyles.container]}>
      <ScrollView style={[styles.container]}>
        <View style={[{ paddingBottom: 60 }]}>
          <Dumbbells />
          <View style={[{ paddingTop: 20, gap: 40 }]}>
            <View>
              <TouchableOpacity
                style={[MetricScreenStyles.goback__button]}
                onPress={handleBack}
              >
                <IconMaterialIcons
                  name={"arrow-back-ios-new"}
                  size={20}
                  color={"white"}
                />
              </TouchableOpacity>
            </View>
            <View style={[{ gap: 10 }]}>
              <Text style={[MetricScreenStyles.text__topic]}>
                My Health Metric
              </Text>
              <Text style={[MetricScreenStyles.text__detail]}>
                See detail about your health metric
              </Text>
            </View>
            <View style={[{ gap: 10 }]}>
              <View>
                <Text style={[MetricScreenStyles.text__error]}>All Metric</Text>
              </View>
              <View style={[{ gap: 10 }]}>
                {/* BOX */}
                <View style={[MetricScreenStyles.longbox]}>
                  <View>
                    <View style={[MetricScreenStyles.header_box]}>
                      <IconMaterialIcons
                        name={"monitor-weight"}
                        size={20}
                        color={"rgb(58, 80, 107)"}
                      />

                      <Text style={[MetricScreenStyles.header_text]}>
                        Weight
                      </Text>
                    </View>
                    <View
                      style={[
                        MetricScreenStyles.body__box,
                        { marginTop: 5, paddingHorizontal: 5 },
                      ]}
                    >
                      <View style={[MetricScreenStyles.body__data__box]}>
                        <Text style={[MetricScreenStyles.body_text_number]}>
                          {weight}
                        </Text>
                        <Text style={[MetricScreenStyles.body_text_unit]}>
                          KG
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      {
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      },
                    ]}
                  >
                    {sortedHistoryWeight.length == 7 ? (
                      <View>
                        <LineChart
                          data={weightData}
                          width={180}
                          height={70}
                          chartConfig={{
                            backgroundGradientFrom: "transparent",
                            backgroundGradientTo: "transparent",
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientToOpacity: 0,
                            fillShadowGradientFrom: colorChartShadowWeight(),
                            fillShadowGradientTo: "rgba(92, 148, 110, 0.4)",
                            fillShadowGradientFromOpacity: 1,
                            fillShadowGradientToOpacity: 0,
                            useShadowColorFromDataset: false,
                            strokeWidth: 2,
                            color: () => "transparent",
                            labelColor: () => "transparent",
                            propsForDots: {
                              r: "0",
                              strokeWidth: "10",
                              stroke: "#FF0000",
                            },
                            style: {
                              borderRadius: 16,
                            },
                            yAxisLabel: "",
                            labelCount: 0,
                          }}
                          withVerticalLabels={false}
                        />
                      </View>
                    ) : (
                      <Text style={[MetricScreenStyles.text__error]}>
                        No data update
                      </Text>
                    )}
                  </View>
                </View>
                {/* BOX */}
                {/* BOX */}
                <View style={[MetricScreenStyles.longbox]}>
                  <View>
                    <View style={[MetricScreenStyles.header_box]}>
                      <IconMaterialCommunityIcons
                        name={"human-male-height"}
                        size={20}
                        color={"rgb(92, 148, 110)"}
                      />
                      <Text style={[MetricScreenStyles.header_text]}>
                        Height
                      </Text>
                    </View>
                    <View
                      style={[
                        MetricScreenStyles.body__box,
                        { marginTop: 5, paddingHorizontal: 5 },
                      ]}
                    >
                      <View style={[MetricScreenStyles.body__data__box]}>
                        <Text style={[MetricScreenStyles.body_text_number]}>
                          {height}
                        </Text>
                        <Text style={[MetricScreenStyles.body_text_unit]}>
                          CM
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      {
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      },
                    ]}
                  >
                    {sortedHistoryHeight.length == 7 ? (
                      <View>
                        <LineChart
                          data={heightData}
                          width={180}
                          height={70}
                          chartConfig={{
                            backgroundGradientFrom: "transparent",
                            backgroundGradientTo: "transparent",
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientToOpacity: 0,
                            fillShadowGradientFrom: colorChartShadowHeight(),
                            fillShadowGradientTo: "rgba(92, 148, 110, 0.4)",
                            fillShadowGradientFromOpacity: 1,
                            fillShadowGradientToOpacity: 0,
                            useShadowColorFromDataset: true,
                            strokeWidth: 2,
                            color: () => "transparent",
                            labelColor: () => "transparent",
                            propsForDots: {
                              r: "0",
                              strokeWidth: "0",
                              stroke: "#FF0000",
                            },
                            style: {
                              borderRadius: 16,
                            },
                            yAxisLabel: "",
                            labelCount: 0,
                          }}
                          withVerticalLabels={false}
                        />
                      </View>
                    ) : (
                      <Text style={[MetricScreenStyles.text__error]}>
                        No data update
                      </Text>
                    )}
                  </View>
                </View>
                {/* BOX */}
                {/* BOX */}
                <View style={[MetricScreenStyles.longbox]}>
                  <View>
                    <View style={[MetricScreenStyles.header_box]}>
                      <IconFontAwesome5
                        name={"percent"}
                        size={15}
                        color={"rgb(118, 164, 187)"}
                      />
                      <Text style={[MetricScreenStyles.header_text]}>Fat</Text>
                    </View>
                    <View
                      style={[
                        MetricScreenStyles.body__box,
                        { marginTop: 5, paddingHorizontal: 5 },
                      ]}
                    >
                      <View style={[MetricScreenStyles.body__data__box]}>
                        <Text style={[MetricScreenStyles.body_text_number]}>
                          {fat}
                        </Text>
                        <Text style={[MetricScreenStyles.body_text_unit]}>
                          %
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      {
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      },
                    ]}
                  >
                    {sortedHistoryFat.length == 7 ? (
                      <View>
                        <LineChart
                          data={fatData}
                          width={180}
                          height={70}
                          chartConfig={{
                            backgroundGradientFrom: "transparent",
                            backgroundGradientTo: "transparent",
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientToOpacity: 0,
                            fillShadowGradientFrom: colorChartShadowFat(),
                            fillShadowGradientTo: "rgba(75, 119, 141, 0.5)",
                            fillShadowGradientFromOpacity: 1,
                            fillShadowGradientToOpacity: 0,
                            useShadowColorFromDataset: true,
                            strokeWidth: 2,
                            color: () => "transparent",
                            labelColor: () => "transparent",
                            propsForDots: {
                              r: "0",
                              strokeWidth: "0",
                              stroke: "#FF0000",
                            },
                            style: {
                              borderRadius: 16,
                            },
                            yAxisLabel: "",
                            labelCount: 0,
                          }}
                          withVerticalLabels={false}
                        />
                      </View>
                    ) : (
                      <Text style={[MetricScreenStyles.text__error]}>
                        No data update
                      </Text>
                    )}
                  </View>
                </View>
                {/* BOX */}
                {/* BOX */}
                <View style={[MetricScreenStyles.longbox]}>
                  <View>
                    <View style={[MetricScreenStyles.header_box]}>
                      <Text style={[MetricScreenStyles.header_text]}>BMI</Text>
                    </View>
                    <View
                      style={[
                        MetricScreenStyles.body__box,
                        { marginTop: 5, paddingHorizontal: 5 },
                      ]}
                    >
                      <View style={[MetricScreenStyles.body__data__box]}>
                        <Text style={[MetricScreenStyles.body_text_number]}>
                          {calBmi()}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      {
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: 115,
                      },
                    ]}
                  >
                    {calculatedBmi != 0 ? (
                      <View
                        style={[
                          {
                            gap: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingRight: 20,
                          },
                        ]}
                      >
                        <IconMaterialCommunityIcons
                          name={getBMIIcon(calculatedBmi)}
                          size={20}
                          color={bmiColor}
                        />
                        <Text
                          style={[
                            {
                              color: bmiColor,
                              fontSize: sizes.size_xs,
                              fontWeight: "bold",
                            },
                          ]}
                        >
                          {getBMIText(calculatedBmi)}
                        </Text>
                        <View style={ProfileScreenStyle.bmiRange}>
                          <View style={ProfileScreenStyle.rangeLabels}>
                            <Text style={ProfileScreenStyle.rangeLabel}>0</Text>
                            <Text style={ProfileScreenStyle.rangeLabel}>
                              18
                            </Text>
                            <Text style={ProfileScreenStyle.rangeLabel}>
                              23
                            </Text>
                            <Text style={ProfileScreenStyle.rangeLabel}>
                              25
                            </Text>
                            <Text style={ProfileScreenStyle.rangeLabel}>
                              30
                            </Text>
                            <Text style={ProfileScreenStyle.rangeLabel}>
                              40
                            </Text>
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
                    ) : (
                      <Text style={[MetricScreenStyles.text__error]}>
                        No data update
                      </Text>
                    )}
                  </View>
                </View>
                {/* BOX */}
                {/* BOX */}
                <View style={[MetricScreenStyles.longbox]}>
                  <View>
                    <View style={[MetricScreenStyles.header_box]}>
                      <Text style={[MetricScreenStyles.header_text]}>
                        Lean Body Mass (LBM)
                      </Text>
                    </View>
                    <View
                      style={[
                        MetricScreenStyles.body__box,
                        { marginTop: 5, paddingHorizontal: 5 },
                      ]}
                    >
                      <View style={[MetricScreenStyles.body__data__box]}>
                        <Text style={[MetricScreenStyles.body_text_number]}>
                          {calLBM()}
                        </Text>
                        <Text style={[MetricScreenStyles.body_text_unit]}>
                          KG
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      {
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      },
                    ]}
                  >
                    {calLBM() != 0 && weight != 0 ? (
                      <View style={[{ paddingRight: 15 }]}>
                        <Text style={[{ fontSize: 60 }]}>{LBMIcon()}</Text>
                      </View>
                    ) : (
                      <Text style={[MetricScreenStyles.text__error]}>
                        No data update
                      </Text>
                    )}
                  </View>
                </View>
                {/* BOX */}
                {/* BOX */}
                <View style={[MetricScreenStyles.longbox]}>
                  <View>
                    <View style={[MetricScreenStyles.header_box]}>
                      <Text style={[MetricScreenStyles.header_text]}>
                        Basal Metabolic Rate (BMR)
                      </Text>
                    </View>
                    <View
                      style={[
                        MetricScreenStyles.body__box,
                        { marginTop: 5, paddingHorizontal: 5 },
                      ]}
                    >
                      <View style={[MetricScreenStyles.body__data__box]}>
                        <Text style={[MetricScreenStyles.body_text_number]}>
                          {calBMR() != 0 && weight!=0 && height !=0 ? calBMR() : <Text>0</Text>}
                        </Text>
                        <Text style={[MetricScreenStyles.body_text_unit]}>
                          Calories/day
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      {
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      },
                    ]}
                  >
                    
                    {calBMR() != 0 && weight!=0 && height !=0 ? (
                      <View style={[{ paddingRight: 20 }]}>
                        <TouchableOpacity onPress={handleBMR}>
                          <IconEntypo
                            name={"info-with-circle"}
                            size={15}
                            color={colors.clr_lightgray}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <Text style={[MetricScreenStyles.text__error]}>
                        No data update
                      </Text>
                    )}
                  </View>
                </View>
                <Modal
                  visible={isModalVisibleBMR}
                  animationType="slide"
                  transparent={true}
                >
                  <View style={[ProfileScreenStyle.box_modal]}>
                    <View
                      style={[MetricScreenStyles.inside_box_modal, { gap: 30 }]}
                    >
                      <View style={[{ gap: 10 }]}>
                        <Text style={[ProfileScreenStyle.modal_header_text]}>
                          BMR Table
                        </Text>
                        <Text
                          style={[
                            ProfileScreenStyle.modal_subtitle,
                            { textAlign: "center", width: 340 },
                          ]}
                        >
                          BMR tells you how many calories your body burns at
                          rest. Use it to guide your daily energy needs.
                        </Text>
                      </View>
                      <View
                        style={[
                          {
                            height: 320,
                            width: 340,
                          },
                        ]}
                      >
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
                            Very intense exercise daily
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

                      <View>
                        <TouchableOpacity
                          style={ProfileScreenStyle.modal_button}
                          onPress={() => setIsModalVisibleBMR(false)}
                        >
                          <Text
                            style={[ProfileScreenStyle.modal__button__text]}
                          >
                            Close
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
                {/* BOX */}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MetricScreen;

const MetricScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goback__button: {
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text__topic: {
    fontSize: sizes.size_3xl,
    color: colors.clr_white,
    fontWeight: "bold",
  },
  text__detail: {
    fontSize: sizes.size_base,
    color: colors.clr_lightgray,
  },
  longbox: {
    borderRadius: 10,
    paddingHorizontal: 20,
    width: "100%",
    height: 100,
    paddingVertical: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4.65,
    // elevation: 8,
    backgroundColor: "rgba(211, 211, 211,0.3)",
  },
  header_box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  header_text: {
    color: colors.clr_lightgray,
    fontSize: sizes.size_xs,
    fontWeight: "bold",
  },
  body__box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  body__data__box: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
  },
  body_text_number: {
    fontSize: sizes.size_3xl,
    color: colors.clr_white,
  },
  body_text_unit: {
    fontSize: sizes.size_xs,
    color: colors.clr_lightgray,
  },
  text__error: {
    fontSize: sizes.size_xs,
    color: colors.clr_lightgray,
  },
  dumbbell_top: {
    position: "absolute",
    top: -20,
    right: 0,
    opacity: 0.1,
    zIndex: 0,
    transform: [{ rotate: "-55deg" }],
  },
  dumbbell_middle: {
    position: "absolute",
    top: 20,
    right: 50,
    opacity: 0.2,
    zIndex: 0,
    transform: [{ rotate: "45deg" }],
  },
  dumbbell_bottom: {
    position: "absolute",
    top: 80,
    right: -10,
    opacity: 0.3,
    zIndex: 0,
    transform: [{ rotate: "-50deg" }],
  },
  inside_box_modal: {
    borderRadius: 10,
    padding: 30,
    width: 315,
    height: 550,

    alignItems: "center",
  },
});
