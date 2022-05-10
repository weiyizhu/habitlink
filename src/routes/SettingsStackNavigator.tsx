import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SettingsScreen from '../screens/SettingsScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

const SettingsStackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 48,
          fontFamily: 'YaldeviColombo-SemiBold',
        },
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          left: 20,
        },
        headerBackTitleStyle: {
          fontFamily: 'YaldeviColombo-SemiBold',
        },
        headerStyle: {
          height: 150,
        },
        headerRightContainerStyle: {
          paddingLeft: 15,
        },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="SettingsStack"
        component={SettingsScreen}
        options={() => ({
          title: 'Settings',
        })}
      />
      <Stack.Screen
        name="AboutUsStack"
        component={AboutUsScreen}
        options={() => ({title: 'Settings'})}
        />
      <Stack.Screen
        name="ResetStack"
        component={ResetPasswordScreen}
        options={() => ({
          title: 'Settings',
        })}
      />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
