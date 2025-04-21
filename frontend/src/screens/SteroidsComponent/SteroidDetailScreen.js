import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator } from "react-native";
import { sizes, colors } from "../../styles/style";
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Constants from 'expo-constants';

export default function SteroidDetailScreen({ route }) {
  const { steroid, steroidId } = route.params;
  const [steroidDetail, setSteroidDetail] = useState(steroid);
  const [loading, setLoading] = useState(!steroid && steroidId);
  const EXPO_PUBLIC_ENDPOINT_API = Constants.expoConfig.extra.EXPO_PUBLIC_ENDPOINT_API;

  // ถ้ามีแค่ steroidId แต่ไม่มีข้อมูลเต็ม ให้ดึงข้อมูลจาก API
  useEffect(() => {
    if (steroidId && !steroid) {
      fetchSteroidById(steroidId);
    }
  }, [steroidId]);

  const fetchSteroidById = async (id) => {
    try {
      setLoading(true);
      // ใช้ endpoint ที่มีอยู่แล้ว
      const response = await axios.get(`${EXPO_PUBLIC_ENDPOINT_API}/api/user/getSteroidDetails`);
      
      // ค้นหาข้อมูลที่มี id ตรงกับที่ต้องการ
      const steroidItem = response.data.find(item => item._id === id);
      
      if (steroidItem) {
        setSteroidDetail(steroidItem);
        console.log("Found steroid item:", steroidItem);
      } else {
        console.error('Steroid item not found for id:', id);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching steroid detail:", error);
      setLoading(false);
    }
  };

  // console.log เพิ่มเติมเพื่อดู steroidDetail ที่ได้มา
  useEffect(() => {
    if (steroidDetail) {
      console.log("Using steroid detail data:", steroidDetail);
    }
  }, [steroidDetail]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
      </View>
    );
  }

  // ใช้ข้อมูลจาก database โดยตรง ไม่ใช้ fallback data
  const {
    benefits = [],
    risks = [],
    medicalUses: rawMedicalUses,
    commonTypes = [],
    cyclesInfo = "",
    usage = "",
    injectionTips = "",
    fullTitle = steroidDetail?.name || "",
    description = ""
  } = steroidDetail || {};

  // แปลง medicalUses ให้เป็น array ทุกกรณี
  const medicalUses = Array.isArray(rawMedicalUses) ? rawMedicalUses : 
                     (rawMedicalUses ? [rawMedicalUses] : []);

  const SectionTitle = ({ icon, title }) => (
    <View style={styles.sectionTitleContainer}>
      {icon}
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  const BenefitItem = ({ text }) => (
    <View style={styles.benefitItem}>
      <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={styles.benefitIcon} />
      <Text style={styles.benefitText}>{text}</Text>
    </View>
  );

  const RiskItem = ({ text }) => (
    <View style={styles.riskItem}>
      <Ionicons name="warning" size={20} color="#F44336" style={styles.riskIcon} />
      <Text style={styles.riskText}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image with Gradient Overlay */}
        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: steroidDetail?.picture || "https://medlineplus.gov/images/AnabolicSteroids_share.jpg",
            }}
            style={styles.heroImage}
          />
          <View style={styles.overlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{steroidDetail?.name || fullTitle}</Text>

          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* ข้อมูลทั่วไป */}
          <View style={styles.infoCard}>
            <SectionTitle 
              icon={<MaterialCommunityIcons name="information" size={24} color="#1976D2" />} 
              title="ข้อมูลทั่วไป" 
            />
            <Text style={styles.infoText}>
              {description || `${fullTitle} เป็นสารสังเคราะห์ที่มีโครงสร้างคล้ายฮอร์โมนเทสโทสเตอโรนในร่างกาย มักใช้ในวงการกีฬาและฟิตเนสเพื่อเพิ่มมวลกล้ามเนื้อและประสิทธิภาพทางกายภาพ`}
            </Text>
          </View>

          {/* ประโยชน์ */}
          <View style={styles.infoCard}>
            <SectionTitle 
              icon={<MaterialCommunityIcons name="thumb-up" size={24} color="#4CAF50" />} 
              title="ประโยชน์" 
            />
            {benefits.map((benefit, index) => (
              <BenefitItem key={index} text={benefit} />
            ))}
          </View>

          {/* ความเสี่ยง */}
          <View style={styles.infoCard}>
            <SectionTitle 
              icon={<MaterialCommunityIcons name="alert-circle" size={24} color="#F44336" />} 
              title="ความเสี่ยงและผลข้างเคียง" 
            />
            {risks.map((risk, index) => (
              <RiskItem key={index} text={risk} />
            ))}
          </View>

          {/* ประเภทที่พบบ่อย */}
          {commonTypes && commonTypes.length > 0 && (
            <View style={styles.infoCard}>
              <SectionTitle 
                icon={<FontAwesome5 name="pills" size={20} color="#9C27B0" />} 
                title="ประเภทที่พบบ่อย" 
              />
              {commonTypes.map((type, index) => (
                <View key={index} style={styles.typeItem}>
                  <View style={styles.typeBullet} />
                  <Text style={styles.typeText}>{type}</Text>
                </View>
              ))}
            </View>
          )}

          {/* ข้อมูลเพิ่มเติม */}
          {(medicalUses.length > 0 || usage || injectionTips) && (
            <View style={styles.infoCard}>
              <SectionTitle 
                icon={<Ionicons name="medkit" size={22} color="#FF9800" />} 
                title="การใช้ทางการแพทย์" 
              />
              {medicalUses.length > 0 && medicalUses.map((use, index) => (
                <View key={index} style={styles.typeItem}>
                  <View style={styles.typeBullet} />
                  <Text style={styles.typeText}>{use}</Text>
                </View>
              ))}
              {usage && (
                <Text style={styles.infoText}>{usage}</Text>
              )}
              {injectionTips && (
                <Text style={styles.infoText}>{injectionTips}</Text>
              )}
            </View>
          )}

          {/* คำเตือน */}
          <View style={[styles.infoCard, styles.warningCard]}>
            <Text style={styles.warningTitle}>⚠️ คำเตือนสำคัญ</Text>
            <Text style={styles.warningText}>
              ข้อมูลนี้มีไว้เพื่อการศึกษาเท่านั้น การใช้สเตียรอยด์โดยไม่มีการดูแลทางการแพทย์มีความเสี่ยงสูงและอาจผิดกฎหมาย ควรปรึกษาแพทย์ก่อนการใช้สารใดๆ ที่มีผลต่อร่างกาย
            </Text>
          </View>

          {cyclesInfo && (
            <View style={styles.infoCard}>
              <SectionTitle 
                icon={<Ionicons name="repeat" size={22} color="#03A9F4" />} 
                title="วงจรการใช้" 
              />
              <Text style={styles.infoText}>{cyclesInfo}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.clr_background,
  },
  heroContainer: {
    height: 220,
    position: 'relative',
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  heroTitle: {
    color: colors.clr_white,
    fontSize: sizes.size_2xl,
    fontWeight: "bold",
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  heroSubtitle: {
    color: colors.clr_white,
    fontSize: sizes.size_sm,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  contentContainer: {
    padding: 16,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#1976D2',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: colors.clr_white,
    fontSize: sizes.size_lg,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  infoText: {
    color: colors.clr_white,
    fontSize: sizes.size_base,
    lineHeight: 22,
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  benefitIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  benefitText: {
    color: colors.clr_white,
    fontSize: sizes.size_base,
    flex: 1,
  },
  riskItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  riskIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  riskText: {
    color: colors.clr_white,
    fontSize: sizes.size_base,
    flex: 1,
  },
  typeItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 8,
    alignItems: 'flex-start',
  },
  typeBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#03A9F4',
    marginRight: 8,
    marginTop: 6,
  },
  typeText: {
    color: colors.clr_white,
    fontSize: sizes.size_base,
    flex: 1,
  },
  warningCard: {
    backgroundColor: 'rgba(244, 67, 54, 0.15)',
    borderLeftColor: '#F44336',
  },
  warningTitle: {
    color: '#F44336',
    fontSize: sizes.size_lg,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  warningText: {
    color: colors.clr_white,
    fontSize: sizes.size_base,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.clr_white,
    marginTop: 16,
    fontSize: sizes.size_base,
  },
});