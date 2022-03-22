import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {Habit, User} from './models';
import {MarkingProps} from 'react-native-calendars/src/calendar/day/marking';

export type HomeStackParamList = {
  HomeStack: undefined;
  Details: {
    uid: string;
  };
  EditHabit: {
    uid: string;
    name: string;
    description: string;
    timePeriod: TimePeriod;
    goalPerTP: number;
    friends: string[];
    user: string;
    inCompetition: boolean;
  };
  CreateHabit: {
    user: string;
  };
};

export type AuthStackParamList = {
  RootHomeStack: undefined;
  RootLoginStack: undefined;
  RootCreateStack: undefined;
  RootForgotStack: undefined;
};

export type SettingsParamList = {
  SettingsStack: undefined;
  ResetStack: undefined;
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

export type ResetScreenNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<SettingsParamList, 'ResetStack'>,
  BottomTabScreenProps<RootTabParamList>
>;

export type EditHabitScreenNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'EditHabit'>,
  BottomTabScreenProps<RootTabParamList>
>;

export type CreateHabitScreenNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'CreateHabit'>,
  BottomTabScreenProps<RootTabParamList>
>;

export enum TimePeriod {
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
  SemiBold = 'semibold',
}

export type CustomTextProp = {
  font: fontType;
  size: number;
  additionStyle?: string;
  children: React.ReactNode;
};

export type UserContext = {
  user: User | null;
  setUser: (u: User | null) => void;
  uid: string | null;
  setUid: (uid: string) => void;
  habits: HabitWithUid[];
  setHabits: (habits: HabitWithUid[]) => void;
  friends: FriendCardProps[];
  setFriends: (friends: FriendCardProps[]) => void;
  snackE: string;
  setSnackE: (msg: string) => void;
};

export type AuthScreenProp = StackNavigationProp<
  AuthStackParamList,
  'RootLoginStack'
>;

export type CreateAccountScreenProp = StackNavigationProp<
  AuthStackParamList,
  'RootCreateStack'
>;

export type ForgotPasswordScreenProp = StackNavigationProp<
  AuthStackParamList,
  'RootForgotStack'
>;

export type SettingsScreenProp = StackNavigationProp<
  SettingsParamList,
  'SettingsStack'
>;

export type ResetScreenProp = StackNavigationProp<
  SettingsParamList,
  'ResetStack'
>;

export interface FrequencyModalProps {
  isFreqModalVisible: boolean;
  setIsFreqModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  TPRadioBtn: string;
  setTPRadioBtn: React.Dispatch<React.SetStateAction<TimePeriod>>;
  newWeeklyGoal: string;
  setNewWeeklyGoal: React.Dispatch<React.SetStateAction<string>>;
  newMonthlyGoal: string;
  setNewMonthlyGoal: React.Dispatch<React.SetStateAction<string>>;
  setNewFrequency: React.Dispatch<React.SetStateAction<string>>;
}

export interface FrequencyRadioBtnProps {
  goal: string;
  setGoal: React.Dispatch<React.SetStateAction<string>>;
  setTPRadioBtn: React.Dispatch<React.SetStateAction<TimePeriod>>;
  maxLength: number;
  timePeriod: TimePeriod;
}

export interface SharedWithModalProps {
  isSharedModalVisible: boolean;
  setIsSharedModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  newSharedWith: string[];
  setNewSharedWith: React.Dispatch<React.SetStateAction<string[]>>;
  userUid: string;
}

export type FriendCheckbox = {
  uid: string;
  name: string;
  checked: boolean;
};

export type FriendCardProps = {
  name: string;
  uid: string;
};

export interface CreateEditHabitProps {
  newName: string;
  newDescription: string;
  newSharedWith: string[];
  newWeeklyGoal: string;
  newMonthlyGoal: string;
  TPRadioBtn: string;
  goalPerTP: number;
  timePeriod: TimePeriod;
  user: string;
  setNewWeeklyGoal: React.Dispatch<React.SetStateAction<string>>;
  setNewMonthlyGoal: React.Dispatch<React.SetStateAction<string>>;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  setNewDescription: React.Dispatch<React.SetStateAction<string>>;
  setNewSharedWith: React.Dispatch<React.SetStateAction<string[]>>;
  setTPRadioBtn: React.Dispatch<React.SetStateAction<TimePeriod>>;
  uid?: string;
  type: 'Edit' | 'Create';
  navigation?: CompositeNavigationProp<
    NativeStackNavigationProp<HomeStackParamList, 'EditHabit'>,
    BottomTabNavigationProp<RootTabParamList, keyof RootTabParamList>
  >;
  inCompetition: boolean;
}

export interface FloatingBtnProps {
  handlePlusCirclePress: () => void;
}

export type MarkedDatesType = {
  [key: string]: MarkingProps;
};

export interface DeleteHabitDialogProps {
  isDeleteDialogVisible: boolean;
  setIsDeleteDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteHabit: () => void;
}
