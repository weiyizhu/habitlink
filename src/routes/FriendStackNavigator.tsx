import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AddFriendsScreen from '../screens/AddFriendScreen';
import EditHabitScreen from '../screens/EditHabitScreen';
import FriendsScreen from '../screens/FriendsScreen';
import HomeScreen from '../screens/HomeScreen';
import {FriendStackParamList, HomeStackParamList} from '../utils/types';

const Stack = createStackNavigator<FriendStackParamList>();

const FriendStackNavigator = () => {
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
        name="FriendStack"
        component={FriendsScreen}
        options={() => ({
          title: 'Habitlink',
        })}
      />
      <Stack.Screen
        name="AddFriend"
        component={AddFriendsScreen}
        options={() => ({
          title: 'Habitlink',
        })}
      />
    </Stack.Navigator>
  );
};

export default FriendStackNavigator;
