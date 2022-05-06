import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {ThemeProvider} from 'styled-components';
import theme from 'styles/theme';
import {AuthContextProvider} from 'AuthContext';
import Navigator from '/Navigator';

const ProvidedNavigator = () => {
  return (
    <ThemeProvider theme={{...theme}}>
      <AuthContextProvider>
        <Navigator />
      </AuthContextProvider>
    </ThemeProvider>
  );
};

AppRegistry.registerComponent(appName, () => ProvidedNavigator);
