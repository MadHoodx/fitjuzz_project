import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/style';
import axios from 'axios';

const ExerciseDetailsModal = ({ visible, exercise, onClose }) => {
  // ตรวจสอบว่ามี exercise ก่อนที่จะทำอะไร
  if (!exercise) return null;
  
  const [exerciseDetails, setExerciseDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // fetch ข้อมูลเพิ่มเติมจาก API เมื่อ modal เปิดและมี exercise
  useEffect(() => {
    // ฟังก์ชันดึงข้อมูลรายละเอียดอยู่ภายใน useEffect เพื่อหลีกเลี่ยงปัญหา hook ordering
    const fetchData = async () => {
      if (!visible || !exercise._id) return;
      
      try {
        setLoading(true);
        setError('');

        console.log('Exercise ID:', exercise._id);
        console.log('API URL:', `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/getExerciseDetails/${exercise._id}`);
        
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/getExerciseDetails/${exercise._id}`
        );
        
        setExerciseDetails(response.data);
      } catch (err) {
        console.error('Error details:', err.message);
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
          setError(`ไม่สามารถดึงข้อมูลเพิ่มเติมได้: ${err.response.data.message || err.message}`);
        } else if (err.request) {
          console.error('No response received:', err.request);
          setError('ไม่ได้รับการตอบกลับจากเซิร์ฟเวอร์ โปรดตรวจสอบการเชื่อมต่อ');
        } else {
          console.error('Error message:', err.message);
          setError(`เกิดข้อผิดพลาด: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (visible && exercise) {
      fetchData();
    }
    
    // reset state when modal is closed
    if (!visible) {
      setExerciseDetails(null);
      setError('');
    }
    
    return () => {
      // cleanup function when component unmount
    };
  }, [visible, exercise, exercise._id]);

  // use data from exerciseDetails if available, otherwise use props data
  const displayData = exerciseDetails || exercise;
  
  const handleRetry = () => {
    setLoading(true);
    setError('');
    
    console.log('Retrying to fetch data for ID:', exercise._id);
    
    axios.get(`${process.env.EXPO_PUBLIC_ENDPOINT_API}/api/user/getExerciseDetails/${exercise._id}`)
      .then(response => {
        console.log('Retry successful, data:', response.data);
        setExerciseDetails(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Retry failed, error:', err.message);
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
          setError(`ไม่สามารถดึงข้อมูลเพิ่มเติมได้: ${err.response.data.message || err.message}`);
        } else if (err.request) {
          console.error('No response received:', err.request);
          setError('ไม่ได้รับการตอบกลับจากเซิร์ฟเวอร์ โปรดตรวจสอบการเชื่อมต่อ');
        } else {
          console.error('Error message:', err.message);
          setError(`เกิดข้อผิดพลาด: ${err.message}`);
        }
        setLoading(false);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{displayData.name}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <Image 
            source={{uri: displayData.picture || 'https://images.squarespace-cdn.com/content/v1/64c8035f53e9a56246c7c294/1723420893761-XYJVWOXL91SW5442P6RM/maxresdefault-29-1024x576.jpg'}} 
            style={styles.exerciseImage}
            resizeMode="cover"
          />

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.clr_brightblue} />
              <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={handleRetry}
              >
                <Text style={styles.retryButtonText}>ลองใหม่</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView style={styles.modalContent}>
              <View style={[styles.infoSection, styles.categorySection]}>
                <Text style={[styles.infoLabel, styles.categoryLabel]}>หมวดหมู่:</Text>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryText}>
                    {displayData.category.charAt(0).toUpperCase() + displayData.category.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>คำอธิบาย:</Text>
                <Text style={styles.descriptionText}>{displayData.description}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>วิธีการทำ:</Text>
                <View style={styles.howToSteps}>
                  {displayData.steps && Array.isArray(displayData.steps) ? (
                    displayData.steps.map((step, index) => (
                      <Text key={index} style={styles.stepText}>
                        {index + 1}. {step}
                      </Text>
                    ))
                  ) : (
                    <>
                      <Text style={styles.stepText}>1. เริ่มต้นด้วยท่ายืนหรือนั่งที่มั่นคง</Text>
                      <Text style={styles.stepText}>2. จัดท่าทางให้ถูกต้องตามลักษณะของท่าที่ต้องการออกกำลังกาย</Text>
                      <Text style={styles.stepText}>3. ทำการออกกำลังกายด้วยท่าที่ถูกต้อง โดยระวังไม่ให้เกิดการบาดเจ็บ</Text>
                      <Text style={styles.stepText}>4. ทำซ้ำตามจำนวนครั้งที่ต้องการ</Text>
                    </>
                  )}
                </View>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>กล้ามเนื้อที่ฝึก:</Text>
                <Text style={styles.descriptionText}>
                  {displayData.targetMuscles || (
                    displayData.category === 'chest' ? 'กล้ามเนื้อหน้าอก, ไหล่, แขนส่วนหลัง' : 
                    displayData.category === 'back' ? 'กล้ามเนื้อหลัง, บริเวณไหล่ด้านหลัง' : 
                    displayData.category === 'arms' ? 'กล้ามเนื้อต้นแขน, ปลายแขน' :
                    displayData.category === 'abs' ? 'กล้ามเนื้อหน้าท้อง, แกนกลางลำตัว' :
                    displayData.category === 'leg' ? 'กล้ามเนื้อขา, น่อง, สะโพก' :
                    'กล้ามเนื้อทั่วไป'
                  )}
                </Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>คำแนะนำเพิ่มเติม:</Text>
                <Text style={styles.descriptionText}>
                  {displayData.tips || 'ควรเริ่มต้นด้วยน้ำหนักเบาๆ ก่อน เพื่อให้ร่างกายได้ปรับตัว และค่อยๆ เพิ่มน้ำหนักเมื่อร่างกายแข็งแรงขึ้น ควรหายใจเข้าออกอย่างสม่ำเสมอระหว่างออกกำลังกาย และพักให้เพียงพอระหว่างเซ็ต'}
                </Text>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  modalView: {
    width: '90%',
    height: '85%',
    backgroundColor: '#222',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#111'
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white'
  },
  closeButton: {
    padding: 5
  },
  exerciseImage: {
    width: '100%',
    height: 200
  },
  modalContent: {
    flex: 1,
    padding: 15
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center'
  },
  retryButton: {
    backgroundColor: colors.clr_brightblue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  infoSection: {
    marginBottom: 20
  },
  categorySection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.clr_brightblue,
    marginBottom: 8
  },
  categoryLabel: {
    marginBottom: 0,
    marginRight: 10
  },
  categoryTag: {
    backgroundColor: colors.clr_blue,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start'
  },
  categoryText: {
    color: 'white',
    fontWeight: 'bold'
  },
  descriptionText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24
  },
  howToSteps: {
    marginTop: 5
  },
  stepText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
    lineHeight: 22
  },
  muscleImageContainer: {
    width: '100%',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  muscleImage: {
    width: '100%',
    height: 200,
    borderRadius: 10
  },
  muscleImageText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center'
  }
});

export default ExerciseDetailsModal; 