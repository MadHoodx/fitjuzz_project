import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Header from '../components/Header';
import ExerciseScreenStyle from '../styles/components/ExerciseScreenStyle';
import ExerciseDetailsModal from '../components/ExerciseDetailsModal';

export default function ExerciseScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const categories = ['All', 'Leg', 'ABS', 'Back', 'Arms', 'Shoulders', 'Glutes'];

  const openExerciseDetails = (exercise) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
  };

  const closeExerciseDetails = () => {
    setModalVisible(false);
    setSelectedExercise(null); // Clear the selected exercise data when closing 
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    filterExercises();
  }, [selectedCategory, searchQuery, exercises]);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/getExercises`
      );
      setExercises(response.data);
      setLoading(false);
    } catch (err) {
      setError('Unable to fetch exercises');
      setLoading(false);
      console.error('Error fetching exercises:', err);
    }
  };

  const filterExercises = () => {
    let filtered = [...exercises];
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        exercise => exercise.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        exercise => exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredExercises(filtered);
  };

  // Group exercises by first letter
  const groupExercisesByFirstLetter = () => {
    const groups = {};
    
    filteredExercises.forEach(exercise => {
      const firstLetter = exercise.name.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(exercise);
    });
    
    return Object.keys(groups).sort().map(letter => ({
      letter,
      exercises: groups[letter]
    }));
  };

  const exerciseGroups = groupExercisesByFirstLetter();

  return (
    <View style={[ExerciseScreenStyle.container]}>
{/*     
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
       */}
      <View style={[ExerciseScreenStyle.content]}>
        <View style={ExerciseScreenStyle.searchSection}>
          {/* <Text style={ExerciseScreenStyle.sectionTitle}>EXERCISE</Text> */}
          <View style={ExerciseScreenStyle.searchBar}>
            <TextInput
              style={ExerciseScreenStyle.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Ionicons name="search" size={20} color="gray" style={ExerciseScreenStyle.searchIcon} />
          </View>
        </View>

        <View style={ExerciseScreenStyle.categoriesWrapper}>
          <View style={ExerciseScreenStyle.categoriesRow}>
            {categories.slice(0, 5).map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  ExerciseScreenStyle.categoryButton,
                  selectedCategory === category && ExerciseScreenStyle.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text 
                  style={[
                    ExerciseScreenStyle.categoryText,
                    selectedCategory === category && ExerciseScreenStyle.categoryTextActive
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={[ExerciseScreenStyle.categoriesRow, {justifyContent: 'center'}]}>
            {categories.slice(5).map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  ExerciseScreenStyle.categoryButton,
                  selectedCategory === category && ExerciseScreenStyle.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text 
                  style={[
                    ExerciseScreenStyle.categoryText,
                    selectedCategory === category && ExerciseScreenStyle.categoryTextActive
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {loading ? (
          <Text style={ExerciseScreenStyle.loadingText}>Loading...</Text>
        ) : error ? (
          <Text style={ExerciseScreenStyle.errorText}>{error}</Text>
        ) : (
          <ScrollView 
            style={ExerciseScreenStyle.exerciseList}
            showsVerticalScrollIndicator={false}
          >
            {exerciseGroups.map(group => (
              <View key={group.letter}>
                <Text style={ExerciseScreenStyle.sectionHeader}>
                  {group.letter}
                </Text>
                {group.exercises.map(exercise => (
                  <TouchableOpacity 
                    key={exercise._id} 
                    style={ExerciseScreenStyle.exerciseItem}
                    onPress={() => openExerciseDetails(exercise)}
                  >
                    <Image 
                      source={{uri: exercise.picture || 'https://images.squarespace-cdn.com/content/v1/64c8035f53e9a56246c7c294/1723420893761-XYJVWOXL91SW5442P6RM/maxresdefault-29-1024x576.jpg'}} 
                      style={ExerciseScreenStyle.exerciseImage}
                    />
                    <View style={ExerciseScreenStyle.exerciseInfo}>
                      <Text style={ExerciseScreenStyle.exerciseName}>
                        {exercise.name}
                      </Text>
                      <Text style={ExerciseScreenStyle.exerciseCategory}>
                        {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
                      </Text>
                    </View>
                    <TouchableOpacity 
                      style={ExerciseScreenStyle.infoButton}
                      onPress={() => openExerciseDetails(exercise)}
                    >
                      <Ionicons name="information-circle-outline" size={24} color="white" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
            <View style={{height: 20}} />
          </ScrollView>
        )}
      </View>

      {modalVisible && selectedExercise && (
        <ExerciseDetailsModal
          visible={modalVisible}
          exercise={selectedExercise}
          onClose={closeExerciseDetails}
        />
      )}
    </View>
  );
}

