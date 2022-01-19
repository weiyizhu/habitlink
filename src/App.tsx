import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from '../tailwind.json';
import Test from './components/Test';

const App = () => {
  return (
    <TailwindProvider utilities={utilities}>
      <Test />
    </TailwindProvider>
  );
};

export default App;
