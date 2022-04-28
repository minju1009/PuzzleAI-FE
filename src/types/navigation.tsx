export type RootStackParamList = {
  Splash: undefined;
  Entry: undefined;
  Login: undefined;
  Main: undefined;
  Signup: undefined;
  Video: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
