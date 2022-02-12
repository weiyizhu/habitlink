// USER

import {timePeriod} from './types';

export type User = {
  email: string;
  name: string;
  competition: Competition;
  wld: WLD;
  habits: string[];
  friends: Friend[];
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

export type Friend = {
  uid: string;
  sharedHabits: string[];
};

// HABIT

export type Habit = {
  uid: string;
  details: Details;
  longestStreak: number;
  currentStreak: number;
  dates: Date[];
};

export type Details = {
  name: string;
  description: string;
  timePeriod: timePeriod;
  goalPerTP: number;
};
