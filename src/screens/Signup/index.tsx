import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/navigation';
import styled, {css} from 'styled-components/native';
import API from 'config';
import eyeOff from 'assets/images/eye_off.png';
import eyeOn from 'assets/images/eye_on.png';

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
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const initialRender = useRef(true);
  const [isEverythingValid, setIsEverythingValid] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showPwCheck, setShowPwCheck] = useState(false);

  const {lastName, firstName, email, password, passwordCheck} = userInput;

  const handleShowPw = () => {
    setShowPw(prev => !prev);
  };

  const handleShowPwCheck = () => {
    setShowPwCheck(prev => !prev);
  };

  const handleUserInput = (text: string, key: string) => {
    setUserInput({...userInput, [key]: text});
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const checkIsUnique = () => {
        fetch(`${API.signup}?email=${email}`)
          .then(res => res.json())
          .then(data => {
            data.email === 'This field must be unique' &&
              setIsEmailUnique(false);
          });
      };
      const debounce = setTimeout(() => checkIsUnique(), 500);
      return () => clearTimeout(debounce);
    }
  }, [email]);

  const validateEmail = useMemo(() => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailRegex.test(email);
  }, [email]);

  const validatePw = useMemo(() => {
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    return pwRegex.test(password);
  }, [password]);

  const validatePwCheck = useMemo(() => {
    return password === passwordCheck;
  }, [password, passwordCheck]);

  useEffect(() => {
    if (
      lastName &&
      firstName &&
      validateEmail &&
      validatePw &&
      validatePwCheck
    ) {
      setIsEverythingValid(true);
    }
  }, [lastName, firstName, validateEmail, validatePw, validatePwCheck]);

  const submitUserInput = () => {
    fetch(`${API.signup}`, {
      method: 'POST',
      body: JSON.stringify({
        last_name: lastName,
        first_name: firstName,
        email,
        password,
      }),
    })
      .then(res => res.json())
      .then(data => data.email === email && navigation.navigate('Login'));
    console.log('submit');
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
              onChangeText={(text: string) => {
                handleUserInput(text, 'lastName');
              }}
            />
          </NameWrapper>
          <NameWrapper>
            <Title>이름</Title>
            <InputBox
              placeholder="이름을 입력해주세요"
              autoCorrect={false}
              value={userInput.firstName}
              onChangeText={(text: string) => {
                handleUserInput(text, 'firstName');
              }}
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
            onChangeText={(text: string) => {
              handleUserInput(text, 'email');
            }}
          />
          {email.length > 0 && (
            <ErrorMsg>
              {validateEmail
                ? !isEmailUnique && '존재하는 이메일 주소입니다.'
                : '잘못된 이메일 형식입니다.'}
            </ErrorMsg>
          )}
        </InputWrapper>
        <InputWrapper>
          <Title>비밀번호</Title>
          <InputWithIcon>
            <InputBox
              placeholder="비밀번호를 입력해주세요"
              textContentType="password"
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
          {password.length > 0 && (
            <ErrorMsg>
              {!validatePw && '숫자와 영문자,특수문자 조합 8자를 입력해주세요'}
            </ErrorMsg>
          )}
        </InputWrapper>
        <InputWrapper>
          <Title>비밀번호 확인</Title>
          <InputWithIcon>
            <InputBox
              placeholder="비밀번호를 다시 입력해주세요"
              secureTextEntry={!showPwCheck}
              value={userInput.passwordCheck}
              onChangeText={(text: string) => {
                handleUserInput(text, 'passwordCheck');
              }}
            />
            <IconWrapper onPress={handleShowPwCheck}>
              <Icon source={showPwCheck ? eyeOn : eyeOff} />
            </IconWrapper>
          </InputWithIcon>
          {password.length > 0 && passwordCheck.length > 0 && (
            <ErrorMsg>
              {!validatePwCheck && '비밀번호가 일치하지 않습니다.'}
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
  object-fit: contain;
`;
