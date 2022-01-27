import React from 'react';
import {Button, Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import HabitItem from '../components/HabitItem';
import {HomeScreenProp} from '../utils/types';

const HomeScreen = ({route, navigation}: HomeScreenProp) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 p-7')}>
      {/* <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
      <HabitItem />
    </View>
  );
};

export default HomeScreen;
