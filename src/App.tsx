import 'react-native-gesture-handler';
import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from '../tailwind.json';
import {DefaultTheme, NavigationContainer, StackActions} from '@react-navigation/native';
import RootTabNavigator from './routes/RootTabNavigator';
import LoginScreen from './screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
        <Stack.Navigator screenOptions={{
    headerShown: false
  }} initialRouteName="RootLoginStack">
          <Stack.Screen name="RootLoginStack" component={LoginScreen} /> 
          <Stack.Screen name="RootHomeStack" component={RootTabNavigator} />
        </Stack.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;
