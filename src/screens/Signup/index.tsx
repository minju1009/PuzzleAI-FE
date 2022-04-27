import React from 'react';
import styled from 'styled-components/native';

const Signup = () => {
  return (
    <ScreenContainer>
      <Header>
        <SignupText>회원가입</SignupText>
        <GoBackBtn
          source={require('/Users/kimminju/Desktop/puzzleAI/Puzzleai/src/assets/images/arrow_left.png')}
        />
      </Header>
      <Body>
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
          <InputBox
            placeholder="비밀번호를 다시 입력해주세요"
            secureTextEntry
          />
          <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>
        </InputWrapper>
      </Body>
      <ButtonContainer>
        <SignupBtn>
          <Text>가입완료</Text>
        </SignupBtn>
      </ButtonContainer>
    </ScreenContainer>
  );
};

export default Signup;

const ScreenContainer = styled.View`
  flex: 1;
  padding: 30px 27px 60px 33px;
  background-color: white;
`;

const Header = styled.View`
  flex: 0.5;
  justify-content: center;
  margin-top: 21px;
`;

const SignupText = styled.Text`
  margin: 0 auto;
  font-size: ${({theme}) => theme.fontRegular};
  font-family: 'NotoSansKR-Medium';
`;

const GoBackBtn = styled.Image`
  position: absolute;
  width: 16px;
  height: 17px;
`;

const Body = styled.View`
  flex: 5;
  margin-top: 30px;
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

  &: ::placeholder{
    color: ${({theme}) => theme.grayOne};
  }
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

const ButtonContainer = styled.View`
  flex: 1.5;
`;

const SignupBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  width: 100%;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: ${({theme}) => theme.grayOne};
`;

const Text = styled.Text`
  padding: 12px 0;
  color: white;
  text-align: center;
  font-size: ${({theme}) => theme.fontRegular};
  font-family: 'NotoSansKR-Bold';
`;
