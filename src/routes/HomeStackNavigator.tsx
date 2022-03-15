import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CreateHabitScreen from '../screens/CreateHabitScreen';
import DetailsScreen from '../screens/DetailsScreen';
import EditHabitScreen from '../screens/EditHabitScreen';
import HomeScreen from '../screens/HomeScreen';
import {HomeStackParamList} from '../utils/types';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
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
        name="HomeStack"
        component={HomeScreen}
        options={() => ({
          title: 'Habitlink',
        })}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen
        name="EditHabit"
        component={EditHabitScreen}
        options={() => ({
          title: 'Edit Habit',
        })}
      />
      <Stack.Screen
        name="CreateHabit"
        component={CreateHabitScreen}
        options={() => ({
          title: 'Create Habit',
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
