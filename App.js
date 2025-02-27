import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import NoteScreen from './screens/NoteScreen';
import SigninScreen from './screens/SigninScreen';
import WelcomeScreen from './screens/WelcomScreen';
import TimerScreen from './screens/TimerScreen';
import ProfileScreen from './screens/ProfileScreen';
import {colors, sizes} from './styles/style'
import Icon from 'react-native-vector-icons/MaterialIcons';

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
          tabBarActiveTintColor: colors.clr_orange,
          tabBarInActiveTintColor: colors.clr_gray,
        })}
        
        
      >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) => {
          return <Icon name={'home'} size={size} color={color}/>;
        },
      }}/>
            

      <Tab.Screen name="Note" component={NoteScreen} options={{
        title: 'Note',
        tabBarIcon: ({ color, size }) => {
          return <Icon name={'note'} size={size} color={color}/>;
        },
      }}/>
      <Tab.Screen name="Timer" component={TimerScreen} options={{
        title: 'Timer',
        tabBarIcon: ({ color, size }) => {
          return <Icon name={'timer'} size={size} color={color}/>;
        },
      }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => {
          return <Icon name={'user'} size={size} color={color}/>;
        },
      }}/> 

    </Tab.Navigator>
  );
}

function MyStack() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }} 
        initialRouteName='Welcome'>
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


const app = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.clr_white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 60,
    marginBottom: 20,
    shadowColor: 'red',
    elevation: 5,
  
  },
});