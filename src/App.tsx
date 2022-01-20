import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from '../tailwind.json';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './routes/TabNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <TailwindProvider utilities={utilities}>
        <TabNavigator />
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;
