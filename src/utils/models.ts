// USER

import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {TimePeriod} from './types';

export type User = {
  email: string;
  name: string;
  competition: Competition | null;
  wld: WLD;
  friends: string[];
  competitionRequests: CompetitionRequest[];
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

export type CompetitionRequest = {
  uid: string;
  name: string;
  habitIds: string[];
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
