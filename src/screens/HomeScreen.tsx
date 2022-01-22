import React from 'react';
import {Button, Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import { HomeScreenProp } from '../utils/types';

const HomeScreen = ({route, navigation}: HomeScreenProp) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 items-center justify-center')}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

export default HomeScreen;
