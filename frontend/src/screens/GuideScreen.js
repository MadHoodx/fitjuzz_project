import * as React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import GuideScreenStyle from '../styles/components/GuideScreenStyle';
import { useNavigation } from '@react-navigation/native';

export default function GuideScreen() {
  const navigation = useNavigation();
  
  // categories
  const categories = [
    {
      id: 'exercise',
      title: 'Exercise',
      image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      screen: 'Exercise'
    },
    {
      id: 'protein',
      title: 'protein',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      screen: 'Home'
    },
    {
      id: 'food',
      title: 'Macros',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      screen: 'Home'
    },
    {
      id: 'supplement',
      title: 'Supplements',
      image: 'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      screen: 'Home'
    },
    {
      id: 'medicine',
      title: 'Para500',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1130&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      screen: 'Home'
    },
  ];

  return (
    <View style={GuideScreenStyle.container}>
      <Header />
      <ScrollView 
        style={GuideScreenStyle.content} 
        contentContainerStyle={GuideScreenStyle.contentContainer}
        showsVerticalScrollIndicator={false}
      >
{/* 
        <View style={GuideScreenStyle.titleSection}>
          <Text style={GuideScreenStyle.mainTitle}>Manual</Text>
        </View> */}

        
        {categories.map((category) => (
          <TouchableOpacity 
            key={category.id}
            style={GuideScreenStyle.categoryCard}
            onPress={() => navigation.navigate(category.screen)}
          >
            <Image
              source={{ uri: category.image }}
              style={GuideScreenStyle.categoryImage}
            />
            <View style={GuideScreenStyle.categoryOverlay}>
              <Text style={GuideScreenStyle.categoryTitle}>{category.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
} 