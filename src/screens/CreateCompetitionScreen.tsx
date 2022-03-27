import {firebase} from '@react-native-firebase/firestore';
import moment from 'moment';
import React, {useState} from 'react';
import {View, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import ChallengerModal from '../components/ChallengerModal';
import SelectHabitsModal from '../components/SelectHabitsModal';
import {sortDates, useUserContext} from '../utils/fn';
import {CompetitionRequest, User} from '../utils/models';
import {
  Challenger,
  CreateCompetitionScreenProp,
  HabitWithUid,
  TimePeriod,
} from '../utils/types';

const CreateCompetitionScreen = ({
  navigation,
  route,
}: CreateCompetitionScreenProp) => {
  const tailwind = useTailwind();
  const {setSnackE, uid, user} = useUserContext();
  const [isSelectHabitModalVisible, setIsSelectHabitModalVisible] =
    useState(false);
  const [selectedHabits, setSelectedHabits] = useState<HabitWithUid[]>([]);
  const [isChallengerModalVisible, setIsChallengerModalVisible] =
    useState(false);
  const [challenger, setChallenger] = useState<Challenger>();

  const startDate = moment().toDate();
  const today = moment().day();
  const endDate = moment(startDate).add(3, 'weeks');
  if (today !== 0) {
    endDate.add(7 - today, 'days');
  }
  const currWeek = moment().week();
  const currYear = moment().year();

  const createChallenge = async () => {
    if (selectedHabits.length === 0) {
      setSnackE('At least one habit has to be chosen');
      return;
    }
    if (challenger === undefined) {
      setSnackE('Please select a friend to challenge');
      return;
    }

    if (uid === null || user === null) {
      setSnackE('Cannot find user');
      return;
    }

    const challengerRef = firebase
      .firestore()
      .collection('users')
      .doc(challenger.uid);
    const challengerDataPromise = await challengerRef.get();
    const challengerData = challengerDataPromise.data() as User;
    const currCompetitionRequests = challengerData.competitionRequests;
    const index = currCompetitionRequests.findIndex(
      request => request.uid === uid,
    );
    if (index > -1) {
      setSnackE(
        `A previous competition request has already been sent to ${challenger.name}`,
      );
      return;
    }
    const newCompetitionRequests: CompetitionRequest[] = [
      ...currCompetitionRequests,
      {
        uid,
        name: user.name,
        habitIds: selectedHabits.map(habit => habit.uid),
      },
    ];

    firebase.firestore().collection('users').doc(challenger.uid).update({
      competitionRequests: newCompetitionRequests,
    });
    // let total = 0;
    // selectedHabits.forEach(habit => {
    //   const goalPerTP =
    //     habit.timePeriod === TimePeriod.Day ? 7 : habit.goalPerTP;

    //   if (today === 0) {
    //     total += goalPerTP * 3;
    //   } else {
    //     total += goalPerTP * 4;

    //     let completed = 0;
    //     const sortedDates = sortDates(habit.dates, false);
    //     for (const date of sortedDates) {
    //       const currDay = moment(date.toDate());
    //       if (currDay.year() === currYear && currDay.week() === currWeek) {
    //         if (currDay < moment(startDate)) completed++;
    //       } else break;
    //     }
    //     total -= completed;
    //   }
    // });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={tailwind('flex-1 px-7')}>
        {/* <TextInput
          label="Start Date"
          value={moment(startDate).format('dddd (MMMM DD, YYYY)')}
          underlineColor="#A7A7A7"
          activeUnderlineColor="#637081"
          style={tailwind('mb-5 bg-white')}
          editable={false}
        />
        <TextInput
          label="End Date"
          value={endDate.format('dddd (MMMM DD, YYYY)')}
          underlineColor="#A7A7A7"
          activeUnderlineColor="#637081"
          style={tailwind('mb-5 bg-white')}
          editable={false}
        /> */}
        <TextInput
          label="Choose Habits"
          value={`${selectedHabits.length} habit${
            selectedHabits.length > 1 ? 's' : ''
          } selected`}
          underlineColor="#A7A7A7"
          activeUnderlineColor="#637081"
          style={tailwind('mb-5 bg-white')}
          editable={false}
          onPressIn={() => setIsSelectHabitModalVisible(true)}
          right={
            <TextInput.Icon
              name="menu-down"
              style={tailwind('top-2.5')}
              onPress={() => setIsSelectHabitModalVisible(true)}
            />
          }
        />
        <TextInput
          label="Choose a friend to challenge"
          value={challenger?.name}
          underlineColor="#A7A7A7"
          activeUnderlineColor="#637081"
          style={tailwind('mb-5 bg-white')}
          editable={false}
          onPressIn={() => setIsChallengerModalVisible(true)}
          right={
            <TextInput.Icon
              name="menu-down"
              style={tailwind('top-2.5')}
              onPress={() => setIsChallengerModalVisible(true)}
            />
          }
        />
        <SelectHabitsModal
          setModalVisible={setIsSelectHabitModalVisible}
          isModalVisible={isSelectHabitModalVisible}
          setSelectedHabits={setSelectedHabits}
        />
        <ChallengerModal
          isModalVisible={isChallengerModalVisible}
          setIsModalVisible={setIsChallengerModalVisible}
          challenger={challenger}
          setChallenger={setChallenger}
        />
        <Button
          icon="send"
          mode="contained"
          color="lightgreen"
          style={tailwind('mt-5')}
          onPress={createChallenge}>
          Send Challenge
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateCompetitionScreen;
