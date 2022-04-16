import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AcceptCompetitionScreen from '../screens/AcceptCompetitionScreen';
import CompetitionEndScreen from '../screens/CompetitionEndScreen';
import CompetitionScreen from '../screens/CompetitionScreen';
import CreateCompetitionScreen from '../screens/CreateCompetitionScreen';
import {isCompetitionFinished, useUserContext} from '../utils/fn';
import {CompetitionStackParamList} from '../utils/types';

const Stack = createStackNavigator<CompetitionStackParamList>();

const CompetitionStackNavigator = () => {
  const {user} = useUserContext();
  const initialRouteName = isCompetitionFinished(user)
    ? 'CompetitionEnd'
    : 'CompetitionStack';

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
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
        // headerRightContainerStyle: {
        //   paddingLeft: 15,
        // },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="CompetitionStack"
        component={CompetitionScreen}
        options={() => ({
          title: 'Competition',
        })}
      />
      <Stack.Screen
        name="CreateCompetition"
        component={CreateCompetitionScreen}
        options={() => ({
          title: 'Details',
        })}
      />
      <Stack.Screen
        name="AcceptCompetition"
        component={AcceptCompetitionScreen}
        options={() => ({
          title: 'Details',
        })}
      />
      <Stack.Screen
        name="CompetitionEnd"
        component={CompetitionEndScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default CompetitionStackNavigator;
