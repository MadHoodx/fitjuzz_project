import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Linking, Dimensions, ImageBackground } from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { sizes, colors } from "../../styles/style";


const { width } = Dimensions.get('window');

export default function SupplementDetailScreen({ navigation, route }) {
  const { supplement } = route.params;
  const [activeTab, setActiveTab] = useState('benefits');
  
  
  // สำหรับเปรียบเทียบ Whey และ Casein
  const isProtein = supplement.name && (
    supplement.name.toLowerCase().includes("protein") || 
    supplement.name.toLowerCase().includes("whey") || 
    supplement.name.toLowerCase().includes("casein") || 
    supplement.category === "protein"
  );

  
  // // เปิดลิงค์
  const openUrl = (url) => {
    Linking.openURL(url);
  };

  // Section component ที่มีรูปภาพด้วย
  const SectionWithImage = ({ title, children, icon, image }) => (
    <View style={styles.sectionContainer}>
      {image && (
        <View style={styles.sectionImageContainer}>
          <Image source={{ uri: image }} style={styles.sectionImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.sectionImageGradient}
          />
          <View style={styles.sectionImageOverlay}>
            <Ionicons name={icon} size={36} color={colors.clr_white} />
            <Text style={styles.sectionImageTitle}>{title}</Text>
          </View>
        </View>
      )}
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  // Benefit item component แบบสวยงาม
  const BenefitItem = ({ text, index }) => (
    <View style={styles.benefitItem}>
      <View style={styles.bulletPointNumbered}>
        <Text style={styles.bulletNumber}>{index + 1}</Text>
      </View>
      <Text style={styles.benefitText}>{text}</Text>
    </View>
  );
  
  // Tab buttons component
  const TabButtons = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'benefits' && styles.activeTab]}
        onPress={() => setActiveTab('benefits')}
      >
        <Ionicons 
          name="fitness-outline" 
          size={18} 
          color={activeTab === 'benefits' ? colors.clr_white : colors.clr_lightgray} 
        />
        <Text style={[styles.tabText, activeTab === 'benefits' && styles.activeTabText]}>
          ประโยชน์
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'whyUse' && styles.activeTab]}
        onPress={() => setActiveTab('whyUse')}
      >
        <Ionicons 
          name="help-circle-outline" 
          size={18} 
          color={activeTab === 'whyUse' ? colors.clr_white : colors.clr_lightgray} 
        />
        <Text style={[styles.tabText, activeTab === 'whyUse' && styles.activeTabText]}>
          ทำไมใช้
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'suitableFor' && styles.activeTab]}
        onPress={() => setActiveTab('suitableFor')}
      >
        <Ionicons 
          name="people-outline" 
          size={18} 
          color={activeTab === 'suitableFor' ? colors.clr_white : colors.clr_lightgray} 
        />
        <Text style={[styles.tabText, activeTab === 'suitableFor' && styles.activeTabText]}>
          เหมาะกับใคร
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'howToUse' && styles.activeTab]}
        onPress={() => setActiveTab('howToUse')}
      >
        <Ionicons 
          name="information-circle-outline" 
          size={18} 
          color={activeTab === 'howToUse' ? colors.clr_white : colors.clr_lightgray} 
        />
        <Text style={[styles.tabText, activeTab === 'howToUse' && styles.activeTabText]}>
          วิธีใช้
        </Text>
      </TouchableOpacity>
    </View>
  );
  


  // ส่วนเปรียบเทียบ Whey vs Casein
  const ComparisonSection = () => {
    const isWhey = supplement.name && supplement.name.toLowerCase().includes("whey");
    const isCasein = supplement.name && supplement.name.toLowerCase().includes("casein");
    
    if (!isProtein) return null;
    
    return (
      <View style={styles.comparisonContainer}>
        <View style={styles.comparisonHeader}>
          <Ionicons name="git-compare-outline" size={24} color={colors.clr_brightblue} />
          <Text style={styles.comparisonTitle}>เปรียบเทียบ Whey vs Casein</Text>
        </View>
        
        <View style={styles.comparisonTable}>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonCell}>
              <Text style={styles.comparisonLabel}>คุณสมบัติ</Text>
            </View>
            <View style={[styles.comparisonCell, isWhey ? styles.highlightedCell : {}]}>
              <Text style={styles.comparisonValue}>Whey Protein</Text>
            </View>
            <View style={[styles.comparisonCell, isCasein ? styles.highlightedCell : {}]}>
              <Text style={styles.comparisonValue}>Casein Protein</Text>
            </View>
          </View>
          
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonCell}>
              <Text style={styles.comparisonLabel}>อัตราการย่อย</Text>
            </View>
            <View style={[styles.comparisonCell, isWhey ? styles.highlightedCell : {}]}>
              <Text style={styles.comparisonValue}>{supplement.comparison.digestionRate}</Text>
            </View>
            <View style={[styles.comparisonCell, isCasein ? styles.highlightedCell : {}]}>
              <Text style={styles.comparisonValue}>ช้า (6-8 ชั่วโมง)</Text>
            </View>
          </View>
          
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonCell}>
              <Text style={styles.comparisonLabel}>เวลาที่เหมาะสม</Text>
            </View>
            <View style={[styles.comparisonCell, isWhey ? styles.highlightedCell : {}]}>
              <Text style={styles.comparisonValue}>{supplement.comparison.bestTimeToUse}</Text>
            </View>
            <View style={[styles.comparisonCell, isCasein ? styles.highlightedCell : {}]}>
              <Text style={styles.comparisonValue}>ก่อนนอน หรือระหว่างมื้ออาหาร</Text>
            </View>
          </View>
          
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonCell}>
              <Text style={styles.comparisonLabel}>ปริมาณ Leucine</Text>
            </View>
            <View style={[styles.comparisonCell, isWhey ? styles.highlightedCell : {}]}>
              <Text style={styles.comparisonValue}>{supplement.comparison.leucineContent}</Text>
            </View>
            <View style={[styles.comparisonCell, isCasein ? styles.highlightedCell : {}]}>
              <Text style={styles.comparisonValue}>ปานกลาง</Text>
            </View>
          </View>
          
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonCell}>
              <Text style={styles.comparisonLabel}>ความรู้สึกอิ่ม</Text>
            </View>
            <View style={[styles.comparisonCell, isWhey ? styles.highlightedCell : {}]}>
              <Text style={styles.comparisonValue}>{supplement.comparison.satiety}</Text>
            </View>
            <View style={[styles.comparisonCell, isCasein ? styles.highlightedCell : {}]}>
              <Text style={styles.comparisonValue}>สูง</Text>
            </View>
          </View>
          
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonCell}>
              <Text style={styles.comparisonLabel}>ราคา</Text>
            </View>
            <View style={[styles.comparisonCell, isWhey ? styles.highlightedCell : {}]}>
              <Text style={styles.comparisonValue}>{supplement.comparison.price}</Text>
            </View>
            <View style={[styles.comparisonCell, isCasein ? styles.highlightedCell : {}]}>
              <Text style={styles.comparisonValue}>สูงกว่าเวย์โปรตีน</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image with Gradient Overlay */}
        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: supplement.picture ||
              'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3'
            }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(51, 51, 51, 0.8)', colors.clr_background]}
            style={styles.gradient}
          />
          <View style={styles.heroContent}>
            <Text style={styles.title}>{supplement.name}</Text>
            <Text style={styles.subtitle}>{supplement.description}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* แถบแท็บสำหรับเลือกดูข้อมูล */}
          <TabButtons />
          
          {/* แสดงข้อมูลตามแท็บที่เลือก */}
          {activeTab === 'benefits' && (
            <SectionWithImage 
              title="ประโยชน์" 
              icon="fitness-outline"
              image={supplement.images?.benefits}
            >
              {supplement.benefits.map((benefit, index) => (
                <BenefitItem key={index} text={benefit} index={index} />
              ))}
            </SectionWithImage>
          )}
          
          {activeTab === 'whyUse' && (
            <SectionWithImage 
              title="ทำไมต้องใช้" 
              icon="help-circle-outline"
              image={supplement.images?.whyUse}
            >
              {supplement.whyUse.map((reason, index) => (
                <BenefitItem key={index} text={reason} index={index} />
              ))}
            </SectionWithImage>
          )}
          
          {activeTab === 'suitableFor' && (
            <SectionWithImage 
              title="เหมาะกับใคร" 
              icon="people-outline"
              image={supplement.images?.suitableFor}
            >
              {supplement.suitableFor.map((person, index) => (
                <BenefitItem key={index} text={person} index={index} />
              ))}
            </SectionWithImage>
          )}
          
          {activeTab === 'howToUse' && (
            <SectionWithImage 
              title="วิธีใช้" 
              icon="information-circle-outline"
              image={supplement.images?.howToUse}
            >
              {supplement.howToUse.map((step, index) => (
                <BenefitItem key={index} text={step} index={index} />
              ))}
            </SectionWithImage>
          )}

          {/* เปรียบเทียบ Whey vs Casein */}
          {isProtein && <ComparisonSection />}

          {/* ซื้อได้ที่ไหน */}
          <View style={styles.storeSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="cart-outline" size={24} color={colors.clr_brightblue} />
              <Text style={styles.sectionTitle}>ซื้อได้ที่ไหน</Text>
            </View>
            <View style={styles.storeContainer}>
              {supplement.stores.map((store, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.storeCard}
                  onPress={() => openUrl(store.url)}
                >
                  {store.logo && (
                    <Image source={{ uri: store.logo }} style={styles.storeLogo} />
                  )}
                  <View style={styles.storeInfo}>
                    <Text style={styles.storeButtonText}>{store.name}</Text>
                    <Text style={styles.visitStore}>ไปที่ร้านค้า</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.clr_white} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* คำเตือน */}
          <View style={styles.disclaimerContainer}>
            <Ionicons name="alert-circle-outline" size={24} color={colors.clr_orange} />
            <Text style={styles.disclaimerText}>
              อาหารเสริมไม่สามารถทดแทนอาหารหลักหรือการออกกำลังกายที่สม่ำเสมอได้ ควรปรึกษาแพทย์หากมีโรคประจำตัว
            </Text>
          </View>
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
    position: 'relative',
    height: 350,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
  heroContent: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  title: {
    color: colors.clr_white,
    fontSize: sizes.size_3xl,
    fontWeight: "bold",
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    color: colors.clr_lightgray,
    fontSize: sizes.size_base,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  contentContainer: {
    padding: 16,
  },
  // Tab styles
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: colors.clr_background_modal,
    borderRadius: 12,
    padding: 6,
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 0,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  activeTab: {
    backgroundColor: colors.clr_brightblue,
  },
  tabText: {
    color: colors.clr_lightgray,
    fontSize: sizes.size_xs,
    marginLeft: 3,
  },
  activeTabText: {
    color: colors.clr_white,
    fontWeight: 'bold',
  },
  // Section styles
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: colors.clr_background_modal,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  sectionImageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  sectionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sectionImageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  sectionImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionImageTitle: {
    color: colors.clr_white,
    fontSize: sizes.size_xl,
    fontWeight: 'bold',
    marginLeft: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 8,
  },
  sectionTitle: {
    color: colors.clr_white,
    fontSize: sizes.size_lg,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sectionContent: {
    padding: 16,
  },
  // Benefit item styles
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bulletPointNumbered: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.clr_brightblue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  bulletNumber: {
    color: colors.clr_white,
    fontWeight: 'bold',
    fontSize: sizes.size_sm,
  },
  benefitText: {
    color: colors.clr_white,
    fontSize: sizes.size_base,
    flex: 1,
    lineHeight: 22,
  },
  // Store styles
  storeSection: {
    marginBottom: 24,
    backgroundColor: colors.clr_background_modal,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeContainer: {
    marginTop: 8,
  },
  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(25, 118, 210, 0.2)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(25, 118, 210, 0.4)',
  },
  storeLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
  },
  storeInfo: {
    flex: 1,
  },
  storeButtonText: {
    color: colors.clr_white,
    fontSize: sizes.size_base,
    fontWeight: 'bold',
  },
  visitStore: {
    color: colors.clr_lightgray,
    fontSize: sizes.size_xs,
    marginTop: 2,
  },
  // Comparison styles
  comparisonContainer: {
    marginBottom: 24,
    backgroundColor: colors.clr_background_modal,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  comparisonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 8,
  },
  comparisonTitle: {
    color: colors.clr_white,
    fontSize: sizes.size_lg,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  comparisonTable: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  comparisonRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  comparisonCell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
  },
  highlightedCell: {
    backgroundColor: 'rgba(25, 118, 210, 0.2)',
  },
  comparisonLabel: {
    color: colors.clr_lightgray,
    fontSize: sizes.size_xs,
  },
  comparisonValue: {
    color: colors.clr_white,
    fontSize: sizes.size_sm,
    fontWeight: '500',
  },
  // Disclaimer styles
  disclaimerContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(231, 115, 57, 0.2)',
    borderRadius: 8,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  disclaimerText: {
    color: colors.clr_lightgray,
    fontSize: sizes.size_xs,
    marginLeft: 10,
    flex: 1,
    lineHeight: 18,
  }
});