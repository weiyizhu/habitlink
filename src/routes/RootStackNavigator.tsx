import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {HomeStackParamList} from '../utils/types';
import BottomTabNavigator from './BottomTabNavigator';

const RootStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="RootLoginStack">
      <Stack.Screen name="RootLoginStack" component={LoginScreen} />
      <Stack.Screen name="RootHomeStack" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
