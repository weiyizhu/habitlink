import React from 'react';
import {Button, FlatList, ListRenderItem, Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import FloatingBtn from '../components/FloatingBtn';
import HabitItem from '../components/HabitItem';
import {HabitOverviewProps, HomeScreenProp, timePeriod} from '../utils/types';

const mockData: HabitOverviewProps[] = [
  {
    name: 'Habit 1',
    completed: 4,
    goal: 5,
    timePeriod: timePeriod.Week,
  },
  {
    name: 'Habit 2',
    completed: 1,
    goal: 1,
    timePeriod: timePeriod.Month,
  },
  {
    name: 'Habit 3',
    completed: 1,
    goal: 1,
    timePeriod: timePeriod.Day,
  },
];

const HomeScreen = ({route, navigation}: HomeScreenProp) => {
  const tailwind = useTailwind();

  const renderItem: ListRenderItem<HabitOverviewProps> = ({
    item,
    index,
    separators,
  }) => <HabitItem {...item} navigation={navigation} />;

  return (
    <View style={tailwind('flex-1 px-7')}>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {name: "haha"})}
      /> */}
      <FlatList data={mockData} renderItem={renderItem} />
      <FloatingBtn />
    </View>
  );
};

export default HomeScreen;
