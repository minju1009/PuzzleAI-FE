import React from 'react';
import styled, {css} from 'styled-components/native';
import {Platform} from 'react-native';

const Signup = () => {
  return (
    <ScreenContainer>
      <Name>
        <NameWrapper>
          <Title>성</Title>
          <InputBox placeholder="성을 입력해주세요" autoCorrect={false} />
        </NameWrapper>
        <NameWrapper>
          <Title>이름</Title>
          <InputBox placeholder="이름을 입력해주세요" autoCorrect={false} />
        </NameWrapper>
      </Name>
      <InputWrapper>
        <Title>이메일</Title>
        <InputBox
          placeholder="이메일을 입력해주세요"
          keyboardType="email-address"
        />
        <ErrorMsg>존재하는 이메일 주소입니다.</ErrorMsg>
      </InputWrapper>
      <InputWrapper>
        <Title>비밀번호</Title>
        <InputBox
          placeholder="비밀번호를 입력해주세요"
          textContentType="password"
          secureTextEntry
        />
        <ErrorMsg>숫자와 영문자 조합 8자를 입력해 주세요.</ErrorMsg>
      </InputWrapper>
      <InputWrapper>
        <Title>비밀번호 확인</Title>
        <InputBox placeholder="비밀번호를 다시 입력해주세요" secureTextEntry />
        <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>
      </InputWrapper>
      <CompleteSignupBtn>
        <CompleteSignupText>가입완료</CompleteSignupText>
      </CompleteSignupBtn>
    </ScreenContainer>
  );
};

export default Signup;

const ScreenContainer = styled.View`
  flex: 1;
  padding: 30px 27px 50px 33px;
  background-color: white;
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

const CompleteSignupBtn = styled.TouchableOpacity`
  width: 100%;
  border-radius: 8px;
  background-color: ${({theme}) => theme.grayOne};
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
