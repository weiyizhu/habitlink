import {StackActions} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Text} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import CreateEditHabit from '../components/CreateEditHabit';
import {
  CreateEditHabitProps,
  CreateHabitScreenNavigationProp,
  TimePeriod,
} from '../utils/types';
import {firebase} from '@react-native-firebase/firestore';
import {Habit} from '../utils/models';
import {calcGoalPerTP, useUserContext} from '../utils/fn';

const CreateHabitScreen = ({
  navigation,
  route,
}: CreateHabitScreenNavigationProp) => {
  const tailwind = useTailwind();
  const {setSnackE} = useUserContext();
  const {user} = route.params;

  const [TPRadioBtn, setTPRadioBtn] = useState<TimePeriod>(TimePeriod.Day);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const [newWeeklyGoal, setNewWeeklyGoal] = useState<string>('3');
  const [newMonthlyGoal, setNewMonthlyGoal] = useState<string>('10');
  const [newSharedWith, setNewSharedWith] = useState<string[]>([]);

  const props: CreateEditHabitProps = {
    newName,
    newDescription,
    newSharedWith,
    newWeeklyGoal,
    newMonthlyGoal,
    TPRadioBtn,
    goalPerTP: 1,
    timePeriod: TimePeriod.Day,
    user,
    setNewWeeklyGoal,
    setNewMonthlyGoal,
    setNewName,
    setNewDescription,
    setNewSharedWith,
    setTPRadioBtn,
    type: 'Create',
    inCompetition: false,
  };

  useLayoutEffect(() => {
    const handleSave = () => {
      if (newName.trim() === '') {
        setSnackE('Habit name cannot be blank');
        return;
      }
      if (newName.trim().length > 12) {
        setSnackE('Habit name cannot be longer than 12 characters.');
        return;
      }
      if (newDescription.length > 200) {
        setSnackE('Description cannot be longer than 200 characters.');
        return;
      }
      const newHabit: Habit = {
        user,
        name: newName.trim(),
        description: newDescription,
        timePeriod: TPRadioBtn,
        goalPerTP: calcGoalPerTP(TPRadioBtn, newWeeklyGoal, newMonthlyGoal),
        dates: [],
        friends: newSharedWith,
        inCompetition: false,
      };
      firebase
        .firestore()
        .collection('habits')
        .add(newHabit)
        .then(onfulfilled => {
          const popAction = StackActions.pop(1);
          navigation.dispatch(popAction);
        })
        .catch(reason => {
          setSnackE('Failed to create habit');
        });
    };
    navigation.setOptions({
      headerRight: () => (
        <Text
          style={tailwind('text-xl font-YC_SemiBold right-8')}
          onPress={handleSave}>
          Save
        </Text>
      ),
    });
  }, [
    TPRadioBtn,
    navigation,
    newDescription,
    newMonthlyGoal,
    newName,
    newWeeklyGoal,
    newSharedWith,
    tailwind,
    user,
    setSnackE,
  ]);

  return <CreateEditHabit {...props} />;
};

export default CreateHabitScreen;
