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
      animationOut="fadeOut"
    >
      <View style={tailwind('bg-white p-7')}>
        <Text style={tailwind('text-2xl pb-3 font-YC_SemiBold')}>
          Delete habit?
        </Text>
        <Text style={tailwind('text-lg font-YC_Medium pb-3')}>
          The habit will be permanently deleted. This action cannot be undone.
        </Text>
        <View style={tailwind('flex-row justify-end')}>
          <Text
            style={tailwind('text-xl font-YC_Medium mr-6 font-bold')}
            onPress={() => setIsDeleteDialogVisible(false)}
          >
            No
          </Text>
          <Text
            style={tailwind('text-xl font-YC_Medium mr-2 font-bold')}
            onPress={() => {
              setIsDeleteDialogVisible(false);
              handleDeleteHabit();
            }}
          >
            Yes
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteHabitDialog;
