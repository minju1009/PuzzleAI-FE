import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/navigation';
import styled, {css} from 'styled-components/native';
import API from 'config';

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;
interface ButtonProps {
  bgColor: string;
}

const Signup = ({navigation}: SignupProps) => {
  const [userInput, setUserInput] = useState({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [checkEmailUniqueness, setCheckEmailUniqueness] = useState('');

  const {lastName, firstName, email, password, passwordCheck} = userInput;

  const handleUserInput = (key: string) => (text: string) => {
    setUserInput({...userInput, [key]: text});
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(`API.signup?email=${email}`)
        .then(res => res.json())
        .then(data => setCheckEmailUniqueness(data.email));
    };
    const debounce = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(debounce);
  }, [email]);

  const checkEmailValidation = (emailAddress: string) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailRegex.test(emailAddress);
  };

  const emailErrorMsg = checkEmailValidation(email)
    ? checkEmailUniqueness === 'This field must be unique.'
      ? '존재하는 이메일 주소입니다.'
      : ''
    : '잘못된 이메일 형식입니다.';

  const checkPwValidation = (pw: string) => {
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    return pwRegex.test(pw) && pw.length > 0;
  };

  const validator = {
    email:
      checkEmailValidation(email) &&
      checkEmailUniqueness !== 'This field must be unique',
    password: checkPwValidation(password),
    passwordCheck: password === passwordCheck,
  };

  const isEverythingValid =
    lastName &&
    firstName &&
    validator.email &&
    validator.password &&
    validator.passwordCheck;

  const submitUserInput = () => {
    fetch(API.signup, {
      method: 'POST',
      body: JSON.stringify({
        last_name: lastName,
        first_name: firstName,
        email: email,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(data => data.email === email && navigation.navigate('Login'));
  };

  return (
    <ScrollView>
      <ScreenContainer>
        <Name>
          <NameWrapper>
            <Title>성</Title>
            <InputBox
              placeholder="성을 입력해주세요"
              autoCorrect={false}
              value={userInput.lastName}
              onChangeText={handleUserInput('lastName')}
            />
          </NameWrapper>
          <NameWrapper>
            <Title>이름</Title>
            <InputBox
              placeholder="이름을 입력해주세요"
              autoCorrect={false}
              value={userInput.firstName}
              onChangeText={handleUserInput('firstName')}
            />
          </NameWrapper>
        </Name>
        <InputWrapper>
          <Title>이메일</Title>
          <InputBox
            placeholder="이메일을 입력해주세요"
            keyboardType="email-address"
            autoCapitalize="none"
            value={userInput.email}
            onChangeText={handleUserInput('email')}
          />
          {email.length > 0 && <ErrorMsg>{emailErrorMsg}</ErrorMsg>}
        </InputWrapper>
        <InputWrapper>
          <Title>비밀번호</Title>
          <InputBox
            placeholder="비밀번호를 입력해주세요"
            textContentType="password"
            secureTextEntry
            value={userInput.password}
            onChangeText={handleUserInput('password')}
          />
          {password.length > 0 && (
            <ErrorMsg>
              {validator.password
                ? ''
                : '숫자와 영문자,특수문자 조합 8자를 입력해주세요'}
            </ErrorMsg>
          )}
        </InputWrapper>
        <InputWrapper>
          <Title>비밀번호 확인</Title>
          <InputBox
            placeholder="비밀번호를 다시 입력해주세요"
            secureTextEntry
            value={userInput.passwordCheck}
            onChangeText={handleUserInput('passwordCheck')}
          />
          {password.length > 0 && passwordCheck.length > 0 && (
            <ErrorMsg>
              {validator.passwordCheck ? '' : '비밀번호가 일치하지 않습니다.'}
            </ErrorMsg>
          )}
        </InputWrapper>

        <CompleteSignupBtn
          disabled={!isEverythingValid}
          onPress={() => {
            submitUserInput();
          }}
          bgColor={isEverythingValid ? '#065e85' : '#c4c4c4'}>
          <CompleteSignupText>가입완료</CompleteSignupText>
        </CompleteSignupBtn>
      </ScreenContainer>
    </ScrollView>
  );
};

export default Signup;

const ScrollView = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const ScreenContainer = styled.View`
  flex: 1;
  padding: 30px 27px 50px 33px;
  background-color: white;
  justify-content: space-between;
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

const ErrorMsg = styled.Text`
  margin: 7px 15px 0;
  color: ${({theme}) => theme.redOne};
  font-size: 12px;
  line-height: ${({theme}) => theme.lineHeightMicro};
  font-family: 'NotoSansKR-Medium';
`;

const Name = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const NameWrapper = styled(InputWrapper)`
  width: 48%;
`;

const CompleteSignupBtn = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  border-radius: 8px;
  background-color: ${({bgColor}) => bgColor};
  color: white;
`;

const CompleteSignupText = styled.Text`
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
