import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles, { sizes, colors } from "../styles/style";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";

const data = [50, 10, 40, 95, 85, 91, 35, 53, 24, 50];

const MetricScreen = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [fat, setFat] = useState(0);
  const [sex, setSex] = useState(null);
  const [age, setAge] = useState(0);
  const [hisWeight, setHisWeight] = useState([]);
  const [hisHeight, setHisHeight] = useState([])
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
      const { weight, height, fat, sex, age, weightHistory, heightHistory } = response.data;
      setWeight(weight);
      setHeight(height);
      setFat(fat);
      setSex(sex);
      setAge(age);
      setHisWeight(weightHistory);
      setHisHeight(heightHistory);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const calLBM = () => {
    if (sex === "male" && fat == 0) {
      const lbm = 0.407 * weight + 0.267 * height - 19.2;
      return lbm;
    } else if (sex === "female" && fat == 0) {
      const lbm = 0.252 * weight + 0.473 * height - 48.3;
      return lbm;
    } else {
      const lbm = weight - weight * fat;
      return lbm;
    }
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
  const latestWeightHistory = hisWeight.slice(-7);
  const latestHeightHistory = hisHeight.slice(-7);
  const sortedHistoryWeight =
    latestWeightHistory.length > 0
      ? latestWeightHistory.sort((a, b) => new Date(a.date) - new Date(b.date))
      : [];
  const sortedHistoryHeight =
    latestHeightHistory.length > 0
      ? latestHeightHistory.sort((a, b) => new Date(a.date) - new Date(b.date))
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

  const chartHeights =
    sortedHistoryHeight.length > 0
      ? sortedHistoryHeight.map((entry) => entry.height)
      : [0, 0, 0, 0, 0];

  const weightData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartWeights,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };
  const heightData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartHeights,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };
  const handleBack = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={[MetricScreenStyles.container]}>
      <ScrollView style={[styles.container]}>
        <View style={[{ paddingTop: 20, gap: 40 }]}>
          <View>
            <TouchableOpacity
              style={[MetricScreenStyles.goback__button]}
              onPress={handleBack}
            >
              <IconMaterialIcons
                name={"arrow-back-ios-new"}
                size={30}
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
              <Text>All Metric</Text>
            </View>
            <View style={[{ gap: 5 }]}>
              {/* BOX */}
              <View
                style={[
                  MetricScreenStyles.longbox,
                  { backgroundColor: "rgba(58, 80, 107, 0.6)" },
                ]}
              >
                <View>
                  <View style={[MetricScreenStyles.header_box]}>
                    <Text style={[MetricScreenStyles.header_text]}>Weight</Text>
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
                        fillShadowGradientFrom: "transparent",
                        fillShadowGradientTo: "transparent",
                        fillShadowGradientFromOpacity: 0,
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
                </View>
              </View>
              {/* BOX */}
              {/* BOX */}
              <View
                style={[
                  MetricScreenStyles.longbox,
                  { backgroundColor: "rgba(92, 148, 110, 0.6)" },
                ]}
              >
                <View>
                  <View style={[MetricScreenStyles.header_box]}>
                    <Text style={[MetricScreenStyles.header_text]}>Height</Text>
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
                        fillShadowGradientFrom: "transparent",
                        fillShadowGradientTo: "transparent",
                        fillShadowGradientFromOpacity: 0,
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
                </View>
              </View>
              {/* BOX */}
              
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
  },
  header_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontSize: sizes.size_3xs,
    color: colors.clr_lightgray,
  },
});
