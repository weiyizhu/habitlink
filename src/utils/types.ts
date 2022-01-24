import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type HomeStackParamList = {
  HomeStack: undefined;
  Details: undefined;
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
