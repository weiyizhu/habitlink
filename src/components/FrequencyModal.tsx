import React, {useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import {RadioButton, Snackbar, TextInput} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import {FrequencyModalProps, TimePeriod} from '../utils/types';
import Modal from 'react-native-modal/dist/modal';
import FrequencyRadioBtn from './FrequencyRadioBtn';

const FrequencyModal = ({
  isFreqModalVisible,
  setIsFreqModalVisible,
  TPRadioBtn,
  setTPRadioBtn,
  newWeeklyGoal,
  setNewWeeklyGoal,
  newMonthlyGoal,
  setNewMonthlyGoal,
  setNewFrequency,
}: FrequencyModalProps) => {
  const tailwind = useTailwind();
  const [snackE, setSnackE] = useState('');

  const handleModalSave = () => {
    if (TPRadioBtn === TimePeriod.Day) {
      setNewFrequency('Every day');
    } else if (TPRadioBtn === TimePeriod.Week) {
      const parsedNum = parseInt(newWeeklyGoal, 10);
      if (parsedNum === 7) {
        setTPRadioBtn(TimePeriod.Day);
        setNewFrequency('Every day');
      } else if (parsedNum > 7 || parsedNum <= 0) {
        setSnackE('Weekly goal has to be between 1 and 7');
        return;
      } else setNewFrequency(newWeeklyGoal + ' times per week');
    } else {
      const parsedNum = parseInt(newMonthlyGoal, 10);
      if (parsedNum === 30 || parsedNum === 31) {
        setTPRadioBtn(TimePeriod.Day);
        setNewFrequency('Every day');
      } else if (parsedNum > 31 || parsedNum <= 0) {
        setSnackE('Monthly goal has to be between 1 and 31');
        return;
      } else setNewFrequency(newMonthlyGoal + ' times per month');
    }
    setIsFreqModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Modal
        isVisible={isFreqModalVisible}
        onBackdropPress={() => setIsFreqModalVisible(false)}
        // useNativeDriver
        // hideModalContentWhileAnimating
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View style={tailwind('bg-white p-7')}>
          <RadioButton.Group
            onValueChange={val => {
              setTPRadioBtn(val);
              Keyboard.dismiss();
            }}
            value={TPRadioBtn}>
            <View style={tailwind('flex-row items-center mb-3')}>
              <RadioButton value={TimePeriod.Day} />
              <Text style={tailwind('text-xl font-Regular pl-3')}>
                Every day
              </Text>
            </View>
            <FrequencyRadioBtn
              goal={newWeeklyGoal}
              setGoal={setNewWeeklyGoal}
              maxLength={1}
              setTPRadioBtn={setTPRadioBtn}
              timePeriod={TimePeriod.Week}
            />
            <FrequencyRadioBtn
              goal={newMonthlyGoal}
              setGoal={setNewMonthlyGoal}
              maxLength={2}
              setTPRadioBtn={setTPRadioBtn}
              timePeriod={TimePeriod.Month}
            />
          </RadioButton.Group>
          <Text
            style={tailwind('text-xl font-Medium self-end mr-2')}
            onPress={handleModalSave}>
            Save
          </Text>
        </View>
        <Snackbar
          visible={snackE !== ''}
          onDismiss={() => {
            setSnackE('');
          }}>
          {snackE}
        </Snackbar>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default FrequencyModal;
