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
          tabBarIcon: ({ focused, color, size }) => {
            let home__icon = <Icon name={'notifications'} size={size} color={color}/>;
            let note__icon;

            if (route.name === 'Home') {
              home__icon = focused ? 'home' : 'home-outline';
            } 

            // Return the appropriate icon
            return [<Icon name={'notifications'} size={size} color={color}/>, ];
          },
          tabBarActiveTintColor: colors.clr_orange,
          tabBarInActiveTintColor: colors.clr_gray,
        })}
        
        
      >
      <Tab.Screen name="Home" component={HomeScreen} screenOptions={{tabBarIcon: 'home'}}/>
      <Tab.Screen name="Note" component={NoteScreen} />
      <Tab.Screen name="Timer" component={TimerScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

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