import * as React from 'react';
import { View } from 'react-native';
import HeaderAlternative from '../components/HeaderAlternative';
import SigninScreen from './SigninScreen';
import SignupScreen from './SignupScreen';
import { useState } from 'react';

export default function MainScreen({}) {

  const [activeScreen, setActiveScreen] = useState('signin');
  
    
  return (
    
    <View style={{flex:1}}>
      <HeaderAlternative 
        activeScreen={activeScreen}
        updateActiveScreen={setActiveScreen}
        isResetPasswordPage={false}
      />
      
      {activeScreen === 'signin' ? <SigninScreen activeScreen={activeScreen} updateActiveScreen={setActiveScreen} /> : <SignupScreen activeScreen={activeScreen} updateActiveScreen={setActiveScreen} />}
      
    </View>
  
  );
}
