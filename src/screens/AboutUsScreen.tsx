import React from 'react';
import {Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

const SettingsScreen = () => {
  const tailwind = useTailwind();

  const fontFam = {
    fontSize: 18,
    padding: 3,
    fontFamily: 'YaldeviColombo-SemiBold',
  };

  const text =
    'Weiyi Zhu is a computer science student at Swarthmore College. \
He is interested in developing secure, robust, and interactive user applications. \
\n\nStephen Feria is a computer science student at Purdue University. \
He is interested in full-stack development as well as systems programming. \
\n\nWatermelon Inc is an entity representing the collective effort \
between Weiyi Zhu and Stephen Feria when it comes to developing software.';

  return (
    <View style={tailwind('flex-1 items-start justify-start px-7')}>
      <Text style={fontFam}>{text}</Text>
    </View>
  );
};

export default SettingsScreen;
