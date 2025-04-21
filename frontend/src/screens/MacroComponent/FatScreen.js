import * as React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import GuideScreenStyle from '../../styles/components/GuideScreenStyle';
import { useNavigation } from '@react-navigation/native';

export default function FatScreen() {
  const navigation = useNavigation();
  
  // example of healthy fats
  const healthyFats = [
    {
      id: 'avocado',
      title: 'อะโวคาโด (Avocado)',
      image: 'https://images.pexels.com/photos/2228553/pexels-photo-2228553.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'อุดมไปด้วยไขมันไม่อิ่มตัวเชิงเดี่ยว อะโวคาโดครึ่งลูกมีไขมันประมาณ 15 กรัม ช่วยลดคอเลสเตอรอลที่ไม่ดีและเพิ่มคอเลสเตอรอลที่ดี'
    },
    {
      id: 'nuts',
      title: 'ถั่วและเมล็ดพืช (Nuts & Seeds)',
      image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'มีไขมันไม่อิ่มตัว โอเมก้า-3 และวิตามินอี ถั่วต่างๆ 30 กรัมมีไขมันประมาณ 15 กรัม ช่วยในเรื่องการอักเสบและสุขภาพหัวใจ'
    },
    {
      id: 'oliveoil',
      title: 'น้ำมันมะกอก (Olive Oil)',
      image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking.jpg?auto=compress&cs=tinysrgb&w=800',
      description: 'อุดมไปด้วยกรดไขมันไม่อิ่มตัวเชิงเดี่ยว มีสารต้านอนุมูลอิสระ 1 ช้อนโต๊ะมีไขมันประมาณ 14 กรัม'
    },
    {
      id: 'fish',
      title: 'ปลามัน (Fatty Fish)',
      image: 'https://images.pexels.com/photos/3296434/pexels-photo-3296434.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'ปลาแซลมอน ปลาทูน่า ปลาแมคเคอเรล อุดมไปด้วยกรดไขมันโอเมก้า-3 ซึ่งมีประโยชน์ต่อสมองและหัวใจ'
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
          <Text style={GuideScreenStyle.mainTitle}>Healthy Fats</Text>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            ไขมันเป็นสารอาหารที่จำเป็นต่อร่างกาย ไม่ใช่สิ่งที่ควรหลีกเลี่ยงทั้งหมด ไขมันมีหน้าที่สำคัญหลายอย่าง เช่น
            เป็นแหล่งพลังงานสำรอง ช่วยในการดูดซึมวิตามินที่ละลายในไขมัน (A, D, E, K) และเป็นส่วนประกอบของผนังเซลล์
          </Text>
          
          <Text style={styles.subTitle}>ประเภทของไขมัน</Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>1. ไขมันไม่อิ่มตัว (Unsaturated Fats):</Text>{'\n'}
            • ไขมันไม่อิ่มตัวเชิงเดี่ยว (Monounsaturated) - พบในน้ำมันมะกอก อะโวคาโด ถั่ว{'\n'}
            • ไขมันไม่อิ่มตัวเชิงซ้อน (Polyunsaturated) - พบในน้ำมันพืช ปลา เมล็ดพืช{'\n'}
            • กรดไขมันโอเมก้า-3 - พบในปลาทะเล เมล็ดเจีย เมล็ดแฟลกซ์{'\n'}
            {'\n'}
            <Text style={styles.boldText}>2. ไขมันอิ่มตัว (Saturated Fats):</Text>{'\n'}
            • พบในเนื้อสัตว์ นมและผลิตภัณฑ์จากนม น้ำมันมะพร้าว{'\n'}
            • ควรจำกัดปริมาณการบริโภค แต่ไม่จำเป็นต้องงดทั้งหมด{'\n'}
            {'\n'}
            <Text style={styles.boldText}>3. ไขมันทรานส์ (Trans Fats):</Text>{'\n'}
            • เกิดจากกระบวนการเติมไฮโดรเจนในน้ำมันพืช{'\n'}
            • พบในอาหารแปรรูป เบเกอรี่ อาหารทอด{'\n'}
            • ควรหลีกเลี่ยงเนื่องจากเพิ่มความเสี่ยงต่อโรคหัวใจ
          </Text>
        </View>
        
        <Text style={styles.subTitle}>แหล่งไขมันที่ดีต่อสุขภาพ</Text>
        
        {healthyFats.map((fat) => (
          <View key={fat.id} style={styles.foodCard}>
            <Image
              source={{ uri: fat.image }}
              style={styles.foodImage}
            />
            <View style={styles.foodInfo}>
              <Text style={styles.foodTitle}>{fat.title}</Text>
              <Text style={styles.foodDescription}>{fat.description}</Text>
            </View>
          </View>
        ))}
        
        <View style={styles.infoSection}>
          <Text style={styles.subTitle}>ไขมันกับการออกกำลังกาย</Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>• ไขมันเป็นแหล่งพลังงานสำคัญ:</Text>{'\n'}
            ระหว่างการออกกำลังกายที่มีความเข้มข้นต่ำถึงปานกลาง ร่างกายจะใช้ไขมันเป็นแหล่งพลังงานหลัก โดยเฉพาะหลังจากออกกำลังกายไปแล้ว 20 นาทีขึ้นไป
            {'\n\n'}
            <Text style={styles.boldText}>• ไขมันช่วยในการฟื้นฟู:</Text>{'\n'}
            กรดไขมันโอเมก้า-3 มีคุณสมบัติต้านการอักเสบ ช่วยลดการอักเสบของกล้ามเนื้อหลังการออกกำลังกายหนัก
            {'\n\n'}
            <Text style={styles.boldText}>• ฮอร์โมนจากไขมัน:</Text>{'\n'}
            ไขมันจำเป็นต่อการผลิตฮอร์โมนหลายชนิด รวมถึงฮอร์โมนเทสโทสเตอโรนซึ่งมีบทบาทสำคัญในการสร้างกล้ามเนื้อ
          </Text>
          
          <Text style={styles.subTitle}>ปริมาณที่แนะนำต่อวัน</Text>
          <Text style={styles.infoText}>
            ผู้ใหญ่ทั่วไปควรบริโภคไขมันประมาณ 20-35% ของแคลอรี่ทั้งหมดต่อวัน โดยควรเน้นไขมันไม่อิ่มตัว จำกัดไขมันอิ่มตัวให้น้อยกว่า 10% ของแคลอรี่ และหลีกเลี่ยงไขมันทรานส์ให้มากที่สุด
            {'\n\n'}
            สำหรับนักกีฬาและผู้ที่ออกกำลังกายอย่างหนัก อาจต้องการไขมันในสัดส่วนที่สูงขึ้นเพื่อให้ร่างกายมีพลังงานเพียงพอ แต่ควรปรึกษาผู้เชี่ยวชาญด้านโภชนาการสำหรับคำแนะนำเฉพาะบุคคล
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