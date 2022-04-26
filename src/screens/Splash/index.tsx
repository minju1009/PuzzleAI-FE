import React from 'react';
import styled from 'styled-components/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = ({navigation}: Props) => {
  return (
    <Container>
      <MainText
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Splash
      </MainText>
    </Container>
  );
};

export default Splash;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.mainBlue};
`;

const MainText = styled.Text`
  font-size: ${({theme}) => theme.fontLarge};
  color: white;
  font-family: 'NotoSansKR-Bold';
`;
