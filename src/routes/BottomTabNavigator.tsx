import React from 'react';
import FriendsScreen from '../screens/FriendsScreen';
import Settings from '../routes/SettingsStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../utils/types';
import FriendStackNavigator from './FriendStackNavigator';
import {useUserContext} from '../utils/fn';
import CompetitionStackNavigator from './CompetitionStackNavigator';
import moment from 'moment';

const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  const {user, friendRequests} = useUserContext();

  const badgeCalculation = () => {
    if (user?.competition && Object.keys(user.competition).length > 0) {
      const momentEnd = moment(
        user?.competition.endDate.toDate(),
        'YYYY-MM-DD',
      );
      const today = moment(new Date(moment().format('LL')));
      return today > momentEnd ? '' : undefined;
    }

    return user?.competitionRequests.length === 0
      ? undefined
      : user?.competitionRequests.length;
  };

  const competitionColor = (focused: boolean, color: string) => {
    if (!(user?.competition && Object.keys(user.competition).length > 0)) {
      return color;
    }

    return focused ? '#D6112B' : '#9C5151';
  };

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
              color={competitionColor(focused, color)}
            />
          ),
          headerShown: false,
          tabBarBadge: badgeCalculation(),
          tabBarBadgeStyle: badgeCalculation() === '' && {
            minWidth: 12,
            minHeight: 12,
            maxWidth: 12,
            maxHeight: 12,
            borderRadius: 6,
            marginLeft: 4,
          },
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
          tabBarBadge:
            friendRequests.length === 0 ? undefined : friendRequests.length,
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
