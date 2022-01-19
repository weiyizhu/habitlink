import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from '../tailwind.json';
import Test from './components/Test';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <TailwindProvider utilities={utilities}>
        <Test />
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;
