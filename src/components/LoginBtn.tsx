import React from 'react';
import styled from 'styled-components/native';

const LoginBtn = () => {
  return (
    <Button>
      <Text>로그인</Text>
    </Button>
  );
};

export default LoginBtn;

const Button = styled.TouchableOpacity`
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: ${({theme}) => theme.primary};
`;

const Text = styled.Text`
  padding: 12px 0;
  color: white;
  text-align: center;
  font-size: ${({theme}) => theme.fontRegular};
  font-family: 'NotoSansKR-Bold';
`;
