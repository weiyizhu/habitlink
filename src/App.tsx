import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from '../tailwind.json';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RootTabNavigator from './routes/RootTabNavigator';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <TailwindProvider utilities={utilities}>
        <RootTabNavigator />
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;
