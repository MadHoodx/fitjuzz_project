import * as React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import GuideScreenStyle from '../styles/components/GuideScreenStyle';
import { useNavigation } from '@react-navigation/native';

export default function CarbScreen() {
  const navigation = useNavigation();
  
  // Example of carb foods (Temp)
  const carbFoods = [
    {
      id: 'rice',
      title: 'ข้าว (Rice)',
      image: 'https://images.pexels.com/photos/4349766/pexels-photo-4349766.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'แหล่งคาร์โบไฮเดรตหลักในอาหารไทย ข้าวขาว 100g มีคาร์โบไฮเดรตประมาณ 28g'
    },
    {
      id: 'pasta',
      title: 'พาสต้า (Pasta)',
      image: 'https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'อาหารที่มีคาร์โบไฮเดรตสูง เหมาะสำหรับนักกีฬา พาสต้า 100g มีคาร์โบไฮเดรตประมาณ 25g'
    },
    {
      id: 'oats',
      title: 'ข้าวโอ๊ต (Oats)',
      image: 'https://images.pexels.com/photos/216951/pexels-photo-216951.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'คาร์โบไฮเดรตเชิงซ้อนที่ย่อยช้า มีใยอาหารสูง ข้าวโอ๊ต 100g มีคาร์โบไฮเดรตประมาณ 66g'
    },
    {
      id: 'fruits',
      title: 'ผลไม้ (Fruits)',
      image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'คาร์โบไฮเดรตธรรมชาติ มีวิตามินและแร่ธาตุ มีน้ำตาลผลไม้และใยอาหาร'
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
          <Text style={GuideScreenStyle.mainTitle}>Carbohydrates</Text>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            คาร์โบไฮเดรตเป็นแหล่งพลังงานหลักของร่างกาย โดยจะถูกย่อยสลายเป็นน้ำตาลกลูโคสซึ่งเซลล์ในร่างกายใช้เป็นเชื้อเพลิงหลัก
            โดยเฉพาะสมองที่ต้องการกลูโคสเพื่อการทำงานอย่างเต็มประสิทธิภาพ
          </Text>
          
          <Text style={styles.subTitle}>ประเภทของคาร์โบไฮเดรต</Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>1. คาร์โบไฮเดรตเชิงเดี่ยว (Simple Carbs):</Text>{'\n'}
            • ย่อยและดูดซึมเร็ว ให้พลังงานอย่างรวดเร็ว{'\n'}
            • พบในน้ำตาล น้ำผึ้ง ผลไม้ นม และผลิตภัณฑ์แปรรูป{'\n'}
            {'\n'}
            <Text style={styles.boldText}>2. คาร์โบไฮเดรตเชิงซ้อน (Complex Carbs):</Text>{'\n'}
            • ย่อยช้ากว่า ให้พลังงานอย่างสม่ำเสมอ{'\n'}
            • พบในธัญพืช พืชหัว ถั่ว และผักที่มีแป้ง
          </Text>
        </View>
        
        <Text style={styles.subTitle}>แหล่งคาร์โบไฮเดรตที่ดีต่อสุขภาพ</Text>
        
        {carbFoods.map((food) => (
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
          <Text style={styles.subTitle}>คาร์โบไฮเดรตกับการออกกำลังกาย</Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>ก่อนออกกำลังกาย:</Text>{'\n'}
            การบริโภคคาร์โบไฮเดรตเชิงซ้อน 1-3 ชั่วโมงก่อนออกกำลังกายช่วยเพิ่มพลังงานและประสิทธิภาพ
            {'\n\n'}
            <Text style={styles.boldText}>ระหว่างออกกำลังกาย:</Text>{'\n'}
            สำหรับการออกกำลังกายที่ใช้เวลานาน (มากกว่า 60 นาที) ควรเติมคาร์โบไฮเดรตเชิงเดี่ยวที่ย่อยง่าย
            {'\n\n'}
            <Text style={styles.boldText}>หลังออกกำลังกาย:</Text>{'\n'}
            การบริโภคคาร์โบไฮเดรตร่วมกับโปรตีนภายใน 30 นาทีหลังออกกำลังกายช่วยในการฟื้นฟูกล้ามเนื้อและเติมไกลโคเจน
          </Text>
          
          <Text style={styles.subTitle}>ปริมาณที่แนะนำต่อวัน</Text>
          <Text style={styles.infoText}>
            ผู้ใหญ่ทั่วไปควรบริโภคคาร์โบไฮเดรต 45-65% ของแคลอรี่ทั้งหมดต่อวัน สำหรับนักกีฬาที่มีการฝึกซ้อมเข้มข้น อาจต้องการ 5-10 กรัมต่อน้ำหนักตัว 1 กิโลกรัมต่อวัน ขึ้นอยู่กับความเข้มข้นของการฝึกซ้อม
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
  boldText: {
    fontWeight: 'bold',
    color: 'white',
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