import React from 'react';
import styled from 'styled-components/native';

const Splash = () => {
  return (
    <Container>
      <MainText>Splash</MainText>
    </Container>
  );
};

export default Splash;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.primary};
`;

const MainText = styled.Text`
  font-size: ${({theme}) => theme.fontLarge};
  color: white;
  font-family: 'NotoSansKR-Bold';
`;
