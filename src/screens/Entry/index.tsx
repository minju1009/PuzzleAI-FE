import React from 'react';
import styled from 'styled-components/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import LoginSigunupBtn from 'components/LoginSignupBtn';
import logo from './../../assets/images/logo.png';

type RootStackParamList = {
  Entry: undefined;
  Login: undefined;
  Signup: undefined;
};

type EntryProps = NativeStackScreenProps<RootStackParamList, 'Entry'>;

const Entry = ({navigation}: EntryProps) => {
  const onPress = (path: any) => {
    navigation.navigate(path);
  };
  return (
    <ScreenContainer>
      <LogoContainer>
        <Logo source={logo} />
      </LogoContainer>
      <BtnContainer>
        <LoginSigunupBtn
          text="로그인"
          bgColor="#065e85"
          textColor="white"
          onPress={onPress('Login')}
        />
        <LoginSigunupBtn
          text="회원가입"
          bgColor="white"
          borderColor="#065e85"
          textColor="#004d73"
          onPress={onPress('Signup')}
        />
      </BtnContainer>
    </ScreenContainer>
  );
};

export default Entry;

const ScreenContainer = styled.View`
  flex: 1;
  padding: 24px 30px;
  background-color: white;
`;

const LogoContainer = styled.View`
  flex: 3;
`;

const BtnContainer = styled.View`
  flex: 1;
`;

const Logo = styled.Image`
  position: relative;
  top: 248px;
  width: 156.8px;
  height: 60px;
  margin: 0 auto;
`;
