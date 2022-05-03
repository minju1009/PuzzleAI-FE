import React, {useState} from 'react';
import styled, {css} from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/navigation';
import logo from '/assets/images/logo.png';
import LoginSignupBtn from 'components/LoginSignupBtn';
import {Platform} from 'react-native';
import eyeOn from 'assets/images/eye_on.png';
import eyeOff from 'assets/images/eye_off.png';
import {ScrollView} from 'react-native-gesture-handler';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: LoginProps) => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });
  const [showPw, setShowPw] = useState(false);

  const handleShowPw = () => {
    setShowPw(prev => !prev);
  };

  const handleUserInput = (text: string, key: string) => {
    setUserInput({...userInput, [key]: text});
  };

  return (
    <ScreenContainer behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <LogoContainer>
        <Logo source={logo} />
      </LogoContainer>
      <ScrollView bounces={false}>
        <FormContainer>
          <InputWrapper>
            <Title>이메일</Title>
            <InputBox
              placeholder="이메일을 입력해주세요"
              keyboardType="email-address"
              autoCapitalize="none"
              value={userInput.email}
              onChangeText={(text: string) => {
                handleUserInput(text, 'email');
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <Title>비밀번호</Title>
            <InputWithIcon>
              <InputBox
                placeholder="비밀번호를 다시 입력해주세요"
                secureTextEntry={!showPw}
                value={userInput.password}
                onChangeText={(text: string) => {
                  handleUserInput(text, 'password');
                }}
              />
              <IconWrapper onPress={handleShowPw}>
                <Icon source={showPw ? eyeOn : eyeOff} />
              </IconWrapper>
            </InputWithIcon>
          </InputWrapper>
        </FormContainer>
      </ScrollView>
      <BtnContainer>
        <LoginSignupBtn id="login" navigate={() => navigation.navigate('Main')}>
          <LoginText>로그인</LoginText>
        </LoginSignupBtn>
      </BtnContainer>
    </ScreenContainer>
  );
};

export default Login;

const ScreenContainer = styled.KeyboardAvoidingView`
  flex: 1;
  padding: 0 30px 60px 30px;
  background-color: white;
`;

const LogoContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const Logo = styled.Image`
  width: 156.8px;
  height: 60px;
  margin: 0 auto;
`;

const FormContainer = styled.View`
  flex: 4;
  padding-top: 104px;
`;

const BtnContainer = styled.View`
  flex: 1;
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

const InputWrapper = styled.View`
  margin-bottom: 20px;
`;

const Title = styled.Text`
  margin-bottom: 7px;
  font-size: 12px;
  line-height: ${({theme}) => theme.lineHeightMicro};
  font-family: 'NotoSansKR-Medium';
`;

const InputBox = styled.TextInput`
  padding: 15px;
  border: 1px solid ${({theme}) => theme.grayOne};
  border-radius: 8px;
  font-size: ${({theme}) => theme.fontSmall};
  line-height: ${({theme}) => theme.lineHeightMicro};
  font-family: 'NotoSansKR-Medium';
`;

const InputWithIcon = styled.View`
  justify-content: center;
`;

const IconWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 15.3px;
  width: 18px;
  height: 14px;
`;

const Icon = styled.Image`
  width: 100%;
  height: 100%;
`;
