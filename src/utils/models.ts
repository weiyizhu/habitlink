// USER

import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {TimePeriod} from './types';

export type User = {
  email: string;
  name: string;
  competition: Competition | null;
  wld: WLD;
  friends: string[];
};

export type Competition = {
  competitor: string;
  startDate: FirebaseFirestoreTypes.Timestamp;
  endDate: FirebaseFirestoreTypes.Timestamp;
  total: number;
};

export type WLD = {
  wins: number;
  losses: number;
  draws: number;
};

// HABIT

export type Habit = {
  user: string;
  name: string;
  description: string;
  timePeriod: TimePeriod;
  goalPerTP: number;
  dates: FirebaseFirestoreTypes.Timestamp[];
  friends: string[];
  inCompetition: boolean;
};
