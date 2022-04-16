import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AcceptCompetitionScreen from '../screens/AcceptCompetitionScreen';
import CompetitionScreen from '../screens/CompetitionScreen';
import CreateCompetitionScreen from '../screens/CreateCompetitionScreen';
import {CompetitionStackParamList} from '../utils/types';

const Stack = createStackNavigator<CompetitionStackParamList>();

const CompetitionStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CompetitionStack"
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
    </Stack.Navigator>
  );
};

export default CompetitionStackNavigator;
