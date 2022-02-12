import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import DetailsScreen from '../screens/DetailsScreen';
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
        // header: ({navigation, route, options, back}) => {
        //   const title = getHeaderTitle(options, route.name);
        //   return (
        //     <CustomHeader title={title}/>
        //   )
        // },
        // header: ({navigation, route, options, layout, back}) => (
        //   <CustomHeader title={''} />
        // ),
        headerBackTitleStyle: {
          fontFamily: 'YaldeviColombo-SemiBold',
        },
        headerStyle: {
          height: 150,
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={() => ({
          title: 'Habitlink',
        })}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
