import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {StackActions} from '@react-navigation/native';
import RootTabNavigator from '../routes/RootTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefUserContext } from '../utils/types';
import { User } from '../utils/models';

const AppRouter = () => {
  const [user, setUser] = useState<User>(null);
  const Stack = createNativeStackNavigator();
  
  return (
  		<DefUserContext.Provider value={{user, setUser}}>
        <Stack.Navigator screenOptions={{
    headerShown: false
  }} initialRouteName="RootLoginStack">
          <Stack.Screen name="RootLoginStack" component={LoginScreen} /> 
          <Stack.Screen name="RootHomeStack" component={RootTabNavigator} />
        </Stack.Navigator>
		</DefUserContext.Provider >
  );
};

export default AppRouter;
