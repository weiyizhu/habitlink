import React, {useEffect, useLayoutEffect} from 'react';
import {Keyboard, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import CustomText from '../components/CustomText';
import {DetailsScreenNavigationProp, fontType} from '../utils/types';
import {Calendar} from 'react-native-calendars';
import DetailsInfo from '../components/DetailsInfo';
import {TimePeriod} from '../utils/types';
import {useUserContext} from '../utils/fn';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DetailsScreen = ({navigation, route}: DetailsScreenNavigationProp) => {
  const tailwind = useTailwind();
  const {habits} = useUserContext();
  const {uid} = route.params;
  const habit = habits.find(habitObj => habitObj.uid === uid);

  useEffect(() => {
    navigation.setOptions({
      title: habit ? habit.name : 'Error',
    });
  }, [habit, navigation]);

  useLayoutEffect(() => {
    if (habit) {
      const {name, description, goalPerTP, timePeriod, friends, user} = habit;
      navigation.setOptions({
        headerRight: () => (
          <MaterialIcons
            onPress={() => {
              navigation.navigate('EditHabit', {
                uid,
                name,
                description,
                goalPerTP,
                timePeriod,
                friends,
                user,
              });
            }}
            name={'edit'}
            size={25}
            style={{right: 35}}
          />
        ),
      });
    }
  }, [uid, habit, navigation]);

  if (habit === undefined) {
    return (
      <View style={tailwind('flex-1 items-center px-7')}>
        <CustomText font={fontType.Medium} size={18} additionStyle={'mb-5'}>
          Cannot find habit.
        </CustomText>
      </View>
    );
  }

  const {
    completed,
    currentStreak,
    dates,
    description,
    goalPerTP,
    longestStreak,
    name,
    timePeriod,
    user,
  } = habit;

  const timePeriodGoal =
    timePeriod === TimePeriod.Day ? 'Daily' : timePeriod + 'ly';

  console.log('Details', currentStreak);

  return (
    <View style={tailwind('flex-1 px-7')}>
      <CustomText font={fontType.Medium} size={18} additionStyle={'mb-5'}>
        {description}
      </CustomText>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Calendar />
        <View style={tailwind('flex-row justify-evenly w-full mt-5')}>
          <DetailsInfo title={`${timePeriodGoal} \nGoal:`} num={goalPerTP} />
          <DetailsInfo title={'Current \nStreak:'} num={currentStreak} />
          <DetailsInfo title={'Longest \nStreak:'} num={longestStreak} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default DetailsScreen;
