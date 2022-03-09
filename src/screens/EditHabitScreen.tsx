import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import {EditHabitScreenNavigationProp, TimePeriod} from '../utils/types';
import firestore from '@react-native-firebase/firestore';
import {StackActions} from '@react-navigation/native';
import FrequencyModal from '../components/FrequencyModal';
import SharedWithModal from '../components/SharedWithModal';

const EditHabitScreen = ({
  navigation,
  route,
}: EditHabitScreenNavigationProp) => {
  const tailwind = useTailwind();
  const {uid, name, description, goalPerTP, timePeriod, friends, user} =
    route.params;
  const [isFreqModalVisible, setIsFreqModalVisible] = useState(false);
  const [isSharedModalVisible, setIsSharedModalVisible] = useState(false);
  const [TPRadioBtn, setTPRadioBtn] = useState<string>(timePeriod);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newFrequency, setNewFrequency] = useState('');
  const [newWeeklyGoal, setNewWeeklyGoal] = useState<string>(
    timePeriod === TimePeriod.Week ? goalPerTP.toString() : '3',
  );
  const [newMonthlyGoal, setNewMonthlyGoal] = useState<string>(
    timePeriod === TimePeriod.Month ? goalPerTP.toString() : '10',
  );
  const [newSharedWith, setNewSharedWith] = useState(friends);

  useEffect(() => {
    setNewName(name);
    setNewDescription(description);
    setTPRadioBtn(timePeriod);
    if (timePeriod === TimePeriod.Day) {
      setNewFrequency('Every day');
    } else if (timePeriod === TimePeriod.Week) {
      setNewFrequency(goalPerTP.toString() + ' times per week');
      setNewWeeklyGoal(goalPerTP.toString());
    } else {
      setNewFrequency(goalPerTP.toString() + ' times per month');
      setNewMonthlyGoal(goalPerTP.toString());
    }
  }, [name, description, timePeriod, goalPerTP]);

  useLayoutEffect(() => {
    const handleSave = () => {
      const habitRef = firestore().collection('habits').doc(uid);
      habitRef.update({
        name: newName,
        description: newDescription,
        timePeriod: TPRadioBtn,
        goalPerTP:
          TPRadioBtn === TimePeriod.Day
            ? 1
            : TPRadioBtn === TimePeriod.Week
            ? newWeeklyGoal
            : newMonthlyGoal,
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
  ]);

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
          sharedFriends={friends}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditHabitScreen;
