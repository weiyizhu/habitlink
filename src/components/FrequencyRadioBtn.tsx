import React from 'react';
import {View, Text} from 'react-native';
import {RadioButton, TextInput} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import {FrequencyRadioBtnProps, TimePeriod} from '../utils/types';

const FrequencyRadioBtn = ({
  goal,
  setGoal,
  setTPRadioBtn,
  maxLength,
  timePeriod,
}: FrequencyRadioBtnProps) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-row items-center mb-3')}>
      <RadioButton value={timePeriod} />
      <TextInput
        value={goal}
        onChangeText={text => setGoal(text)}
        mode="outlined"
        outlineColor="#A7A7A7"
        activeOutlineColor="#637081"
        dense
        underlineColor="#A7A7A7"
        activeUnderlineColor="#637081"
        keyboardType="number-pad"
        style={tailwind(
          'w-12 bg-white mb-1 pl-0 font-Regular text-lg ml-2 h-8 text-center',
        )}
        onFocus={() => setTPRadioBtn(timePeriod)}
        maxLength={maxLength}
      />
      <Text style={tailwind('text-xl font-Regular pl-3 top-0.5')}>
        times per {timePeriod === TimePeriod.Week ? 'week' : 'month'}
      </Text>
    </View>
  );
};

export default FrequencyRadioBtn;
