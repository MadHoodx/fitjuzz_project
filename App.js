import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import WelcomeScreen from './screens/WelcomScreen';
import TimerScreen from './screens/TimerScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Signin" component={SigninScreen} />
      <Tab.Screen name="Timer" component={TimerScreen} />

    </Tab.Navigator>
  );
}

function MyStack() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
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

