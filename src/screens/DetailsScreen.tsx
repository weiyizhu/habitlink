import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import CustomText from '../components/CustomText';
import {
  DetailsScreenNavigationProp,
  fontType,
  MarkedDatesType,
} from '../utils/types';
import {Calendar, DateData} from 'react-native-calendars';
import DetailsInfo from '../components/DetailsInfo';
import {TimePeriod} from '../utils/types';
import {
  calcHabitDetailsInfo,
  findTimestampIndex,
  useUserContext,
} from '../utils/fn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {firebase} from '@react-native-firebase/firestore';
import {Competition} from '../utils/models';

const DetailsScreen = ({navigation, route}: DetailsScreenNavigationProp) => {
  const tailwind = useTailwind();
  const {habits, user: currUser, uid: userId} = useUserContext();
  const {uid} = route.params; // habit uid
  const habit = habits.find(habitObj => habitObj.uid === uid);
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>({});
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      title: habit ? habit.name : 'Error',
    });
    if (habit) {
      const [newMarkedDates, currStreak, maxStreak] =
        calcHabitDetailsInfo(habit);
      setMarkedDates(newMarkedDates);
      setCurrentStreak(currStreak);
      setLongestStreak(maxStreak);
    }
  }, [habit, navigation]);

  useLayoutEffect(() => {
    if (habit) {
      const {
        name,
        description,
        goalPerTP,
        timePeriod,
        friends,
        user,
        inCompetition,
      } = habit;
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
                inCompetition,
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

  const toggleDayCompleted = (day: DateData) => {
    const newDates = [...habit.dates];
    const pressedDay = firebase.firestore.Timestamp.fromDate(
      new Date(
        moment(day.dateString)
          .hours(12)
          .minutes(0)
          .seconds(0)
          .milliseconds(0)
          .format('LLL'),
      ),
    );
    const index = findTimestampIndex(newDates, pressedDay);
    if (index > -1) {
      newDates.splice(index, 1);
    } else {
      newDates.push(pressedDay);
    }
    firebase.firestore().collection('habits').doc(uid).update({
      dates: newDates,
    });

    if (
      currUser &&
      currUser.competition &&
      Object.keys(currUser.competition).length > 0 &&
      userId &&
      habit.inCompetition
    ) {
      const startDate = moment(
        currUser.competition.startDate.toDate(),
        'YYYY-MM-DD',
      );
      const endDate = moment(
        currUser.competition.endDate.toDate(),
        'YYYY-MM-DD',
      );
      const pressedDate = moment(day.dateString, 'YYYY-MM-DD');
      const newCompetition: Competition = {
        ...currUser.competition,
        completed:
          index > -1
            ? currUser.competition.completed - 1
            : currUser.competition.completed + 1,
      };
      if (pressedDate >= startDate && pressedDate <= endDate) {
        firebase.firestore().collection('users').doc(userId).update({
          competition: newCompetition,
        });
      }
      // update score on competitor object
      const score = Math.ceil(
        (newCompetition.completed / newCompetition.total) * 100,
      );

      firebase
        .firestore()
        .collection('users')
        .doc(currUser.competition.competitor)
        .update({
          'competition.compScore': score,
        });
    }
  };

  const {dates, description, goalPerTP, name, timePeriod, user} = habit;

  const timePeriodGoal =
    timePeriod === TimePeriod.Day ? 'Daily' : timePeriod + 'ly';

  return (
    <View style={tailwind('flex-1 px-7')}>
      {description.length > 0 && (
        <>
          <Text style={tailwind('mb-5')}>
            <CustomText font={fontType.SemiBold} size={18}>
              {'Description: '}
            </CustomText>
            <CustomText font={fontType.Regular} size={18}>
              {description}
            </CustomText>
          </Text>
        </>
      )}
      <Calendar
        markingType="period"
        markedDates={markedDates}
        maxDate={moment().format('YYYY-MM-DD')}
        onDayPress={toggleDayCompleted}
        hideExtraDays
        enableSwipeMonths
      />
      <View style={tailwind('flex-row justify-evenly w-full mt-5')}>
        <DetailsInfo title={`${timePeriodGoal} \nGoal:`} num={goalPerTP} />
        <DetailsInfo title={'Current \nStreak:'} num={currentStreak} />
        <DetailsInfo title={'Longest \nStreak:'} num={longestStreak} />
      </View>
    </View>
  );
};

export default DetailsScreen;
