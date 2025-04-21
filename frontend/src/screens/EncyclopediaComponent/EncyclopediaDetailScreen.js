import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity, Animated } from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { sizes, colors } from "../../styles/style";

const { width, height } = Dimensions.get("window");

export default function EncyclopediaDetailScreen({ navigation, route }) {
  const { encyclopedia } = route.params;
  const [scrollY] = useState(new Animated.Value(0));

  // Animation for header
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [180, 100],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100, 200],
    outputRange: [0.7, 0.5, 0.3],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerImageContainer, {height: headerHeight}]}>
        <Animated.Image
          source={{
            uri: encyclopedia.picture || "https://medlineplus.gov/images/AnabolicSteroids_share.jpg",
          }}
          style={[styles.image, {opacity: headerOpacity}]}
        />
        <View style={styles.overlay} />
      </Animated.View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false}
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{encyclopedia.name}</Text>
          
          {/* Tags/Keywords section */}
          {encyclopedia.relatedTopics && encyclopedia.relatedTopics.length > 0 && (
            <View style={styles.tagsContainer}>
              {encyclopedia.relatedTopics.map((topic, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{topic}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Main content */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{encyclopedia.description}</Text>
          </View>

          {/* Key Points Section */}
          {encyclopedia.keyPoints && encyclopedia.keyPoints.length > 0 && (
            <View style={styles.keyPointsSection}>
              <Text style={styles.sectionTitle}>จุดสำคัญ</Text>
              {encyclopedia.keyPoints.map((point, index) => (
                <View key={index} style={styles.keyPointItem}>
                  <FontAwesome5 name="check-circle" size={20} color={colors.clr_blue} />
                  <Text style={styles.keyPointText}>{point}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Related Images Section */}
          {encyclopedia.additionalImages && encyclopedia.additionalImages.length > 0 && (
            <View style={styles.gallerySection}>
              <Text style={styles.sectionTitle}>ภาพประกอบ</Text>
              <View style={styles.imageGrid}>
                {encyclopedia.additionalImages.map((imgUrl, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image source={{uri: imgUrl}} style={styles.gridImage} />
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Additional Info Section */}
          <View style={styles.infoSection}>
            {encyclopedia.trainingTips && (
              <View style={styles.infoCard}>
                <MaterialCommunityIcons name="weight-lifter" size={24} color={colors.clr_blue} />
                <View style={styles.infoCardContent}>
                  <Text style={styles.infoCardTitle}>การฝึกฝน</Text>
                  <Text style={styles.infoCardText}>{encyclopedia.trainingTips}</Text>
                </View>
              </View>
            )}
            
            {encyclopedia.nutritionTips && (
              <View style={styles.infoCard}>
                <Ionicons name="nutrition" size={24} color={colors.clr_blue} />
                <View style={styles.infoCardContent}>
                  <Text style={styles.infoCardTitle}>โภชนาการ</Text>
                  <Text style={styles.infoCardText}>{encyclopedia.nutritionTips}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Reference Section */}
          {encyclopedia.reference && (
            <View style={styles.references}>
              <Text style={styles.sectionTitle}>แหล่งข้อมูล</Text>
              <Text style={styles.referenceText}>{encyclopedia.reference}</Text>
            </View>
          )}
          
          <View style={{height: 40}} />
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
  headerImageContainer: {
    width: "100%",
    height: 180,
    position: 'absolute',
    zIndex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  contentContainer: {
    marginTop: 150,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.clr_background,
    paddingTop: 20,
  },
  title: {
    color: colors.clr_white,
    fontSize: sizes.size_3xl,
    fontWeight: "bold",
    marginVertical: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: colors.clr_blue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: colors.clr_white,
    fontSize: sizes.size_sm,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  description: {
    color: colors.clr_white,
    fontSize: sizes.size_base,
    lineHeight: sizes.size_xl,
  },
  sectionTitle: {
    color: colors.clr_white,
    fontSize: sizes.size_xl,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  keyPointsSection: {
    marginBottom: 20,
  },
  keyPointItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 10,
  },
  keyPointText: {
    color: colors.clr_white,
    fontSize: sizes.size_base,
    marginLeft: 10,
    flex: 1,
  },
  gallerySection: {
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: '48%',
    aspectRatio: 1.5,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    backgroundColor: 'rgba(30,30,30,0.5)'
  },
  gridImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoCardContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoCardTitle: {
    color: colors.clr_white,
    fontSize: sizes.size_base,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoCardText: {
    color: colors.clr_white,
    fontSize: sizes.size_sm,
  },
  references: {
    marginBottom: 20,
  },
  referenceText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: sizes.size_sm,
    fontStyle: 'italic',
  },
});
