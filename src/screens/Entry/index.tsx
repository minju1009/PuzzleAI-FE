import React from 'react';
import styled from 'styled-components/native';
import LoginBtn from 'components/LoginBtn';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Entry: undefined;
  Signup: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Entry'>;

const Entry = ({navigation}: Props) => {
  return (
    <ScreenContainer>
      <LogoContainer>
        <Logo
          source={require('/Users/kimminju/Desktop/puzzleAI/Puzzleai/src/assets/images/logo_o.png')}
        />
      </LogoContainer>
      <BtnContainer>
        <LoginBtn />
        <SignUpBtn>
          <SignUpText onPress={() => navigation.navigate('Signup')}>
            회원가입
          </SignUpText>
        </SignUpBtn>
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

const SignUpBtn = styled.TouchableOpacity`
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid ${({theme}) => theme.primary};
  background-color: white;
`;

const SignUpText = styled.Text`
  padding: 12px 0;
  color: ${({theme}) => theme.secondary};
  text-align: center;
  font-family: 'NotoSansKR-Bold';
  font-size: ${({theme}) => theme.fontRegular};
`;
