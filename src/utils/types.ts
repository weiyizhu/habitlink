import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Habit} from './models';

export type HomeStackParamList = {
  HomeStack: undefined;
  Details: {
    name: string;
  };
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

export type HabitItemProps = Habit & {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'HomeStack'>;
};

export enum fontType {
  Light = 'Light',
  Medium = 'Medium',
  SemiBold = 'SemiBold',
}

export type CustomTextProp = {
  font: fontType;
  size: number;
  additionStyle?: string;
  children: React.ReactNode;
};
