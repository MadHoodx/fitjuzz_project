import * as React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import GuideScreenStyle from '../styles/components/GuideScreenStyle';
import { useNavigation } from '@react-navigation/native';

export default function ProteinScreen() {
  const navigation = useNavigation();
  
  // ตัวอย่างอาหารที่มีโปรตีนสูง
  const proteinFoods = [
    {
      id: 'chicken',
      title: 'อกไก่ (Chicken Breast)',
      image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'โปรตีนคุณภาพสูง ไขมันต่ำ ประมาณ 26g โปรตีนต่อ 100g'
    },
    {
      id: 'eggs',
      title: 'ไข่ (Eggs)',
      image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'โปรตีนที่ย่อยง่าย ประมาณ 6g โปรตีนต่อฟอง มีกรดอะมิโนที่จำเป็นครบถ้วน'
    },
    {
      id: 'fish',
      title: 'ปลา (Fish)',
      image: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'โปรตีนคุณภาพดี มีไขมันดี Omega-3 ประมาณ 20g โปรตีนต่อ 100g'
    },
    {
      id: 'tofu',
      title: 'เต้าหู้ (Tofu)',
      image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'โปรตีนจากพืชที่ดีสำหรับมังสวิรัติ ประมาณ 8g โปรตีนต่อ 100g'
    },
  ];

  return (
    <View style={GuideScreenStyle.container}>
      <Header />
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      
      <ScrollView 
        style={GuideScreenStyle.content} 
        contentContainerStyle={GuideScreenStyle.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={GuideScreenStyle.titleSection}>
          <Text style={GuideScreenStyle.mainTitle}>Protein</Text>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            โปรตีนเป็นสารอาหารที่จำเป็นสำหรับการสร้างและซ่อมแซมเนื้อเยื่อ รวมถึงกล้ามเนื้อ ผิวหนัง และเอ็นต่างๆ 
            โปรตีนประกอบด้วยกรดอะมิโน ซึ่งเป็นส่วนประกอบพื้นฐานที่สำคัญสำหรับการทำงานของเซลล์ในร่างกาย
          </Text>
          
          <Text style={styles.subTitle}>ประโยชน์ของโปรตีน</Text>
          <Text style={styles.infoText}>
            • ช่วยในการสร้างและซ่อมแซมกล้ามเนื้อ{'\n'}
            • เสริมสร้างภูมิคุ้มกัน{'\n'}
            • ทำให้รู้สึกอิ่มนานกว่า{'\n'}
            • ช่วยในการสร้างเอนไซม์และฮอร์โมน
          </Text>
        </View>
        
        <Text style={styles.subTitle}>แหล่งโปรตีนคุณภาพดี</Text>
        
        {proteinFoods.map((food) => (
          <View key={food.id} style={styles.foodCard}>
            <Image
              source={{ uri: food.image }}
              style={styles.foodImage}
            />
            <View style={styles.foodInfo}>
              <Text style={styles.foodTitle}>{food.title}</Text>
              <Text style={styles.foodDescription}>{food.description}</Text>
            </View>
          </View>
        ))}
        
        <View style={styles.infoSection}>
          <Text style={styles.subTitle}>ปริมาณที่แนะนำต่อวัน</Text>
          <Text style={styles.infoText}>
            ผู้ใหญ่ทั่วไปควรบริโภคโปรตีนประมาณ 0.8g ต่อน้ำหนักตัว 1 กิโลกรัม นักกีฬาหรือผู้ที่ออกกำลังกายหนักควรบริโภคมากขึ้น 1.2-2.0g ต่อน้ำหนักตัว 1 กิโลกรัม โดยเฉพาะในช่วงที่ต้องการสร้างกล้ามเนื้อ
          </Text>
          
          <Text style={styles.subTitle}>โปรตีนเวย์ (Whey Protein)</Text>
          <Text style={styles.infoText}>
            เป็นโปรตีนที่สกัดจากนมวัว ย่อยง่ายและดูดซึมเร็ว เหมาะสำหรับทานหลังออกกำลังกายเพื่อฟื้นฟูกล้ามเนื้อ มีกรดอะมิโนจำเป็นครบถ้วน โดยเฉพาะ BCAAs ที่สำคัญต่อการฟื้นฟูและสร้างกล้ามเนื้อ
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15,
    padding: 8,
    zIndex: 10,
  },
  infoSection: {
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  subTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 5,
  },
  foodCard: {
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  foodImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  foodInfo: {
    padding: 15,
  },
  foodTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  foodDescription: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
  }
}); 