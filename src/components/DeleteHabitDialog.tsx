import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal/dist/modal';
import {useTailwind} from 'tailwind-rn/dist';
import {DeleteHabitDialogProps} from '../utils/types';

const DeleteHabitDialog = ({
  isDeleteDialogVisible,
  setIsDeleteDialogVisible,
  handleDeleteHabit,
}: DeleteHabitDialogProps) => {
  const tailwind = useTailwind();

  return (
    <Modal
      isVisible={isDeleteDialogVisible}
      onBackdropPress={() => setIsDeleteDialogVisible(false)}
      // useNativeDriver
      // hideModalContentWhileAnimating
      animationIn="fadeIn"
      animationOut="fadeOut">
      <View style={tailwind('bg-white p-7')}>
        <Text style={tailwind('text-2xl font-Medium pb-3 font-semibold')}>
          Delete habit?
        </Text>
        <Text style={tailwind('text-lg font-Medium pb-3')}>
          The habit will be permanently deleted. This action cannot be undone.
        </Text>
        <View style={tailwind('flex-row justify-end')}>
          <Text
            style={tailwind('text-xl font-Medium mr-6 font-semibold')}
            onPress={() => setIsDeleteDialogVisible(false)}>
            No
          </Text>
          <Text
            style={tailwind('text-xl font-Medium mr-2 font-semibold')}
            onPress={() => {
              setIsDeleteDialogVisible(false);
              handleDeleteHabit();
            }}>
            Yes
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteHabitDialog;
