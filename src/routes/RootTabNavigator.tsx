import React from 'react';
import Competition from '../screens/CompeititionScreen';
import FriendsScreen from '../screens/FriendsScreen';
import Settings from '../screens/SettingsScreen';
import HomeStackNavigator from './HomeStackNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../utils/types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const RootTabNavigator = () => {
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
          fontFamily: "YaldeviColombo-Regular",
        },
        headerStyle: {
          height: 150,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={() => ({
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
          title: 'Habitlink',
        })}
        // example: initialParams={{ userId: user.id }}
      />
      <Tab.Screen
        name="Competition"
        component={Competition}
        options={() => ({
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons
              name="sword-cross"
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={() => ({
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="people" size={size} color={color} />
          ),
          tabBarBadge: 3,
        })}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={() => ({
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="settings-sharp" size={size} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default RootTabNavigator;
