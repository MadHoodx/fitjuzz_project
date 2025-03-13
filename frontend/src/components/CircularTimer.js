import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { colors } from "../styles/style";
import { useNavigation } from "@react-navigation/native";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularTimer = ({ duration = 200, setNextExercise }) => {
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(duration);
  const progress = useSharedValue(1); // Animation progress from 1 to 0
  const radius = 80;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });

      // Animate progress from 1 to 0
      progress.value = withTiming((timeLeft - 1) / duration, {
        duration: 1000,
        easing: Easing.linear,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value), // Reverse direction
  }));

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Svg width={300} height={300} viewBox="0 0 200 200">
        {/* Background Circle */}
        <Circle
          cx="100"
          cy="100"
          r={radius}
          stroke="lightgray"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Animated Progress Circle (Starts from top, moves reverse clockwise) */}
        <AnimatedCircle
          cx="100"
          cy="100"
          r={radius}
          stroke="orange"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform="rotate(90 100 100)" // Start from top
        />
      </Svg>

      <View
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: [{ translateX: -40 }, { translateY: -40 }], // Adjust for perfect centering
          alignItems: "center",
        }}
      >
        {/* Timer Display */}
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "orange",
          }}
        >
          {`${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
            .toString()
            .padStart(2, "0")}`}
        </Text>

        {/* Restart Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            marginTop: 5,
          }}
          onPress={() => {
            setTimeLeft(duration);
            progress.value = withTiming(1, { duration: 500 });
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Restart</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={CircularTimerStyle.button} onPress={setNextExercise}>
        <Text style={CircularTimerStyle.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const CircularTimerStyle = StyleSheet.create({
  button: {
    width: "50%",
    backgroundColor: colors.clr_black,
    borderRadius: 20,
    paddingVertical: 12,
    elevation: 24,
    marginVertical: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CircularTimer;
