import React from 'react';
import {Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

const CompeititionScreen = () => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 items-center justify-center')}>
      <Text>Compeitition Screen</Text>
    </View>
  );
};

export default CompeititionScreen;
