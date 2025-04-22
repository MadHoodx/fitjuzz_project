import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { sizes, colors } from "../../styles/style";
import Constants from 'expo-constants';

const EXPO_PUBLIC_ENDPOINT_API = Constants.expoConfig.extra.EXPO_PUBLIC_ENDPOINT_API;

export default function SteroidCategoryScreen({ navigation, route }) {
  const { category } = route.params;
  const [searchQuery, setSearchQuery] = useState("");


  const [steroidList, setSteroidList] = useState([]);
  const [storeSteroid, setStoreSteroid] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch steroid data from API
  useEffect(() => {
    fetchSteroid();
  }, []);

  const fetchSteroid = async () => {
    try {
      setLoading(true);
      console.log('เริ่มเรียกข้อมูล Steroid จาก API:', `${EXPO_PUBLIC_ENDPOINT_API}/api/user/getSteroidDetails`);
      
      const response = await axios.get(
        `${EXPO_PUBLIC_ENDPOINT_API}/api/user/getSteroidDetails`
      );
      
      console.log("API Response ได้รับข้อมูล:", response.data);

      // ตรวจสอบว่าการตอบกลับมีข้อมูลและมีโครงสร้างที่ถูกต้อง
      let steroidData = response.data;
      
      // บางครั้ง API อาจส่งข้อมูลในรูปแบบที่แตกต่างกัน
      if (response.data?.steroidDetails) {
        steroidData = response.data.steroidDetails;
      } else if (response.data?.data) {
        steroidData = response.data.data;
      } else if (response.data?.items) {
        steroidData = response.data.items;
      }
      
      // แปลง category จากหน้าหลักให้เป็นตัวพิมพ์เล็กและตรงกับค่าในฐานข้อมูล
      let categoryToFilter = category.toLowerCase();
      
      // ถ้าไม่มีข้อมูลใน steroidData ใช้ข้อมูลจำลองแทน
      if (!Array.isArray(steroidData) || steroidData.length === 0) {
        console.log("ไม่พบข้อมูลสเตียรอยด์ในฐานข้อมูล ใช้ข้อมูลจำลองแทน");
        const mockData = getMockSteroidData(categoryToFilter);
        setSteroidList(mockData);
        setStoreSteroid(mockData);
        setLoading(false);
        return;
      }
      
      console.log(`พบข้อมูลสเตียรอยด์ทั้งหมด ${steroidData.length} รายการ`);
      
      // กรองข้อมูลโดยเทียบเท่ากันและลองใช้ includes ด้วย
      const filtered = steroidData.filter((steroid) => {
        if (!steroid || !steroid.category) {
          return false;
        }
        const steroidCategory = steroid.category.toLowerCase();
        console.log(`Comparing: ${steroidCategory} with ${categoryToFilter}`);
        
        // ใช้ทั้งการเปรียบเทียบแบบเท่ากันและการมีคำอยู่ใน string
        return steroidCategory === categoryToFilter || 
               steroidCategory.includes(categoryToFilter) ||
               categoryToFilter.includes(steroidCategory);
      });
      
      console.log(`Found ${filtered.length} steroids in category ${categoryToFilter}`);
      
      // ถ้าไม่พบข้อมูลที่ตรงกับ category ใช้ข้อมูลจำลองแทน
      if (filtered.length === 0) {
        console.log(`ไม่พบข้อมูลสเตียรอยด์ในหมวดหมู่ ${category} ใช้ข้อมูลจำลองแทน`);
        const mockData = getMockSteroidData(categoryToFilter);
        setSteroidList(mockData);
        setStoreSteroid(mockData);
      } else {
        setSteroidList(filtered);
        setStoreSteroid(filtered);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching steroids:", error);
      // กรณีเกิด error ใช้ข้อมูลจำลอง
      console.log('เกิดข้อผิดพลาดในการเรียกข้อมูล ใช้ข้อมูลจำลองแทน');
      const mockData = getMockSteroidData(category.toLowerCase());
      setSteroidList(mockData);
      setStoreSteroid(mockData);
      setLoading(false);
    }
  };
    
  // ฟังก์ชันสร้างข้อมูลจำลองสำหรับแต่ละหมวดหมู่
  const getMockSteroidData = (category) => {
    const baseImageUrl = "https://medlineplus.gov/images/AnabolicSteroids_share.jpg";
    
    if (category === "anabolic") {
      return [
        {
          _id: "anabolic1",
          name: "Testosterone Enanthate",
          description: "เป็นสเตียรอยด์อะนาโบลิกที่ใช้ในการทดแทนฮอร์โมนเพศชาย ช่วยเพิ่มมวลกล้ามเนื้อและความแข็งแรง",
          category: "anabolic",
          picture: baseImageUrl,
          benefits: [
            "เพิ่มมวลกล้ามเนื้อได้อย่างรวดเร็ว",
            "เพิ่มระดับพลังงานและความแข็งแรง",
            "ช่วยในการฟื้นตัวหลังการออกกำลังกาย",
            "เพิ่มความหนาแน่นของกระดูก"
          ],
          risks: [
            "เสี่ยงต่อการเกิดสิวและผื่นผิวหนัง",
            "อาจมีผลข้างเคียงต่อตับและไต",
            "ลดระดับฮอร์โมนเพศชายตามธรรมชาติ",
            "อาจทำให้เกิดความดันโลหิตสูง"
          ],
          medicalUses: [
            "ใช้ในการรักษาภาวะฮอร์โมนเพศชายต่ำ",
            "ช่วยในการรักษาภาวะขาดฮอร์โมนเพศชาย",
            "ใช้ในผู้ป่วยที่มีภาวะกล้ามเนื้อฝ่อลีบ"
          ],
          commonTypes: [
            "Testosterone Enanthate",
            "Testosterone Cypionate",
            "Testosterone Propionate"
          ],
          cyclesInfo: "วงจรการใช้ Testosterone Enanthate โดยทั่วไปใช้เวลา 12-16 สัปดาห์ ฉีดประมาณ 250-500 mg ต่อสัปดาห์ แบ่งเป็น 1-2 ครั้ง ควรมีการใช้ยาหลังวงจร (PCT) เพื่อกระตุ้นการผลิตฮอร์โมนตามธรรมชาติกลับมา",
          usage: "",
          injectionTips: "",
          fullTitle: "Testosterone Enanthate"
        },
        {
          _id: "anabolic2",
          name: "Dianabol (Methandrostenolone)",
          description: "สเตียรอยด์อะนาโบลิกที่ช่วยเพิ่มการสังเคราะห์โปรตีนและเก็บไนโตรเจน ทำให้เพิ่มมวลกล้ามเนื้อได้อย่างรวดเร็ว",
          category: "anabolic",
          picture: baseImageUrl,
          benefits: [
            "เพิ่มมวลกล้ามเนื้ออย่างรวดเร็ว",
            "เพิ่มความแข็งแรงอย่างมาก",
            "ช่วยเพิ่มความอดทนในการฝึก",
            "ช่วยเก็บไนโตรเจนในกล้ามเนื้อ"
          ],
          risks: [
            "มีความเป็นพิษต่อตับสูง",
            "อาจทำให้เกิดภาวะฮอร์โมนเพศหญิงสูงในผู้ชาย",
            "เพิ่มความเสี่ยงต่อโรคหัวใจและหลอดเลือด",
            "ระดับคอเลสเตอรอลผิดปกติ"
          ],
          medicalUses: [
            "ใช้ในการรักษาภาวะขาดอาหารบางประเภท",
            "เคยใช้ในผู้ป่วยแผลไฟไหม้อย่างรุนแรง"
          ],
          commonTypes: [
            "Dianabol",
            "Anabol",
            "D-bol"
          ],
          cyclesInfo: "วงจรการใช้ Dianabol โดยทั่วไปสั้นกว่า ประมาณ 4-6 สัปดาห์ ขนาดประมาณ 20-50 mg ต่อวัน มักใช้เป็นตัวเริ่มในวงจรที่มี steroid แบบฉีดรวมอยู่ด้วย",
          usage: "",
          injectionTips: "",
          fullTitle: "Dianabol (Methandrostenolone)"
        }
      ];
    } else if (category === "oral") {
      return [
        {
          _id: "oral1",
          name: "Anavar (Oxandrolone)",
          description: "สเตียรอยด์แบบรับประทานที่มีผลข้างเคียงต่ำ นิยมใช้ในการรักษา มักใช้ในช่วงลดไขมัน",
          category: "oral",
          picture: baseImageUrl,
          benefits: [
            "เพิ่มความแข็งแรงโดยไม่เพิ่มน้ำหนักมาก",
            "ช่วยในการรักษามวลกล้ามเนื้อในช่วงลดไขมัน",
            "มีผลข้างเคียงน้อยกว่าสเตียรอยด์ชนิดอื่น",
            "เหมาะสำหรับทั้งชายและหญิง"
          ],
          risks: [
            "มีผลต่อระดับโคเลสเตอรอล HDL และ LDL",
            "อาจมีผลข้างเคียงต่อตับในระยะยาว",
            "ยับยั้งการผลิตฮอร์โมนเพศตามธรรมชาติ",
            "อาจมีผลต่อการเจริญเติบโตในเด็ก"
          ],
          medicalUses: [
            "รักษาภาวะขาดน้ำหนักและกล้ามเนื้อฝ่อลีบ",
            "ช่วยฟื้นฟูหลังการผ่าตัดหรือการบาดเจ็บ",
            "รักษาผู้ป่วยโรคเอดส์ที่มีอาการลดน้ำหนัก"
          ],
          commonTypes: [
            "Oxandrolone",
            "Anavar",
            "Oxandrin"
          ],
          cyclesInfo: "",
          usage: "รับประทาน Anavar ในรูปแบบเม็ด โดยทั่วไปขนาด 10-30 mg ต่อวันสำหรับผู้ชาย และ 5-10 mg ต่อวันสำหรับผู้หญิง วงจรการใช้ประมาณ 6-8 สัปดาห์ ควรรับประทานพร้อมอาหารเพื่อลดการระคายเคืองกระเพาะ",
          injectionTips: "",
          fullTitle: "Anavar (Oxandrolone)"
        },
        {
          _id: "oral2",
          name: "Winstrol (Stanozolol)",
          description: "สเตียรอยด์แบบรับประทานที่ช่วยในการเพิ่มความแข็งแรงและความเร็ว โดยไม่เพิ่มน้ำหนักมาก",
          category: "oral",
          picture: baseImageUrl,
          benefits: [
            "เพิ่มความแข็งแรงและความเร็วได้ดี",
            "ไม่ทำให้เก็บน้ำในร่างกาย",
            "ช่วยให้กล้ามเนื้อมีความคมชัด",
            "เหมาะสำหรับช่วงลดไขมัน"
          ],
          risks: [
            "มีความเป็นพิษต่อตับสูง",
            "ทำให้ข้อและเอ็นแห้ง เสี่ยงต่อการบาดเจ็บ",
            "ลดระดับโคเลสเตอรอล HDL อย่างมาก",
            "อาจทำให้ผมร่วงในผู้ที่มีแนวโน้มทางพันธุกรรม"
          ],
          medicalUses: [
            "รักษาโรคโลหิตจางบางชนิด",
            "ใช้ในการรักษาอาการบวมน้ำบางประเภท",
            "ช่วยในการเจริญเติบโตในเด็กบางราย"
          ],
          commonTypes: [
            "Stanozolol",
            "Winstrol",
            "Stromba"
          ],
          cyclesInfo: "",
          usage: "รับประทาน Winstrol ในรูปแบบเม็ด โดยทั่วไปขนาด 25-50 mg ต่อวันสำหรับผู้ชาย วงจรการใช้ประมาณ 6-8 สัปดาห์ เนื่องจากมีความเป็นพิษต่อตับสูง จึงไม่ควรใช้เป็นเวลานาน",
          injectionTips: "",
          fullTitle: "Winstrol (Stanozolol)"
        }
      ];
    } else if (category === "injectable") {
      return [
        {
          _id: "injectable1",
          name: "Deca Durabolin (Nandrolone)",
          description: "สเตียรอยด์แบบฉีดที่ช่วยเพิ่มมวลกล้ามเนื้อ ลดการบาดเจ็บที่ข้อต่อ และเพิ่มความแข็งแรงของกระดูก",
          category: "injectable",
          picture: baseImageUrl,
          benefits: [
            "เพิ่มมวลกล้ามเนื้อค่อนข้างถาวร",
            "ช่วยบรรเทาอาการปวดข้อ",
            "เพิ่มความหนาแน่นของกระดูก",
            "ช่วยในการฟื้นตัวของร่างกาย"
          ],
          risks: [
            "อาจทำให้มีปัญหาเรื่องการแข็งตัวของอวัยวะเพศชาย",
            "ยับยั้งการผลิตฮอร์โมนเพศชายเป็นเวลานาน",
            "อาจเพิ่มระดับโปรแลคติน",
            "อาจทำให้เกิดภาวะซึมเศร้า"
          ],
          medicalUses: [
            "รักษาภาวะกล้ามเนื้อฝ่อและโรคเลือดจาง",
            "ใช้ในผู้ป่วยที่มีภาวะขาดโปรตีน",
            "ช่วยในการรักษาโรคกระดูกพรุน"
          ],
          commonTypes: [
            "Nandrolone Decanoate",
            "Deca Durabolin",
            "NPP (Nandrolone Phenylpropionate)"
          ],
          cyclesInfo: "",
          usage: "",
          injectionTips: "ฉีด Deca Durabolin เข้ากล้ามเนื้อลึก โดยทั่วไปที่กล้ามเนื้อสะโพกหรือต้นขา ขนาดประมาณ 200-400 mg ต่อสัปดาห์ ระยะเวลาการใช้ประมาณ 10-14 สัปดาห์ ควรฉีดทุก 7-10 วัน และใช้เข็มฉีดยาที่สะอาด",
          fullTitle: "Deca Durabolin (Nandrolone Decanoate)"
        },
        {
          _id: "injectable2",
          name: "Equipoise (Boldenone)",
          description: "สเตียรอยด์แบบฉีดที่ช่วยเพิ่มความอดทน การสร้างเม็ดเลือดแดง และเพิ่มความอยากอาหาร",
          category: "injectable",
          picture: baseImageUrl,
          benefits: [
            "เพิ่มมวลกล้ามเนื้อค่อนข้างช้าแต่มีคุณภาพ",
            "เพิ่มความอยากอาหารอย่างมาก",
            "เพิ่มการสร้างเม็ดเลือดแดงและความอดทน",
            "มีผลข้างเคียงน้อยกว่าสเตียรอยด์หลายชนิด"
          ],
          risks: [
            "อาจทำให้เกิดสิวได้มากกว่าปกติ",
            "เพิ่มความดันโลหิต",
            "อาจทำให้หัวใจโต",
            "ยับยั้งการผลิตฮอร์โมนเพศชายตามธรรมชาติ"
          ],
          medicalUses: [
            "ใช้ในสัตว์เพื่อเพิ่มมวลกล้ามเนื้อและความอยากอาหาร",
            "ไม่ได้รับการอนุมัติให้ใช้ในมนุษย์ทางการแพทย์"
          ],
          commonTypes: [
            "Boldenone Undecylenate",
            "Equipoise",
            "Ganabol"
          ],
          cyclesInfo: "",
          usage: "",
          injectionTips: "ฉีด Equipoise เข้ากล้ามเนื้อลึก โดยทั่วไปฉีดที่สะโพกหรือต้นขา ขนาดประมาณ 300-500 mg ต่อสัปดาห์ แบ่งฉีด 1-2 ครั้ง ระยะเวลาการใช้ประมาณ 12-16 สัปดาห์",
          fullTitle: "Equipoise (Boldenone Undecylenate)"
        }
      ];
    } else {
      return [
        {
          _id: "default1",
          name: `${category} Steroid Sample`,
          description: `ตัวอย่างสเตียรอยด์ประเภท ${category} สำหรับการแสดงผลในกรณีที่ไม่พบข้อมูลจริง`,
          category: category,
          picture: baseImageUrl,
          benefits: [
            "ตัวอย่างประโยชน์ที่ 1",
            "ตัวอย่างประโยชน์ที่ 2",
            "ตัวอย่างประโยชน์ที่ 3"
          ],
          risks: [
            "ตัวอย่างความเสี่ยงที่ 1",
            "ตัวอย่างความเสี่ยงที่ 2",
            "ตัวอย่างความเสี่ยงที่ 3"
          ],
          medicalUses: [
            "ตัวอย่างการใช้ทางการแพทย์ที่ 1",
            "ตัวอย่างการใช้ทางการแพทย์ที่ 2"
          ],
          commonTypes: [
            "ตัวอย่างประเภทที่ 1",
            "ตัวอย่างประเภทที่ 2",
            "ตัวอย่างประเภทที่ 3"
          ],
          cyclesInfo: "ข้อมูลตัวอย่างเกี่ยวกับวงจรการใช้",
          usage: "ข้อมูลตัวอย่างเกี่ยวกับการใช้งาน",
          injectionTips: "ข้อมูลตัวอย่างเกี่ยวกับการฉีด",
          fullTitle: `${category} Steroid Sample`
        }
      ];
    }
  };

  useEffect(() => {
    filterCategory();
  }, [searchQuery]);

  const filterCategory = () => {
    // Filter by search query
    if (searchQuery) {
      const filtered = storeSteroid.filter((steroid) =>
        steroid.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSteroidList(filtered);
    } else {
      setSteroidList(storeSteroid);
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.content]}>
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder={`ค้นหาสเตียรอยด์ ${category}`}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Ionicons
              name="search"
              size={20}
              color="gray"
              style={styles.searchIcon}
            />
          </View>
        </View>

        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {loading ? (
            <Text style={styles.infoText}>กำลังโหลดข้อมูล...</Text>
          ) : steroidList.length > 0 ? (
            steroidList.map((steroid, index) => (
              <TouchableOpacity
                key={`${steroid._id}_${index}`}
                style={styles.card}
                onPress={() => navigation.navigate("Steroid detail", { steroid, steroidId: steroid._id })}
              >
                <Image
                  source={{
                    uri: steroid.picture || "https://medlineplus.gov/images/AnabolicSteroids_share.jpg",
                  }}
                  style={styles.cardImage}
                />
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardTitle}>{steroid.name}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.infoText}>ไม่พบข้อมูลสเตียรอยด์ในหมวดหมู่ {category}</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  card: {
    height: 130,
    borderRadius: 8,
    marginBottom: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    paddingLeft: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  cardTitle: {
    color: colors.clr_white,
    fontSize: sizes.size_lg,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  cardDescription: {
    color: colors.clr_white,
    fontSize: sizes.size_sm,
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: colors.clr_background,
  },

  content: {
    flex: 1,
    backgroundColor: colors.clr_background,
    paddingHorizontal: 20,
    paddingTop: 5,
  },

  searchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.clr_white,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.clr_white,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  searchIcon: {
    marginLeft: 5,
  },
  infoText: {
    color: colors.clr_white,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    padding: 20,
  },
});