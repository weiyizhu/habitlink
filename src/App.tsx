import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from '../tailwind.json';
import {NavigationContainer} from '@react-navigation/native';
import RootTabNavigator from './routes/RootTabNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <TailwindProvider utilities={utilities}>
        <RootTabNavigator />
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;
