import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeStackNavigation from './src/navigators/HomeStackNavigation';
import Splash from './src/screens/Splash';
import Entry from './src/screens/Entry';
import Login from './src/screens/Login';
import Main from './src/screens/Main';
import Signup from './src/screens/Signup';
import Video from './src/screens/VideoScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();
type RootStackParamList = {
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
      <RootStack.Navigator initialRouteName="Splash">
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
          options={{headerShown: false}}
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
