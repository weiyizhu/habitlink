import {
  firebase,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import moment from 'moment';
import React, {createContext, useContext, useEffect, useRef} from 'react';
import {CompetitionRequest} from './models';
import {HabitWithUid, MarkedDatesType, TimePeriod, UserContext} from './types';

export const useEffectUpdate = (
  fn: Function,
  dependencies?: React.DependencyList | undefined,
) => {
  const didMountRef = useRef(false);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, dependencies ?? []);
};

export const DefUserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
  uid: null,
  setUid: () => {},
  habits: [],
  setHabits: () => {},
  friends: [],
  setFriends: () => {},
  friendRequests: [],
  setFriendRequests: () => {},
  snackE: '',
  setSnackE: () => {},
});

export const useUserContext = () => useContext(DefUserContext);

export const calcGoalPerTP = (
  TPRadioBtn: string,
  newWeeklyGoal: string,
  newMonthlyGoal: string,
) => {
  const goalPerTP =
    TPRadioBtn === TimePeriod.Day
      ? 1
      : TPRadioBtn === TimePeriod.Week
      ? parseInt(newWeeklyGoal, 10)
      : parseInt(newMonthlyGoal, 10);
  return goalPerTP;
};

export const calcHabitDetailsInfo = (
  habit: HabitWithUid,
): [MarkedDatesType, number, number] => {
  const newMarkedDates: MarkedDatesType = {};
  let prevDate: string | undefined;
  let longestStreak = 0;
  let currentStreak = 0;
  const sortedDates = sortDates(habit.dates, true);
  sortedDates.forEach(date => {
    const currDate = moment(date.toDate()).format('YYYY-MM-DD');
    let startingDay = false;
    if (prevDate === undefined) {
      startingDay = true;
      currentStreak++;
    } else if (moment(currDate).diff(moment(prevDate), 'days') === 1) {
      currentStreak++;
    } else {
      newMarkedDates[prevDate] = {
        ...newMarkedDates[prevDate],
        endingDay: true,
      };
      startingDay = true;
      currentStreak = 1;
    }
    newMarkedDates[currDate] = {
      startingDay: startingDay,
      color: '#cee5f2',
    };
    longestStreak = Math.max(currentStreak, longestStreak);
    prevDate = currDate;
  });
  if (prevDate) {
    newMarkedDates[prevDate] = {
      ...newMarkedDates[prevDate],
      endingDay: true,
    };
    if (moment().diff(moment(prevDate), 'days') > 1) {
      currentStreak = 0;
    }
  }
  return [newMarkedDates, currentStreak, longestStreak];
};

export const findTimestampIndex = (
  dates: FirebaseFirestoreTypes.Timestamp[],
  date: FirebaseFirestoreTypes.Timestamp,
) => {
  let index = -1;
  for (let i = 0; i < dates.length; i++) {
    if (JSON.stringify(dates[i]) === JSON.stringify(date)) {
      index = i;
      break;
    }
  }
  return index;
};

export const sortDates = (
  dates: FirebaseFirestoreTypes.Timestamp[],
  increasing: boolean,
) => {
  return dates.sort((a, b) => {
    const date1 = moment(a.toDate());
    const date2 = moment(b.toDate());
    return increasing ? date1.diff(date2) : date2.diff(date1);
  });
};

export const calcCompetitionTotal = (habits: HabitWithUid[]) => {
  const today = moment().day();
  const startDate = moment().toDate();
  const currWeek = moment().week();
  const currYear = moment().year();

  let total = 0;
  habits.forEach(habit => {
    const goalPerTP = habit.timePeriod === TimePeriod.Day ? 7 : habit.goalPerTP;
    if (today === 0) {
      total += goalPerTP * 3;
    } else {
      total += goalPerTP * 4;
      let completed = 0;
      const sortedDates = sortDates(habit.dates, false);
      for (const date of sortedDates) {
        const currDay = moment(date.toDate());
        if (currDay.year() === currYear && currDay.week() === currWeek) {
          if (currDay < moment(startDate)) completed++;
        } else break;
      }
      const daysTilSunday = 7 - today;

      if (completed >= goalPerTP) total -= goalPerTP;
      else total -= Math.min(daysTilSunday, goalPerTP);
    }
  });

  return total;
};
