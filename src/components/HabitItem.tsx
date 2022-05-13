import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HabitItemProps, TimePeriod} from '../utils/types';
import {
  findTimestampIndex,
  FirestoreTimestampToMoment,
  sortDates,
  todayMoment,
  useUserContext,
} from '../utils/fn';
import firestore, {firebase} from '@react-native-firebase/firestore';
import moment from 'moment';
import {Competition, Habit} from '../utils/models';

const HabitItem = ({
  navigation,
  dates,
  description,
  goalPerTP,
  name,
  timePeriod,
  user: userId,
  uid, // habit uid
}: HabitItemProps) => {
  const tailwind = useTailwind();
  const {user} = useUserContext();
  const todayTimestamp = firebase.firestore.Timestamp.fromDate(
    new Date(moment().hours(12).format('LLL')),
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

  const handleCheckBoxCheck = async () => {
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

    // update completed field if habit is in competition
    if (user && user.competition && Object.keys(user.competition).length > 0) {
      const startDate = FirestoreTimestampToMoment(user.competition.startDate);
      const endDate = FirestoreTimestampToMoment(user.competition.endDate);
      const habitData = (
        await firestore().collection('habits').doc(uid).get()
      ).data() as Habit;
      if (
        todayMoment >= startDate &&
        todayMoment <= endDate &&
        habitData.inCompetition
      ) {
        const newCompetition: Competition = {
          ...user.competition,
          completed: checked
            ? user.competition.completed - 1
            : user.competition.completed + 1,
        };
        firestore().collection('users').doc(userId).update({
          competition: newCompetition,
        });
        // update score on competitor object
        const score = Math.ceil(
          (newCompetition.completed / newCompetition.total) * 100,
        );

        firestore()
          .collection('users')
          .doc(user.competition.competitor)
          .update({
            'competition.compScore': score,
          });
      }
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
      }}
    >
      <View>
        <Text style={tailwind('text-2xl font-YC_SemiBold')}>{name}</Text>
        <Text
          style={tailwind('text-sm font-YC_Light')}
        >{`${completed}/${goalPerTP} x ${timePeriod}`}</Text>
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
