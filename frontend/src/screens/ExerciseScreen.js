import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import ExerciseScreenStyle from '../styles/components/ExerciseScreenStyle';

export default function HomeScreen({}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Leg', 'ABS', 'Back', 'Arms', 'Shoulders', 'Glutes'];

  return (
    <View style={[ExerciseScreenStyle.container]}>
      <Header />
      <View style={[ExerciseScreenStyle.content]}>
        <View style={ExerciseScreenStyle.searchSection}>
          <Text style={ExerciseScreenStyle.sectionTitle}>EXERCISE</Text>
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
      </View>
    </View>
  );
}
