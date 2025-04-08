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

const SteroidDetailsModal = ({ visible, steroid, onClose }) => {
  // ตรวจสอบว่ามี steroid ก่อนที่จะทำอะไร
  if (!steroid) return null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Set sample details directly from the steroid prop
  const displayData = steroid;

  const handleRetry = () => {
    // Retry logic is not needed since we're using sample data now.
    setError('');
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
            style={styles.steroidImage}
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
                <Text style={styles.infoLabel}>วิธีการใช้งาน:</Text>
                <View style={styles.howToSteps}>
                  {displayData.steps && Array.isArray(displayData.steps) ? (
                    displayData.steps.map((step, index) => (
                      <Text key={index} style={styles.stepText}>
                        {index + 1}. {step}
                      </Text>
                    ))
                  ) : (
                    <>
                      <Text style={styles.stepText}>1. ใช้ตามคำแนะนำจากผู้เชี่ยวชาญ</Text>
                      <Text style={styles.stepText}>2. ใช้ในปริมาณที่แนะนำเพื่อหลีกเลี่ยงผลข้างเคียง</Text>
                      <Text style={styles.stepText}>3. หลีกเลี่ยงการใช้เกินปริมาณที่แนะนำ</Text>
                    </>
                  )}
                </View>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>ผลข้างเคียงที่อาจเกิดขึ้น:</Text>
                <Text style={styles.descriptionText}>
                  {displayData.sideEffect || 'การใช้สเตียรอยด์อาจทำให้เกิดผลข้างเคียง เช่น ผิวมัน, สิว, การปรับฮอร์โมน'}
                </Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>คำแนะนำเพิ่มเติม:</Text>
                <Text style={styles.descriptionText}>
                  {displayData.tips || 'ควรใช้ในปริมาณที่พอดีและอยู่ภายใต้การดูแลของผู้เชี่ยวชาญ'}
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
  steroidImage: {
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
});

export default SteroidDetailsModal;
