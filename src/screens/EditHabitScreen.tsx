import React, {useLayoutEffect, useState} from 'react';
import {Text} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {
  CreateEditHabitProps,
  EditHabitScreenNavigationProp,
  TimePeriod,
} from '../utils/types';
import firestore from '@react-native-firebase/firestore';
import {StackActions} from '@react-navigation/native';
import CreateEditHabit from '../components/CreateEditHabit';
import {calcGoalPerTP, useUserContext} from '../utils/fn';

const EditHabitScreen = ({
  navigation,
  route,
}: EditHabitScreenNavigationProp) => {
  const tailwind = useTailwind();
  const {setSnackE} = useUserContext();
  const {uid, name, description, goalPerTP, timePeriod, friends, user} =
    route.params;

  const [TPRadioBtn, setTPRadioBtn] = useState(timePeriod);
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);

  const [newWeeklyGoal, setNewWeeklyGoal] = useState<string>(
    timePeriod === TimePeriod.Week ? goalPerTP.toString() : '3',
  );
  const [newMonthlyGoal, setNewMonthlyGoal] = useState<string>(
    timePeriod === TimePeriod.Month ? goalPerTP.toString() : '10',
  );
  const [newSharedWith, setNewSharedWith] = useState(friends);

  const props: CreateEditHabitProps = {
    newName,
    newDescription,
    newSharedWith,
    newWeeklyGoal,
    newMonthlyGoal,
    TPRadioBtn,
    goalPerTP,
    timePeriod,
    user,
    setNewWeeklyGoal,
    setNewMonthlyGoal,
    setNewName,
    setNewDescription,
    setNewSharedWith,
    setTPRadioBtn,
    uid,
    type: 'Edit',
    navigation,
  };

  useLayoutEffect(() => {
    const handleSave = () => {
      if (newName === '') {
        setSnackE('Habit name cannot be blank');
        return;
      }
      const habitRef = firestore().collection('habits').doc(uid);
      habitRef.update({
        name: newName,
        description: newDescription,
        timePeriod: TPRadioBtn,
        goalPerTP: calcGoalPerTP(TPRadioBtn, newWeeklyGoal, newMonthlyGoal),
        friends: newSharedWith,
      });
      const popAction = StackActions.pop(1);
      navigation.dispatch(popAction);
    };
    navigation.setOptions({
      headerRight: () => (
        <Text
          style={tailwind('text-xl font-SemiBold right-9')}
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
    uid,
    newSharedWith,
    tailwind,
    setSnackE,
  ]);

  return <CreateEditHabit {...props} />;
};

export default EditHabitScreen;
