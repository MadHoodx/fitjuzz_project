import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import NoteScreen from "./src/screens/NoteScreen";
import WelcomeScreen from "./src/screens/WelcomScreen";
import TimerScreen from "./src/screens/TimerScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import MetricScreen from "./src/screens/MetricScreen"
import styles, { colors } from "./src/styles/style";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import MainScreen from "./src/screens/MainScreen";
import ForgetPasswordScreen from "./src/screens/ForgetPasswordScreen";
import ExerciseScreen from "./src/screens/ExerciseScreen";
import GuideScreen from "./src/screens/GuideScreen";
import SteroidsScreen from "./src/screens/SteroidsComponent/SteroidsScreen";
import MacrosScreen from "./src/screens/MacrosScreen";
import CarbScreen from "./src/screens/CarbScreen";
import ProteinScreen from "./src/screens/ProteinScreen";
import FatScreen from "./src/screens/FatScreen";

import SteroidDetailScreen from "./src/screens/SteroidsComponent/SteroidDetailScreen";
import SupplementScreen from "./src/screens/SupplementComponent/SupplementScreen";
import SupplementDetailScreen from "./src/screens/SupplementComponent/SupplementDetailScreen";
import SupplementCategoryScreen from "./src/screens/SupplementComponent/SupplementCategoryScreen";
import SteroidCategoryScreen from "./src/screens/SteroidsComponent/SteroidCategoryScreen";
import EncyclopediaScreen from "./src/screens/EncyclopediaComponent/EncyclopediaScreen";
import EncyclopediaDetailScreen from "./src/screens/EncyclopediaComponent/EncyclopediaDetailScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          ...app.tabBar,
        },
        tabBarActiveTintColor: colors.clr_brightblue,
        tabBarInActiveTintColor: colors.clr_gray,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Icon name={"home"} size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Guide"
        component={GuideScreen}
        options={{
          title: "Guide",
          tabBarIcon: ({ color, size }) => {
            return <Icon name={"menu-book"} size={size} color={color} />;
          },
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.clr_black, // Header background
          },
          headerTintColor: "white", // Header text and back button
          headerTitleStyle: {
            fontWeight: "bold", // Bold title
          },
        }}
      />

      <Tab.Screen
        name="Note"
        component={NoteScreen}
        options={{
          title: "Note",
          tabBarIcon: ({ color, size }) => {
            return <Icon name={"note"} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Timer"
        component={TimerScreen}
        options={{
          title: "Timer",
          tabBarIcon: ({ color, size }) => {
            return <Icon name={"timer"} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => {
            return <IconAntDesign name={"profile"} size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Metric" component={MetricScreen}/>
      <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="Note" component={NoteScreen} />
      <Stack.Screen
        name="Encyclopedia"
        component={EncyclopediaScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.clr_black, // Header background
          },
          headerTintColor: "white", // Header text and back button
          headerTitleStyle: {
            fontWeight: "bold", // Bold title
          },
        }}
      />
         <Stack.Screen
        name="Encyclopedia detail"
        component={EncyclopediaDetailScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.clr_black, // Header background
          },
          headerTintColor: "white", // Header text and back button
          headerTitleStyle: {
            fontWeight: "bold", // Bold title
          },
        }}
      />
      <Stack.Screen
        name="Supplement"
        component={SupplementScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.clr_black, // Header background
          },
          headerTintColor: "white", // Header text and back button
          headerTitleStyle: {
            fontWeight: "bold", // Bold title
          },
        }}
      />
      <Stack.Screen
        name="Supplement category"
        component={SupplementCategoryScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.clr_black, // Header background
          },
          headerTintColor: "white", // Header text and back button
          headerTitleStyle: {
            fontWeight: "bold", // Bold title
          },
        }}
      />
      <Stack.Screen
        name="Supplement detail"
        component={SupplementDetailScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.clr_black, // Header background
          },
          headerTintColor: "white", // Header text and back button
          headerTitleStyle: {
            fontWeight: "bold", // Bold title
          },
        }}
      />

      <Stack.Screen
        name="Steroids"
        component={SteroidsScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.clr_black, // Header background
          },
          headerTintColor: "white", // Header text and back button
          headerTitleStyle: {
            fontWeight: "bold", // Bold title
          },
        }}
      />
      <Stack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.clr_black, // Header background
          },
          headerTintColor: "white", // Header text and back button
          headerTitleStyle: {
            fontWeight: "bold", // Bold title
          },
        }}
      />

      <Stack.Screen name="Guide" component={GuideScreen} />
      <Stack.Screen
        name="Macros"
        component={MacrosScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.clr_black, // Header background
          },
          headerTintColor: "white", // Header text and back button
          headerTitleStyle: {
            fontWeight: "bold", // Bold title
          },
        }}
      />

      <Stack.Screen
        name="Steroid category"
        component={SteroidCategoryScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.clr_black, // Header background
          },
          headerTintColor: "white", // Header text and back button
          headerTitleStyle: {
            fontWeight: "bold", // Bold title
          },
        }}
      />
      <Stack.Screen
        name="Steroid detail"
        component={SteroidDetailScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.clr_black, // Header background
          },
          headerTintColor: "white", // Header text and back button
          headerTitleStyle: {
            fontWeight: "bold", // Bold title
          },
        }}
      />
      <Stack.Screen name="Carb" component={CarbScreen} />
      <Stack.Screen name="Protein" component={ProteinScreen} />
      <Stack.Screen name="Fat" component={FatScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack></MyStack>
    </NavigationContainer>
  );
}

const app = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.clr_background,
    borderColor: "black",
    shadowColor: "white",
    elevation: 16,
  },
});
