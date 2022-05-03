import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from 'screens/Splash';
import Entry from 'screens/Entry';
import Login from 'screens/Login';
import Main from 'screens/Main';
import Signup from 'screens/Signup';
import Video from 'screens/VideoScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext, AuthContextType} from 'AuthContext';

const RootStack = createNativeStackNavigator();

const Navigator = () => {
  const {loggedIn, setLoggedIn} = useContext(AuthContext) as AuthContextType;

  // TODO : 저장된 토큰을 삭제하는 함수, 토큰 저장 테스트 시 사용
  // const removeValue = async () => {
  //   try {
  //     await AsyncStorage.removeItem('token');
  //   } catch (error) {
  //     throw new Error('there is no token');
  //   }
  // };
  // removeValue();

  useEffect(() => {
    const getToken = async () => {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setLoggedIn(true);
      }
    };
    getToken();
  }, [setLoggedIn]);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Entry">
        {loggedIn ? (
          <>
            <RootStack.Screen
              name="Main"
              component={Main}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Video"
              component={Video}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Splash"
              component={Splash}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name="Entry"
              component={Entry}
              options={{headerShown: false}}
            />

            <RootStack.Screen
              name="Login"
              component={Login}
              options={{title: ''}}
            />
            <RootStack.Screen
              name="Signup"
              component={Signup}
              options={{title: '회원가입', headerTitleAlign: 'center'}}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
