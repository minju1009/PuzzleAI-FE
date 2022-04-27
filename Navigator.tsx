import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from 'screens/Splash';
import Entry from 'screens/Entry';
import Login from 'screens/Login';
import Main from 'screens/Main';
import Signup from 'screens/Signup';
import Video from 'screens/VideoScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();
export type RootStackParamList = {
  Splash: undefined;
  Entry: undefined;
  Login: undefined;
  Main: undefined;
  Signup: undefined;
  Video: undefined;
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Entry">
        <RootStack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Entry"
          component={Entry}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Signup"
          component={Signup}
          options={{title: '회원가입', headerTitleAlign: 'center'}}
        />
        <RootStack.Screen
          name="Video"
          component={Video}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
