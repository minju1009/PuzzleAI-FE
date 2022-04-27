import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    black: string;
    white: string;
    grayOne: string;
    grayTwo: string;
    grayThree: string;
    redOne: string;
    redTwo: string;

    fontLarge: string;
    fontMedium: string;
    fontRegular: string;
    fontSmall: string;

    weightBold: number;
    weightMedium: number;
    weightRegular: number;

    lineHeightRegular: string;
    lineHeightMicro: stringr;
  }
}
