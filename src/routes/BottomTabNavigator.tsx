import React from 'react';
import FriendsScreen from '../screens/FriendsScreen';
import Settings from '../routes/SettingsStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../utils/types';
import FriendStackNavigator from './FriendStackNavigator';
import { useUserContext } from '../utils/fn';
import CompetitionStackNavigator from './CompetitionStackNavigator';

const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  const {friendRequests} = useUserContext();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        tabBarActiveTintColor: '#637081',
        tabBarInactiveTintColor: '#A7A7A7',
        tabBarShowLabel: false,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 48,
          fontFamily: 'YaldeviColombo-SemiBold',
        },
        headerStyle: {
          height: 150,
        },
        headerTitleAlign: 'center',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={() => ({
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
          headerShown: false,
        })}
        // example: initialParams={{ userId: user.id }}
      />
      <Tab.Screen
        name="Competition"
        component={CompetitionStackNavigator}
        options={() => ({
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons
              name="sword-cross"
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Friends"
        component={FriendStackNavigator}
        options={() => ({
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="people" size={size} color={color} />
          ),
          headerShown: false,
          tabBarBadge: (friendRequests.length == 0) ? undefined: friendRequests.length,
        })}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={() => ({
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="settings-sharp" size={size} color={color} />
          ),
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
