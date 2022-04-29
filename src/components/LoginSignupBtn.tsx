import React from 'react';
import {GestureResponderEvent} from 'react-native';
import styled, {css} from 'styled-components/native';

interface LoginSignupBtnProps {
  id: string;
  children: JSX.Element;
  navigate: (event: GestureResponderEvent) => void;
}

interface ButtonProps {
  id: string;
}

const LoginSignupBtn = ({navigate, children, id}: LoginSignupBtnProps) => {
  return (
    <Button id={id} onPress={navigate}>
      {children}
    </Button>
  );
};

export default LoginSignupBtn;

const Button = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  margin-bottom: 15px;
  border-radius: 8px;
  ${({id}) =>
    id === 'login'
      ? css`
          background-color: ${({theme}) => theme.primary};
        `
      : css`
          background-color: ${({theme}) => theme.white};
          border: 1px solid ${({theme}) => theme.primary};
        `}
`;
