import React from 'react';
import {Platform} from 'react-native';
import styled, {css} from 'styled-components/native';

interface LoginSignupBtnProps {
  text: string;
  bgColor: string;
  textColor: string;
  borderColor?: string;
  onPress?: any;
}

interface ButtonProps {
  bgColor: string;
  borderColor: string;
}

interface TextProps {
  textColor: string;
}

const LoginSignupBtn = ({
  text,
  bgColor,
  textColor,
  borderColor,
}: LoginSignupBtnProps) => {
  return (
    <Button bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      <Text textColor={textColor}>{text}</Text>
    </Button>
  );
};

export default LoginSignupBtn;

const Button = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid ${({borderColor}) => borderColor};
  border-radius: 8px;
  background-color: ${({bgColor}) => bgColor};
`;

const Text = styled.Text<TextProps>`
  ${Platform.select({
    ios: css`
      padding: 12px;
    `,
  })}
  color: ${({textColor}) => textColor};
  text-align: center;
  font-size: ${({theme}) => theme.fontRegular};
  font-family: 'NotoSansKR-Bold';
`;
