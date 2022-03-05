import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React, {createContext, useContext} from 'react';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {Habit, User} from './models';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type HomeStackParamList = {
  HomeStack: undefined;
  Details: {
    uid: string;
  };
};

export type AuthStackParamList = {
  RootHomeStack: undefined;
  RootLoginStack: undefined;
};

export type RootTabParamList = {
  // example: Feed: { sort: 'latest' | 'top' } | undefined;
  Home: NavigatorScreenParams<HomeStackParamList>;
  Competition: undefined;
  Friends: undefined;
  Settings: undefined;
};

export type HomeScreenProp = NativeStackScreenProps<
  HomeStackParamList,
  'HomeStack'
>;

export type DetailsScreenNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'Details'>,
  BottomTabScreenProps<RootTabParamList>
>;

export enum timePeriod {
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
}

export type HabitWithUid = Habit & {
  uid: string;
};

export type HabitItemProps = HabitWithUid & {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'HomeStack'>;
};

export enum fontType {
  Light = 'light',
  Medium = 'medium',
  SemiBold = 'semiBold',
}

export type CustomTextProp = {
  font: fontType;
  size: number;
  additionStyle?: string;
  children: React.ReactNode;
};

export type UserContext = {
  user: User | null;
  setUser: (u: User) => void;
  uid: string | null;
  setUid: (uid: string) => void;
  habits: HabitWithUid[];
  setHabits: (habits: HabitWithUid[]) => void;
};

export type AuthScreenProp = StackNavigationProp<
  AuthStackParamList,
  'RootLoginStack'
>;
