import React from 'react';
import {Platform} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/navigation';
import styled, {css} from 'styled-components/native';
import LoginSignupBtn from 'components/LoginSignupBtn';
import doctorIllu from 'assets/images/illu_01.png';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

const Main = ({navigation}: Props) => {
  return (
    <ScreenContainer>
      <Header>
        <HeaderText>이제 모바일로</HeaderText>
        <HeaderMainText>편하게 상담받으세요.</HeaderMainText>
        <Description>언제 어디서든지 전문의에게 상담받으세요.</Description>
      </Header>
      <Picture>
        <IlluWrapper>
          <Illu source={doctorIllu} resizeMode="contain" />
        </IlluWrapper>
      </Picture>
      <BtnContainer>
        <LoginSignupBtn
          id="login"
          navigate={() => navigation.navigate('Video')}>
          <ConnectText>화상연결</ConnectText>
        </LoginSignupBtn>
      </BtnContainer>
    </ScreenContainer>
  );
};

export default Main;

const ScreenContainer = styled.KeyboardAvoidingView`
  flex: 1;
  padding: 73px 30px 50px 30px;
  ${Platform.select({
    ios: css`
      padding-top: 97px;
    `,
  })}
  background-color: white;
`;

const Header = styled.View`
  flex: 1;
`;

const HeaderText = styled.Text`
  color: ${({theme}) => theme.grayTwo};
  line-height: 33px;
  font-size: ${({theme}) => theme.fontMedium};
  font-family: 'NotoSansKR-Regular';
`;

const HeaderMainText = styled.Text`
  margin-bottom: 12px;
  color: ${({theme}) => theme.primary};
  line-height: 38px;
  font-size: ${({theme}) => theme.fontLarge};
  font-family: 'NotoSansKR-Medium';
`;

const Description = styled.Text`
  color: ${({theme}) => theme.grayTwo};
  line-height: 18px;
  font-family: 'NotoSansKR-Regular';
`;

const Picture = styled.View`
  flex: 4;
`;

const IlluWrapper = styled.View`
  padding: 44px;
`;

const Illu = styled.Image`
  width: 100%;
  height: 100%;
`;

const BtnContainer = styled.View`
  flex: 0.7;
  justify-content: flex-end;
`;

const ConnectText = styled.Text`
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
