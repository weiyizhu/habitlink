import {firebase} from '@react-native-firebase/firestore';
import {StackActions} from '@react-navigation/native';
import moment from 'moment';
import React, {useState} from 'react';
import {View, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import ChallengerModal from '../components/ChallengerModal';
import SelectHabitsModal from '../components/SelectHabitsModal';
import {
  calcCompetitionTotal,
  DeleteCompetitionRequest,
  sortDates,
  useUserContext,
} from '../utils/fn';
import {Competition, CompetitionRequest, Habit, User} from '../utils/models';
import {
  AcceptCompetitionScreenProp,
  Challenger,
  CreateCompetitionScreenProp,
  HabitWithUid,
  TimePeriod,
} from '../utils/types';

const AcceptCompetitionScreen = ({
  navigation,
  route,
}: AcceptCompetitionScreenProp) => {
  const tailwind = useTailwind();
  const {setSnackE, uid, user} = useUserContext();
  const {request} = route.params;

  const [isSelectHabitModalVisible, setIsSelectHabitModalVisible] =
    useState(false);
  const [selectedHabits, setSelectedHabits] = useState<HabitWithUid[]>([]);

  const startDate = moment().toDate();
  const today = moment().day();
  const endDate = moment(startDate).add(3, 'weeks');
  if (today !== 0) {
    endDate.add(7 - today, 'days');
  }

  const createChallenge = async () => {
    if (selectedHabits.length === 0) {
      setSnackE('At least one habit has to be chosen');
      return;
    }

    if (uid === null || user === null) {
      setSnackE('Cannot find user');
      return;
    }

    selectedHabits.forEach(habit => {
      firebase.firestore().collection('habits').doc(habit.uid).update({
        inCompetition: true,
      });
    });

    const getChallengerHabits: Promise<HabitWithUid>[] = request.habitIds.map(
      async habitId => {
        const habitPromise = await firebase
          .firestore()
          .collection('habits')
          .doc(habitId)
          .get();
        const habit = habitPromise.data() as Habit;
        const habitWithUid: HabitWithUid = {...habit, uid: habitId};
        return habitWithUid;
      },
    );

    const challengerHabits: HabitWithUid[] = await Promise.all(
      getChallengerHabits,
    );
    const validChallengerHabits: HabitWithUid[] = challengerHabits.filter(
      (obj): obj is HabitWithUid => {
        return obj !== undefined;
      },
    );

    validChallengerHabits.forEach(habit => {
      firebase.firestore().collection('habits').doc(habit.uid).update({
        inCompetition: true,
      });
    });

    const userCompetition: Competition = {
      competitor: request.uid,
      startDate: firebase.firestore.Timestamp.fromDate(new Date(startDate)),
      endDate: firebase.firestore.Timestamp.fromDate(
        new Date(endDate.toDate()),
      ),
      total: calcCompetitionTotal(selectedHabits),
    };

    firebase.firestore().collection('users').doc(uid).update({
      competition: userCompetition,
    });

    const challengerCompetition: Competition = {
      competitor: uid,
      startDate: firebase.firestore.Timestamp.fromDate(new Date(startDate)),
      endDate: firebase.firestore.Timestamp.fromDate(
        new Date(endDate.toDate()),
      ),
      total: calcCompetitionTotal(validChallengerHabits),
    };

    firebase.firestore().collection('users').doc(request.uid).update({
      competition: challengerCompetition,
    });

    DeleteCompetitionRequest(user.competitionRequests, uid, request.uid);

    setSnackE('Competition created');
    const popAction = StackActions.pop(1);
    navigation.dispatch(popAction);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={tailwind('flex-1 px-7')}>
        <TextInput
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
        />
        <TextInput
          label="Challenger"
          value={request.name}
          underlineColor="#A7A7A7"
          activeUnderlineColor="#637081"
          style={tailwind('mb-5 bg-white')}
          editable={false}
        />
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

        <SelectHabitsModal
          setModalVisible={setIsSelectHabitModalVisible}
          isModalVisible={isSelectHabitModalVisible}
          setSelectedHabits={setSelectedHabits}
        />
        <Button
          icon="send"
          mode="contained"
          color="lightgreen"
          style={tailwind('mt-5')}
          onPress={createChallenge}
        >
          Accept Challenge
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AcceptCompetitionScreen;
