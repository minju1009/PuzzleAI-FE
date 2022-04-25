import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mainBlue: string;
    mainDarkGrey: string;
    mainLightGrey: string;
    mainRed: string;

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
