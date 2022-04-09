import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HabitItemProps, TimePeriod} from '../utils/types';
import {findTimestampIndex, sortDates} from '../utils/fn';
import firestore, {firebase} from '@react-native-firebase/firestore';
import moment from 'moment';

const HabitItem = ({
  navigation,
  dates,
  description,
  goalPerTP,
  name,
  timePeriod,
  user,
  uid, // habit uid
}: HabitItemProps) => {
  const tailwind = useTailwind();
  const todayTimestamp = firebase.firestore.Timestamp.fromDate(
    new Date(moment().format('LL')),
  );
  const checked = findTimestampIndex(dates, todayTimestamp) > -1;

  let completed = 0;
  const currWeek = moment().week();
  const currMonth = moment().month();
  const currYear = moment().year();
  if (timePeriod === TimePeriod.Day) {
    if (checked) completed = 1;
  } else if (timePeriod === TimePeriod.Week) {
    const sortedDates = sortDates(dates, false);
    for (const date of sortedDates) {
      const currDay = moment(date.toDate());
      if (currDay.year() === currYear && currDay.week() === currWeek) {
        completed++;
      } else break;
    }
  } else {
    const sortedDates = sortDates(dates, false);
    for (const date of sortedDates) {
      const currDay = moment(date.toDate());
      if (currDay.year() === currYear && currDay.month() === currMonth) {
        completed++;
      } else break;
    }
  }

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
        <Text style={tailwind('text-2xl font-YC_SemiBold')}>{name}</Text>
        <Text
          style={tailwind(
            'text-sm font-YC_Light',
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
