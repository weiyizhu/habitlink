import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal/dist/modal';
import {useTailwind} from 'tailwind-rn/dist';
import {DialogProps} from '../utils/types';

const Dialog = ({
  isDialogVisible,
  setIsDialogVisible,
  handleYes,
  title,
  message,
  yesLabel = 'Yes',
  noLabel = 'No',
}: DialogProps) => {
  const tailwind = useTailwind();

  return (
    <Modal
      isVisible={isDialogVisible}
      onBackdropPress={() => setIsDialogVisible(false)}
      // useNativeDriver
      // hideModalContentWhileAnimating
      animationIn="fadeIn"
      animationOut="fadeOut">
      <View style={tailwind('bg-white p-7')}>
        <Text style={tailwind('text-2xl pb-3 font-YC_SemiBold')}>{title}</Text>
        <Text style={tailwind('text-lg font-YC_Medium pb-3')}>{message}</Text>
        <View style={tailwind('flex-row justify-end')}>
          <Text
            style={tailwind('text-xl font-YC_Medium mr-6 font-bold')}
            onPress={() => setIsDialogVisible(false)}>
            {noLabel}
          </Text>
          <Text
            style={tailwind('text-xl font-YC_Medium mr-2 font-bold')}
            onPress={() => {
              setIsDialogVisible(false);
              handleYes();
            }}>
            {yesLabel}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default Dialog;
