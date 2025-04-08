import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ExerciseScreenStyle from "../styles/components/ExerciseScreenStyle";
import SteroidDetailsModal from "../components/SteroidDetailsModal";

export default function SteroidsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredSteroids, setFilteredSteroids] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSteroid, setSelectedSteroid] = useState([]);

  const categories = ["All", "Anabolic", "Oral", "Injectable"];

  // Fetch steroid data from API
  useEffect(() => {
    fetchSteroids();
  }, []);

  const fetchSteroids = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/getSteroidDetails`
      );
      setSelectedSteroid(response.data); // Set the fetched steroids data
      setFilteredSteroids(response.data); // Set the filtered list to the fetched data initially
    } catch (error) {
      console.error("Error fetching steroids:", error);
    }
  };

  const openSteroidDetails = (steroid) => {
    setSelectedSteroid(steroid);
    setModalVisible(true);
  };

  const closeSteroidDetails = () => {
    setModalVisible(false);
    setSelectedSteroid(null); // Clear the selected steroid data when closing
  };

  useEffect(() => {
    filterSteroids();
  }, [selectedCategory, searchQuery]);

  const filterSteroids = () => {
    let filtered = [...selectedSteroid];

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (steroid) => steroid.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((steroid) =>
        steroid.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSteroids(filtered);
  };

  return (
    <View style={[ExerciseScreenStyle.container]}>
      <View style={[ExerciseScreenStyle.content]}>
        <View style={ExerciseScreenStyle.searchSection}>
          <View style={ExerciseScreenStyle.searchBar}>
            <TextInput
              style={ExerciseScreenStyle.searchInput}
              placeholder="Search Steroids"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Ionicons
              name="search"
              size={20}
              color="gray"
              style={ExerciseScreenStyle.searchIcon}
            />
          </View>
        </View>

        <View style={ExerciseScreenStyle.categoriesWrapper}>
          <View style={ExerciseScreenStyle.categoriesRow}>
            {categories.slice(0, 5).map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  ExerciseScreenStyle.categoryButton,
                  selectedCategory === category && ExerciseScreenStyle.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    ExerciseScreenStyle.categoryText,
                    selectedCategory === category && ExerciseScreenStyle.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ScrollView style={ExerciseScreenStyle.exerciseList} showsVerticalScrollIndicator={false}>
          {filteredSteroids.map((steroid) => (
            <TouchableOpacity
              key={steroid._id}
              style={ExerciseScreenStyle.exerciseItem}
              onPress={() => openSteroidDetails(steroid)}
            >
              <Image
                source={{
                  uri:
                    "https://images.squarespace-cdn.com/content/v1/64c8035f53e9a56246c7c294/1723420893761-XYJVWOXL91SW5442P6RM/maxresdefault-29-1024x576.jpg",
                }}
                style={ExerciseScreenStyle.exerciseImage}
              />
              <View style={ExerciseScreenStyle.exerciseInfo}>
                <Text style={ExerciseScreenStyle.exerciseName}>{steroid.name}</Text>
              </View>
              <TouchableOpacity
                style={ExerciseScreenStyle.infoButton}
                onPress={() => openSteroidDetails(steroid)}
              >
                <Ionicons name="information-circle-outline" size={24} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>

      {modalVisible && selectedSteroid && (
        <SteroidDetailsModal
          visible={modalVisible}
          steroid={selectedSteroid}
          onClose={closeSteroidDetails}
        />
      )}
    </View>
  );
}
