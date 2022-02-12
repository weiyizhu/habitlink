import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import CustomText from '../components/CustomText';
import {DetailsScreenNavigationProp, fontType} from '../utils/types';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import DetailsInfo from '../components/DetailsInfo';

const mockDetails = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit euismod augue, elementum ornare augue consequat quis. Nulla congue sapien eu pharetra fringilla. Maecenas et est diam. Aenean efficitur vestibulum elit quis fermentum.`;

const DetailsScreen = ({navigation, route}: DetailsScreenNavigationProp) => {
  const tailwind = useTailwind();
  const {name} = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, []);

  return (
    <View style={tailwind('flex-1 items-center px-7')}>
      <CustomText font={fontType.Medium} size={18} additionStyle={'mb-5'}>
        {mockDetails}
      </CustomText>
      <Calendar />
      <View style={tailwind('flex-row justify-evenly w-full mt-5')}>
        <DetailsInfo title={'Weekly \nGoal:'} num={2} />
        <DetailsInfo title={'Current \nStreak:'} num={7} />
        <DetailsInfo title={'Longest \nStreak:'} num={11} />
      </View>
    </View>
  );
};

export default DetailsScreen;
