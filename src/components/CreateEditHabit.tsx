import React, {useEffect, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import {CreateEditHabitProps, TimePeriod} from '../utils/types';
import FrequencyModal from '../components/FrequencyModal';
import SharedWithModal from '../components/SharedWithModal';
import DeleteHabitDialog from './DeleteHabitDialog';
import {firebase} from '@react-native-firebase/firestore';
import {useUserContext} from '../utils/fn';

const CreateEditHabit = ({
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
  type,
  navigation,
  inCompetition,
}: CreateEditHabitProps) => {
  const tailwind = useTailwind();
  const {setSnackE} = useUserContext();
  const [isFreqModalVisible, setIsFreqModalVisible] = useState(false);
  const [isSharedModalVisible, setIsSharedModalVisible] = useState(false);
  const [newFrequency, setNewFrequency] = useState('');
  const [isDeleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const handleDeleteHabit = () => {
    if (uid && navigation) {
      firebase
        .firestore()
        .collection('habits')
        .doc(uid)
        .delete()
        .then(_ => {
          navigation.navigate('HomeStack');
        })
        .catch(reason => {
          console.log(reason);
          setSnackE('Fail to delete habit');
          navigation.navigate('HomeStack');
        });
    }
  };

  useEffect(() => {
    if (timePeriod === TimePeriod.Day) {
      setNewFrequency('Every day');
    } else if (timePeriod === TimePeriod.Week) {
      setNewFrequency(goalPerTP.toString() + ' times per week');
      setNewWeeklyGoal(goalPerTP.toString());
    } else {
      setNewFrequency(goalPerTP.toString() + ' times per month');
      setNewMonthlyGoal(goalPerTP.toString());
    }
  }, [timePeriod, goalPerTP, setNewWeeklyGoal, setNewMonthlyGoal]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={tailwind('flex-1 px-7')}>
        <TextInput
          label="Name"
          value={newName}
          onChangeText={text => setNewName(text)}
          underlineColor="#A7A7A7"
          activeUnderlineColor="#637081"
          style={tailwind('mb-5 bg-white')}
        />
        <TextInput
          label="Description"
          value={newDescription}
          onChangeText={text => setNewDescription(text)}
          underlineColor="#A7A7A7"
          activeUnderlineColor="#637081"
          style={tailwind('mb-5 bg-white')}
          multiline
        />
        <TextInput
          label="Frequency"
          value={newFrequency}
          underlineColor="#A7A7A7"
          activeUnderlineColor="#637081"
          style={tailwind('mb-5 bg-white')}
          editable={false}
          onPressIn={() => {
            if (inCompetition) {
              setSnackE('Cannot edit frequency of habits in competition');
            } else {
              setIsFreqModalVisible(true);
            }
          }}
          right={
            <TextInput.Icon
              name="menu-down"
              style={tailwind('top-2.5')}
              onPress={() => {
                if (inCompetition) {
                  setSnackE('Cannot edit frequency of habits in competition');
                } else {
                  setIsFreqModalVisible(true);
                }
              }}
            />
          }
        />
        <TextInput
          label="Shared with"
          value={`${newSharedWith.length} friend${
            newSharedWith.length > 1 ? 's' : ''
          }`}
          underlineColor="#A7A7A7"
          activeUnderlineColor="#637081"
          style={tailwind('mb-5 bg-white')}
          editable={false}
          onPressIn={() => setIsSharedModalVisible(true)}
          right={
            <TextInput.Icon
              name="menu-down"
              style={tailwind('top-2.5')}
              onPress={() => setIsSharedModalVisible(true)}
            />
          }
        />
        <FrequencyModal
          isFreqModalVisible={isFreqModalVisible}
          setIsFreqModalVisible={setIsFreqModalVisible}
          TPRadioBtn={TPRadioBtn}
          setTPRadioBtn={setTPRadioBtn}
          newWeeklyGoal={newWeeklyGoal}
          setNewWeeklyGoal={setNewWeeklyGoal}
          newMonthlyGoal={newMonthlyGoal}
          setNewMonthlyGoal={setNewMonthlyGoal}
          setNewFrequency={setNewFrequency}
        />
        <SharedWithModal
          isSharedModalVisible={isSharedModalVisible}
          setIsSharedModalVisible={setIsSharedModalVisible}
          newSharedWith={newSharedWith}
          setNewSharedWith={setNewSharedWith}
          userUid={user}
        />
        {type === 'Edit' && (
          <>
            <Button
              icon="delete"
              mode="contained"
              color="red"
              style={tailwind('mt-5')}
              onPress={() => {
                if (inCompetition) {
                  setSnackE('Cannot delete habits in competition');
                } else setDeleteDialogVisible(true);
              }}
            >
              Delete habit
            </Button>

            <DeleteHabitDialog
              isDeleteDialogVisible={isDeleteDialogVisible}
              setIsDeleteDialogVisible={setDeleteDialogVisible}
              handleDeleteHabit={handleDeleteHabit}
            />
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateEditHabit;
