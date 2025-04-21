import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/style";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

const ExerciseDetailsModal = ({ visible, exercise, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Render slide items (รูปภาพท่า และ รูปภาพกล้ามเนื้อ)
  const renderImageItem = ({ item, index }) => {
    console.log("Rendering image item", index);
    console.log("Details available:", details ? "Yes" : "No");
    if (details) {
      console.log("Picture1:", details.picture1);
      console.log("Picture2:", details.picture2);
    }

    return (
      <View style={[styles.slideItemContainer, { width: width * 0.85 }]}>
        <Image
          source={{
            uri:
              index === 0
                ? details?.picture1 ||
                  exercise?.picture ||
                  getDefaultImageByCategory()
                : details?.picture2 || getMuscleImageUrl(),
          }}
          style={styles.slideImage}
          resizeMode="contain"
        />
      </View>
    );
  };

  // รูปเริ่มต้นสำหรับหน้าแรกตาม category
  const getDefaultImageByCategory = () => {
    const defaultImages = {
      chest: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955",
      back: "https://images.unsplash.com/photo-1594381898411-846e7d193883",
      shoulders: "https://images.unsplash.com/photo-1581122584612-713f89daa8eb",
      arms: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
      legs: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a",
      core: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955",
    };

    const category = exercise?.category?.toLowerCase() || "chest";
    return defaultImages[category] || defaultImages["chest"];
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (width * 0.85));
    setCurrentIndex(index);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />

      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackground}>
            <BlurView
              intensity={Platform.OS === "ios" ? 100 : 140}
              tint="dark"
              style={{ ...StyleSheet.absoluteFillObject }}
            />
          </View>
        </TouchableWithoutFeedback>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.clr_brightblue} />
              <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={retry}>
                <Text style={styles.retryButtonText}>ลองอีกครั้ง</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* ชื่อท่าออกกำลังกาย */}
              <View style={styles.titleContainer}>
                <Text style={styles.exerciseName}>
                  {exercise?.name || "ท่าออกกำลังกาย"}
                </Text>
              </View>

              {/* Image Carousel */}
              <View style={styles.imageCard}>
            
                <View
                  style={[styles.slideItemContainer, { width: width * 0.85 }]}
                >
                  <Image
                    source={{
                      uri:exercise.gifUrl
                        
                    }}
                    style={styles.slideImage}
                    resizeMode="contain"
                  />
                </View>
              </View>

             

              {/* Muscles Worked Card */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Muscles worked</Text>
                <View style={styles.musclesContainer}>
                  <View style={styles.muscleColumn}>
                    <Text style={styles.muscleColumnTitle}>Primary</Text>
                    <Text style={styles.muscleText}>{exercise.target}</Text>
                    {/* {exercise.target.map((muscle, index) => (
                      <Text key={index} style={styles.muscleText}>
                        {muscle}
                      </Text>
                    ))} */}
                    {/* {Array.isArray(getMusclesWorked().primary) ? (
                      getMusclesWorked().primary.map((muscle, index) => (
                        <Text key={index} style={styles.muscleText}>{muscle}</Text>
                      ))
                    ) : (
                      <Text style={styles.muscleText}>{getMusclesWorked().primary}</Text>
                    )} */}
                  </View>

                  <View style={styles.muscleColumn}>
                    <Text style={styles.muscleColumnTitle}>Secondary</Text>
                    {exercise.secondaryMuscles.map((muscle, index) => (
                      <Text key={index} style={styles.muscleText}>
                        {muscle}
                      </Text>
                    ))}
                    {/* {Array.isArray(getMusclesWorked().secondary) ? (
                      exercise.secondaryMuscles.map((muscle, index) => (
                        <Text key={index} style={styles.muscleText}>{muscle}</Text>
                      ))
                    ) : (
                      <Text style={styles.muscleText}>{getMusclesWorked().secondary}</Text>
                    )} */}
                  </View>
                </View>
              </View>

              {/* Instructions Card */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Instructions</Text>
                <View style={styles.instructionsContainer}>
                  {exercise.instructions.map((step, index) => (
                    <View key={index} style={styles.instructionStep}>
                      <Text style={styles.instructionText}>
                        {index + 1}. {step}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Close Button */}
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  overlayEffect: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(30, 30, 60, 0.2)",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  glowEffect1: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    top: "15%",
    left: "10%",
    backgroundColor: "rgba(100, 100, 255, 0.12)",
    opacity: 0.85,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
  },
  glowEffect2: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    bottom: "20%",
    right: "15%",
    backgroundColor: "rgba(80, 80, 200, 0.1)",
    opacity: 0.85,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
  },
  glowEffect3: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    bottom: "50%",
    left: "40%",
    backgroundColor: "rgba(120, 120, 255, 0.08)",
    opacity: 0.7,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: "7.5%",
  },
  titleContainer: {
    marginBottom: 10,
    padding: 15,
    width: "100%",
  },
  exerciseName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  imageCard: {
    backgroundColor: "transparent",
    borderRadius: 15,
    overflow: "hidden",
    width: "100%",
    marginBottom: 25,
  },
  carousel: {
    width: "100%",
  },
  slideItemContainer: {
    height: width * 0.9,
    overflow: "hidden",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
  },
  slideImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    borderRadius: 15,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: -20,
    marginBottom: 10,
    zIndex: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    width: "100%",
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  musclesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  muscleColumn: {
    flex: 1,
  },
  muscleColumnTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
  },
  muscleText: {
    fontSize: 15,
    color: "#666",
    marginBottom: 5,
  },
  instructionsContainer: {},
  instructionStep: {
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },
  loadingContainer: {
    padding: 30,
    backgroundColor: "white",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    padding: 30,
    backgroundColor: "white",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: colors.clr_brightblue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  closeButtonText: {
    color: "#333",
    fontWeight: "500",
    fontSize: 16,
  },
  topEdge: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  glowingLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  bottomGlow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  modalContent: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});

export default ExerciseDetailsModal;
