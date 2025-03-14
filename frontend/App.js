import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen'
import NoteScreen from './src/screens/NoteScreen';
import WelcomeScreen from './src/screens/WelcomScreen';
import TimerScreen from './src/screens/TimerScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import styles, { colors } from './src/styles/style'
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import MainScreen from './src/screens/MainScreen';
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';
import ExerciseScreen from './src/screens/ExerciseScreen'

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
        name="Exercise"
        component={ExerciseScreen}
        options={{
          title: "Exercise",
          tabBarIcon: ({ color, size }) => {
            return <Icon name={"sports-gymnastics"} size={size} color={color} />;
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

    <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName='Welcome'>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="Note" component={NoteScreen} />
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
    borderColor: 'black',
    shadowColor: 'white',
    elevation: 16



  },
});
