import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import BottomTabNavigator from './BottomTabNavigator';
import AppIntroScreen from '../screens/AppIntroScreen';

const RootStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="RootLoginStack"
    >
      <Stack.Screen name="RootLoginStack" component={LoginScreen} />
      <Stack.Screen name="RootHomeStack" component={BottomTabNavigator} />
      <Stack.Screen name="RootCreateStack" component={CreateAccountScreen} />
      <Stack.Screen name="RootAppIntroStack" component={AppIntroScreen} />
      <Stack.Screen name="RootForgotStack" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
