import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HabitItemProps} from '../utils/types';
import {findTimestampIndex, useEffectUpdate} from '../utils/fn';
import firestore, {firebase} from '@react-native-firebase/firestore';
import moment from 'moment';

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
  user,
  uid,
}: HabitItemProps) => {
  const tailwind = useTailwind();
  const [checked, setChecked] = useState(false);
  const todayTimestamp = firebase.firestore.Timestamp.fromDate(
    new Date(moment().format('LL')),
  );
  useEffect(() => {
    const index = findTimestampIndex(dates, todayTimestamp);
    setChecked(index > -1);
  }, [dates, todayTimestamp]);

  const checkBoxIconName = checked
    ? 'checkbox-marked'
    : 'checkbox-blank-outline';
  const bgColor = completed >= goalPerTP ? 'bg-hl-blue' : 'bg-neutral-200';

  const handleCheckBoxCheck = () => {
    const habitRef = firestore().collection('habits').doc(uid);
    if (!checked) {
      habitRef.update({
        dates: [...dates, todayTimestamp],
      });
    } else {
      const newDates = [...dates];
      const index = findTimestampIndex(newDates, todayTimestamp);
      if (index > -1) {
        newDates.splice(index, 1);
      }
      habitRef.update({
        dates: newDates,
      });
    }
  };

  return (
    <TouchableOpacity
      style={tailwind(
        `px-3 py-2 ${bgColor} flex-row justify-between items-center mb-4`,
      )}
      onPress={() => {
        navigation.navigate('Details', {
          uid,
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
