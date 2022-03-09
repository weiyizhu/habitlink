import React, {useLayoutEffect} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {CreateHabitScreenNavigationProp} from '../utils/types';

const CreateHabitScreen = ({
  navigation,
  route,
}: CreateHabitScreenNavigationProp) => {
  const tailwind = useTailwind();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Pressable />,
    });
  }, [navigation]);

  return (
    <View style={tailwind('flex-1 px-7')}>
      <Text>Create Habit</Text>
    </View>
  );
};

export default CreateHabitScreen;
