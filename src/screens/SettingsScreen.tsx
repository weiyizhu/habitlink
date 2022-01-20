import React from 'react';
import {Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

const SettingsScreen = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 items-center justify-center')}>
      <Text>Settings Screen</Text>
    </View>
  );
};

export default SettingsScreen;
