import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import NoteScreen from './screens/NoteScreen';
import SigninScreen from './screens/SigninScreen';
import WelcomeScreen from './screens/WelcomScreen';
import TimerScreen from './screens/TimerScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Note" component={NoteScreen} />
      <Tab.Screen name="Timer" component={TimerScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

    </Tab.Navigator>
  );
}

function MyStack() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }} 
        initialRouteName='MyTabs'>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="MyTabs" component={MyTabs} />
          
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

