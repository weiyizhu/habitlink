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

    return (
    <View style={tailwind('flex-1 items-start justify-start m-5')}>
      <Text style={fontFam}>Weiyi Zhu is a computer science student at Swarthmore College.
      He is interested in developing secure, robust, and interactive user applications.
      Stephen Feria is a computer science student at Purdue University.
      He is interested in full-stack development as well as systems programming. Watermelon Inc
      is an entity representing the collective effort between Weiyi Zhu and Stephen Feria when
      it comes to developing software.</Text>
    </View>
  );
};

export default SettingsScreen;
