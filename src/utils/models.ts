// USER

import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {TimePeriod} from './types';

export type User = {
  email: string;
  name: string;
  competition: Competition | null;
  wld: WLD;
  habits: string[];
  friends: string[];
};

export type Competition = {
  score: number;
  competitor: string;
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
  completed: number;
  longestStreak: number;
  currentStreak: number;
  dates: FirebaseFirestoreTypes.Timestamp[];
  friends: string[];
};
