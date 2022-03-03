// USER

import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {timePeriod} from './types';

export type User = {
  email: string;
  name: string;
  competition: Competition;
  wld: WLD;
  habits: string[];
  friends: Friend[];
} | null;

export type Competition = {
  score: number;
  competitor: string;
};

export type WLD = {
  wins: number;
  losses: number;
  draws: number;
};

export type Friend = {
  uid: string;
  sharedHabits: string[];
};

// HABIT

export type Habit = {
  name: string;
  description: string;
  timePeriod: timePeriod;
  goalPerTP: number;
  completed: number;
  longestStreak: number;
  currentStreak: number;
  dates: FirebaseFirestoreTypes.Timestamp[];
  friends: string[];
};
