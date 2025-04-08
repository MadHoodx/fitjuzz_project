import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg"; // Used to draw circular shapes
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated"; // For smooth animations
import { colors,sizes } from "../styles/style"; // Custom color palette
import { useNavigation } from "@react-navigation/native"; // Optional navigation (not used directly here)

// Create an animated version of the Circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// Main timer component
const CircularTimer = ({ duration = 200, setNextExercise }) => {
  const navigation = useNavigation(); // Optional - not currently used
  const [timeLeft, setTimeLeft] = useState(duration); // Remaining seconds
  const progress = useSharedValue(1); // Animation progress from 1 (full circle) to 0 (empty)

  // Timer configuration
  const radius = 100;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius; // Needed for circular progress

  // Timer logic - runs once and updates every second
  useEffect(() => {
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // Stop timer when it reaches 0
          return 0;
        }
        return prev - 1;
      });

      // Animate progress ring on each second tick
      progress.value = withTiming((timeLeft - 1) / duration, {
        duration: 1000,
        easing: Easing.linear,
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [timeLeft]);

  // Animated props for the circle - makes the stroke move
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value), // Animate stroke based on progress
  }));

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      {/* Circle timer visual */}
      <Svg width={280} height={280} viewBox="0 0 240 240">
        {/* Background circle (gray) */}
        <Circle
          cx="120"
          cy="120"
          r={radius}
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated foreground circle */}
        <AnimatedCircle
          cx="120"
          cy="120"
          r={radius}
          stroke={colors.clr_brightblue}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform="rotate(90 120 120)" // Makes the stroke start from the top
        />
      </Svg>

      {/* Timer display and restart button */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>

        {/* Restart button */}
        <TouchableOpacity
          style={styles.restartButton}
          onPress={() => {
            setTimeLeft(duration); // Reset time
            progress.value = withTiming(1, { duration: 500 }); // Reset progress animation
          }}
        >
          <Text style={styles.restartIcon}>⟲</Text>
        </TouchableOpacity>
      </View>

      {/* Continue button */}
      <TouchableOpacity style={styles.continueButton} onPress={setNextExercise}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  timeContainer: {
    position: "absolute",
    top: "35%",
    alignItems: "center",
  },
  timeText: {
    fontSize: 44,
    fontWeight: "600",
    color: colors.clr_white,
  },
  restartButton: {
    marginTop: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.clr_brightblue,
    alignItems: "center",
    justifyContent: "center",
  },
  restartIcon: {
    fontSize: 20,
    color: "#fff",
    lineHeight: 22,
    textAlign: "center",
  },
  continueButton: {
    width: "60%",
    backgroundColor: colors.clr_black,
    borderRadius: 100,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 50,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },


  
exerciseTitle: {
  fontWeight: "bold",
  fontSize: sizes.size_xl,
  color: colors.clr_black,
},

inputLabel: {
  fontWeight: "bold",
  fontSize: sizes.size_base,
  color: colors.clr_black,
},

divider: {
  borderWidth: 1,
  borderColor: colors.clr_gray,
  marginVertical: 6,
},

inputRowWrapper: {
  alignItems: "center",
  marginTop: 16,
},

inputRow: {
  flexDirection: "row",
  alignItems: "center",
},

textInput: {
  textAlign: "center",
  fontSize: sizes.size_base,
  color: colors.clr_black,
  width: 100,
  marginHorizontal: 20,
},

inputUnderline: {
  borderWidth: 1,
  borderColor: colors.clr_gray,
  width: "30%",
  marginTop: 10,
},

errorText: {
  color: "red",
  marginTop: 10,
},

bottomButtonWrapper: {
  alignItems: "center",
  marginVertical: 16,
}
});

export default CircularTimer;
