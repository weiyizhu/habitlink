import moment from 'moment';
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {sortDates} from '../utils/fn';
import {CompetitorInfoProps, TimePeriod} from '../utils/types';

const CompetitorInfo = ({wld, name, habits, score}: CompetitorInfoProps) => {
  const tailwind = useTailwind();
  const {wins, losses, draws} = wld;
  const currWeek = moment().week();
  const currYear = moment().year();

  return (
    <View style={tailwind('w-5/12 items-center')}>
      <Text style={tailwind('text-4xl pb-2 font-YC_SemiBold')}>{score}</Text>
      <Text style={tailwind('text-xl font-YC_SemiBold')}>{name}</Text>
      <Text style={tailwind('text-sm pb-4 font-YC_SemiBold')}>
        ({wins}-{losses}-{draws})
      </Text>
      {habits.map(habit => {
        const goalPerTP =
          habit.timePeriod === TimePeriod.Day ? 7 : habit.goalPerTP;

        let completed = 0;
        const sortedDates = sortDates(habit.dates, false);
        for (const date of sortedDates) {
          const currDay = moment(date.toDate());
          if (currDay.year() === currYear && currDay.week() === currWeek) {
            completed++;
          } else break;
        }
        const bgColor =
          completed >= goalPerTP ? 'bg-hl-blue' : 'bg-neutral-200';

        return (
          <View
            key={habit.uid}
            style={tailwind(
              `px-3 py-2 bg-neutral-200 mb-4 w-full items-center ${bgColor}`,
            )}
          >
            <Text style={tailwind('text-xl font-YC_SemiBold')}>
              {habit.name}
            </Text>
            <Text style={tailwind('text-sm font-YC_Light')}>
              {`${completed}/${goalPerTP} x Week`}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default CompetitorInfo;
