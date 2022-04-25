import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './src/screens/Splash';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Entry from './src/screens/Entry';
import Login from './src/screens/Login';
import Main from './src/screens/Main';
import Signup from './src/screens/Signup';
import Video from './src/screens/Video';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Entry"
          component={Entry}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Video"
          component={Video}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
