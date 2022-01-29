import React from 'react';
import {Button, FlatList, ListRenderItem, Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import HabitItem from '../components/HabitItem';
import {HabitOverviewProps, HomeScreenProp, timePeriod} from '../utils/types';

const mockData: HabitOverviewProps[] = [
  {
    name: 'Haibt 1',
    completed: 4,
    goal: 5,
    timePeriod: timePeriod.Week,
  },
  {
    name: 'Haibt 2',
    completed: 1,
    goal: 1,
    timePeriod: timePeriod.Month,
  },
  {
    name: 'Haibt 3',
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
  }) => <HabitItem {...item} />;

  return (
    <View style={tailwind('flex-1 p-7')}>
      {/* <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
      <FlatList data={mockData} renderItem={renderItem} />
    </View>
  );
};

export default HomeScreen;
