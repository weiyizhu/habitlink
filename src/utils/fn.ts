import React, {createContext, useContext, useEffect, useRef} from 'react';
import {TimePeriod, UserContext} from './types';

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
