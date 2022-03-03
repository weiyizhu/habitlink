import 'react-native-gesture-handler';
import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from '../tailwind.json';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RootTabNavigator from './routes/RootTabNavigator';
import LoginScreen from './screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppRouter from './components/AppRouter';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer theme={MyTheme}>
      <TailwindProvider utilities={utilities}>
        <AppRouter />
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;
