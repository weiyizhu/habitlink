import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HabitOverviewProps} from '../utils/types';

const HabitItem = ({name, completed, goal, timePeriod}: HabitOverviewProps) => {
  const tailwind = useTailwind();
  const [checked, setChecked] = useState(false);
  const [completedState, setCompletedState] = useState(completed);
  const checkBoxIconName = checked
    ? 'checkbox-marked'
    : 'checkbox-blank-outline';
  const bgColor = completedState >= goal ? 'bg-hl-blue' : 'bg-neutral-200';

  const handleCheckBoxCheck = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (checked) setCompletedState(prev => prev + 1);
    else setCompletedState(prev => prev - 1);
  }, [checked]);

  return (
    <View
      style={tailwind(
        `px-3 py-2 ${bgColor} flex-row justify-between items-center mb-4`,
      )}>
      <View>
        <Text style={tailwind('text-2xl font-SemiBold')}>{name}</Text>
        <Text
          style={tailwind(
            'text-sm font-Light',
          )}>{`${completedState}/${goal} x ${timePeriod}`}</Text>
      </View>
      <MaterialCommunityIcons
        onPress={handleCheckBoxCheck}
        name={checkBoxIconName}
        size={25}
      />
    </View>
  );
};

export default HabitItem;
