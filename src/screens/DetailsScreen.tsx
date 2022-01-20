import React from 'react';
import {Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

const DetailsScreen = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 items-center justify-center')}>
      <Text>DetailsScreen Screen</Text>
    </View>
  );
};

export default DetailsScreen;
