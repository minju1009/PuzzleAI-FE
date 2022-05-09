import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from 'screens/Splash';
import Entry from 'screens/Entry';
import Login from 'screens/Login';
import Main from 'screens/Main';
import Signup from 'screens/Signup';
import Video from 'screens/VideoScreen';
import {AuthContext} from 'AuthContext';

const RootStack = createNativeStackNavigator();

const Navigator = () => {
  const {userState, checkToken} = useContext(AuthContext);

  useEffect(() => {
    checkToken();
  }, []);

  if (userState.isLoading) {
    return <Splash />;
  }

  // TODO: Main화면 작업 위해 state변경, 추후 느낌표 삭제할 것
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Entry">
        {!userState.loggedIn ? (
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
