import * as React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import styles from "../styles/style";
import TimerScreenStyle from "../styles/components/TimerScreenStyle";

export default function HomeScreen({}) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const previousTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current =
        startTimeRef.current ?? Date.now() - previousTimeRef.current;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
      previousTimeRef.current = time;
      startTimeRef.current = null;
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, time]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setLaps([]);
    previousTimeRef.current = 0;
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    } else {
      handleReset();
    }
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={[TimerScreenStyle.container]}>
      <Header />
      <ScrollView style={[TimerScreenStyle.all]}>
        <View style={{ alignItems: "center" }}>
          <Text style={TimerScreenStyle.time}>{formatTime(time)}</Text>
          <View style={TimerScreenStyle.buttonContainer}>
            <TouchableOpacity
              style={TimerScreenStyle.lapButton}
              onPress={handleLap}
            >
              <Text style={TimerScreenStyle.buttonText}>
                {isRunning ? "Lap" : "Reset"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={TimerScreenStyle.startButton}
              onPress={handleStartStop}
            >
              <Text style={TimerScreenStyle.buttonText}>
                {isRunning ? "Stop" : "Start"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[TimerScreenStyle.line]} />

          <View style={TimerScreenStyle.lapsContainer}>
            {laps.map((lap, index) => (
              <View key={index}>
                <Text style={TimerScreenStyle.lapText}>
                  Lap {index + 1}: {formatTime(lap)}
                </Text>
                <View style={[TimerScreenStyle.line]} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
