import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HabitItemProps} from '../utils/types';
import {useEffectUpdate} from '../utils/fn';

const HabitItem = ({
  navigation,
  currentStreak,
  dates,
  description,
  goalPerTP,
  name,
  timePeriod,
  completed,
  longestStreak,
  user
}: HabitItemProps) => {
  console.log("habitItem", goalPerTP, name, timePeriod, completed)
  const tailwind = useTailwind();
  const [checked, setChecked] = useState(false);
  const checkBoxIconName = checked
    ? 'checkbox-marked'
    : 'checkbox-blank-outline';
  const bgColor = completed >= goalPerTP ? 'bg-hl-blue' : 'bg-neutral-200';

  const handleCheckBoxCheck = () => {
    setChecked(!checked);
  };

  // useEffectUpdate(() => {
  //   if (checked) setCompletedState(prev => prev + 1);
  //   else setCompletedState(prev => prev - 1);
  // }, [checked]);

  return (
    <TouchableOpacity
      style={tailwind(
        `px-3 py-2 ${bgColor} flex-row justify-between items-center mb-4`,
      )}
      onPress={() => {
        navigation.navigate('Details', {
          name,
        });
      }}>
      <View>
        <Text style={tailwind('text-2xl font-SemiBold')}>{name}</Text>
        <Text
          style={tailwind(
            'text-sm font-Light',
          )}>{`${completed}/${goalPerTP} x ${timePeriod}`}</Text>
      </View>
      <MaterialCommunityIcons
        onPress={handleCheckBoxCheck}
        name={checkBoxIconName}
        size={25}
      />
    </TouchableOpacity>
  );
};

export default HabitItem;
