import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const HabitItem = () => {
  const tailwind = useTailwind();
  const [checked, setChecked] = useState(false);
  const CheckBoxIconName = checked
    ? 'checkbox-marked'
    : 'checkbox-blank-outline';

  const handleCheckBoxCheck = () => {
    setChecked(!checked)
  }
  
  return (
    <View
      style={tailwind(
        'p-3 bg-neutral-200 flex-row justify-between items-center',
      )}>
      <View>
        <Text style={tailwind('text-2xl')}>Habit Name</Text>
        <Text style={tailwind('text-sm')}>4/5 x Week</Text>
      </View>
      <MaterialCommunityIcons onPress={handleCheckBoxCheck} name={CheckBoxIconName} size={25} />
    </View>
  );
};

export default HabitItem;
