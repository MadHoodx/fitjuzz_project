import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import styles, { sizes, colors } from "../styles/style";
import { useNavigation } from "@react-navigation/native";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IconFeather from "react-native-vector-icons/Feather";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const HelpScreen = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate("Profile");
  };
  const Dumbbells = () => {
    return (
      <View style={[{ position: "absolute", right: 0, top: 0 }]}>
        <IconFontAwesome5
          name={"dumbbell"}
          size={50}
          color={colors.clr_lightgray}
          style={HelpScreenstyles.dumbbell_top}
        />
        <IconFontAwesome5
          name={"dumbbell"}
          size={60}
          color={colors.clr_lightgray}
          style={HelpScreenstyles.dumbbell_middle}
        />
        <IconFontAwesome5
          name={"dumbbell"}
          size={70}
          color={colors.clr_lightgray}
          style={HelpScreenstyles.dumbbell_bottom}
        />
      </View>
    );
  };
  return (
    <View style={[HelpScreenstyles.container]}>
      <ScrollView style={[styles.container]}>
        <Dumbbells />
        <View style={[{ paddingBottom: 60 }]}>
          <View style={[{ paddingTop: 20 }]}>
            <View>
              <TouchableOpacity
                style={[HelpScreenstyles.goback__button]}
                onPress={handleBack}
              >
                <IconMaterialIcons
                  name={"arrow-back-ios-new"}
                  size={20}
                  color={"white"}
                />
                <Text style={[HelpScreenstyles.text__header]}>Help</Text>
              </TouchableOpacity>
            </View>
            <View style={[{ gap: 10, paddingTop: 20 }]}>
              <Text style={[HelpScreenstyles.text__detail]}>
                Need help or want to get in touch? Find our contact information
                and team details below.
              </Text>
            </View>
          </View>

          <View style={[{ marginTop: 30 }]}>
            <View style={[HelpScreenstyles.cus__box]}>
              <Text style={[HelpScreenstyles.text__topic]}>
                Customer Support
              </Text>
              <View style={[{ gap: 15 }]}>
                <View style={[{ flexDirection: "row", gap: 10 }]}>
                  <View style={[HelpScreenstyles.box__icon]}>
                    <IconFeather name={"phone"} size={15} color={"gray"} />
                  </View>
                  <View>
                    <Text style={[HelpScreenstyles.text__body]}>
                      Contact Number
                    </Text>
                    <Text style={[HelpScreenstyles.text__body_sub]}>
                      0753324234
                    </Text>
                  </View>
                </View>
                <View style={[{ flexDirection: "row", gap: 10 }]}>
                  <View style={[HelpScreenstyles.box__icon]}>
                    <IconMaterialCommunityIcons
                      name={"email-outline"}
                      size={15}
                      color={"gray"}
                    />
                  </View>
                  <View>
                    <Text style={[HelpScreenstyles.text__body]}>
                      Email Address
                    </Text>
                    <Text style={[HelpScreenstyles.text__body_sub]}>
                      Fitjuzz@gmail.com
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[{ marginTop: 30 }]}>
            <View style={[HelpScreenstyles.team__box]}>
              <Text style={[HelpScreenstyles.text__topic]}>Our Team</Text>
              <View style={[{ gap: 15 }]}>
                <View style={[{ flexDirection: "row", gap: 10 }]}>
                  <View style={[HelpScreenstyles.box__img]}>
                    <Image
                      source={{
                        uri: "https://studentscms.spu.ac.th/stdempimg.cfm?empstdtype=STD&vdata=00D7C5E2DE84B2EF062ECBD0D60ECC98C7EB1E0FD4FADF",
                      }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                  <View>
                    <Text style={[HelpScreenstyles.text__body]}>65056986</Text>
                    <Text style={[HelpScreenstyles.text__body_sub]}>
                      Cheewanont Chamnanrob
                    </Text>
                  </View>
                </View>
                <View style={[{ flexDirection: "row", gap: 10 }]}>
                  <View style={[HelpScreenstyles.box__img]}>
                    <Image
                      source={{
                        uri: "https://rukminim2.flixcart.com/image/850/1000/kkwwu4w0/poster/i/j/i/large-doraemon-cartoon-waterproof-vinyl-sticker-poster-can2490-2-original-imagy5enhzahmevc.jpeg?q=20&crop=false",
                      }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                  <View>
                    <Text style={[HelpScreenstyles.text__body]}>65066113</Text>
                    <Text style={[HelpScreenstyles.text__body_sub]}>
                      Rames Wongsuwan
                    </Text>
                  </View>
                </View>
                <View style={[{ flexDirection: "row", gap: 10 }]}>
                  <View style={[HelpScreenstyles.box__img]}>
                    <Image
                      source={{
                        uri: "https://rukminim2.flixcart.com/image/850/1000/kkwwu4w0/poster/i/j/i/large-doraemon-cartoon-waterproof-vinyl-sticker-poster-can2490-2-original-imagy5enhzahmevc.jpeg?q=20&crop=false",
                      }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                  <View>
                    <Text style={[HelpScreenstyles.text__body]}>65059152</Text>
                    <Text style={[HelpScreenstyles.text__body_sub]}>
                      Chaimongkol Nasan
                    </Text>
                  </View>
                </View>
                <View style={[{ flexDirection: "row", gap: 10 }]}>
                  <View style={[HelpScreenstyles.box__img]}>
                    <Image
                      source={{
                        uri: "https://rukminim2.flixcart.com/image/850/1000/kkwwu4w0/poster/i/j/i/large-doraemon-cartoon-waterproof-vinyl-sticker-poster-can2490-2-original-imagy5enhzahmevc.jpeg?q=20&crop=false",
                      }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                  <View>
                    <Text style={[HelpScreenstyles.text__body]}>6505xxxx</Text>
                    <Text style={[HelpScreenstyles.text__body_sub]}>
                      Nopporn Phutjaroen
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpScreen;

const HelpScreenstyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goback__button: {
    width: "100%",
    height: 30,
    borderRadius: 100,
    gap: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  text__header: {
    fontSize: sizes.size_base,
    color: colors.clr_white,
    fontWeight: "bold",
  },
  text__detail: {
    fontSize: sizes.size_xs,
    color: colors.clr_lightgray,
    width: 310,
  },
  dumbbell_top: {
    position: "absolute",
    top: -20,
    right: 0,
    opacity: 0.1,
    zIndex: 0,
    transform: [{ rotate: "-55deg" }],
  },
  dumbbell_middle: {
    position: "absolute",
    top: 20,
    right: 50,
    opacity: 0.2,
    zIndex: 0,
    transform: [{ rotate: "45deg" }],
  },
  dumbbell_bottom: {
    position: "absolute",
    top: 80,
    right: -10,
    opacity: 0.3,
    zIndex: 0,
    transform: [{ rotate: "-50deg" }],
  },
  cus__box: {
    width: "100%",
    height: 150,
    backgroundColor: colors.clr_background_modal,
    borderRadius: 20,
    padding: 20,
    gap: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  box__icon: {
    height: 30,
    width: 30,
    borderRadius: 100,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text__topic: {
    fontSize: sizes.size_xs,
    color: colors.clr_lightgray,
  },
  text__body: {
    fontSize: sizes.size_2xs,
    color: colors.clr_lightgray,
  },
  text__body_sub: {
    fontSize: sizes.size_xs,
    color: colors.clr_lightgray,
  },
  team__box: {
    width: "100%",
    height: 250,
    backgroundColor: colors.clr_background_modal,
    borderRadius: 20,
    padding: 20,
    gap: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  box__img: {
    height: 30,
    width: 30,
    borderRadius: 100,
    backgroundColor: "white",

    overflow: "hidden",
  },
});
