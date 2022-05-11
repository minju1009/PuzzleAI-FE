import React, {createContext, useReducer} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from 'config';

type AuthContextType = {
  userState: {loggedIn: boolean; isLoading: boolean};
  login: (email: string, password: string) => void;
  checkToken: () => void;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const defaultValue = {
  userState: {loggedIn: false, isLoading: true},
  login: () => {},
  checkToken: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

type State = {loggedIn: boolean; isLoading: boolean};
type Action = {type: 'LOG_IN' | 'VALID_TOKEN' | 'LOADING_DONE' | 'LOADING'};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOADING_DONE':
      return {
        ...state,
        isLoading: false,
      };
    case 'VALID_TOKEN':
      return {
        ...state,
        loggedIn: true,
        isLoading: false,
      };
    case 'LOG_IN':
      return {
        ...state,
        loggedIn: true,
      };
  }
}

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
  const [userState, dispatch] = useReducer(reducer, {
    loggedIn: false,
    isLoading: false,
  });

  const authContext = {
    checkToken: async () => {
      // dispatch({type: 'LOADING'});

      try {
        const storedToken = await AsyncStorage.getItem('token');
        const response = await fetch(`${API.checkToken}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: String(storedToken),
          },
        });
        const data = await response.json();
        if (response.status === 400) {
          dispatch({type: 'LOADING_DONE'});
          throw new Error(data.message);
        }
        dispatch({type: 'VALID_TOKEN'});
      } catch (err) {
        throw new Error('Token does not exist in Asyncstorage');
      }
    },
    login: async (email: string, password: string) => {
      const response = await fetch(`${API.login}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.token) {
        storeToken('token', data.token);
        dispatch({type: 'LOG_IN'});
      } else {
        Alert.alert('아이디와 비밀번호를 다시 확인해 주세요');
      }
    },
    userState,
  };

  const storeToken = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw new Error('token 저장 실패');
    }
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
