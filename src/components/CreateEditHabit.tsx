import React, {useEffect, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import {CreateEditHabitProps, TimePeriod} from '../utils/types';
import FrequencyModal from '../components/FrequencyModal';
import SharedWithModal from '../components/SharedWithModal';

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
}: CreateEditHabitProps) => {
  const tailwind = useTailwind();
  const [isFreqModalVisible, setIsFreqModalVisible] = useState(false);
  const [isSharedModalVisible, setIsSharedModalVisible] = useState(false);
  const [newFrequency, setNewFrequency] = useState('');

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
          onPressIn={() => setIsFreqModalVisible(true)}
          right={
            <TextInput.Icon
              name="menu-down"
              style={tailwind('top-2.5')}
              onPress={() => setIsFreqModalVisible(true)}
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
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateEditHabit;
