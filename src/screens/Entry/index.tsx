import React from 'react';
import {Platform} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/navigation';
import styled, {css} from 'styled-components/native';
import LoginSignupBtn from 'components/LoginSignupBtn';
import logo from '/Users/kimminju/Desktop/puzzleAI/Puzzleai/src/assets/images/logo.png';

type Props = NativeStackScreenProps<RootStackParamList, 'Entry'>;

const Entry = ({navigation}: Props) => {
  const changeScreen = (path: 'Login' | 'Signup') => {
    navigation.navigate(path);
  };

  return (
    <ScreenContainer>
      <LogoContainer>
        <Logo source={logo} />
      </LogoContainer>
      <BtnContainer>
        <LoginSignupBtn
          id="login"
          navigate={() => {
            changeScreen('Login');
          }}>
          <LoginText>로그인</LoginText>
        </LoginSignupBtn>
        <LoginSignupBtn
          id="signup"
          navigate={() => {
            changeScreen('Signup');
          }}>
          <SignupText>회원가입</SignupText>
        </LoginSignupBtn>
      </BtnContainer>
    </ScreenContainer>
  );
};

export default Entry;

const ScreenContainer = styled.View`
  flex: 1;
  padding: 0 30px;
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

const LoginText = styled.Text`
  ${Platform.select({
    ios: css`
      padding: 12px;
    `,
  })}
  color: ${({theme}) => theme.white};
  text-align: center;
  font-size: ${({theme}) => theme.fontRegular};
  font-family: 'NotoSansKR-Bold';
`;

const SignupText = styled(LoginText)`
  color: ${({theme}) => theme.secondary};
`;
