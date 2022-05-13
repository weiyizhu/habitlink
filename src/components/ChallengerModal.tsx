import React from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import {ChallengerModalProps} from '../utils/types';
import Modal from 'react-native-modal/dist/modal';
import {useUserContext} from '../utils/fn';

const ChallengerModal = ({
  isModalVisible,
  setIsModalVisible,
  challenger,
  setChallenger,
}: ChallengerModalProps) => {
  const tailwind = useTailwind();
  const {friends} = useUserContext();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        // useNativeDriver
        // hideModalContentWhileAnimating
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={tailwind('bg-white p-7')}>
          <Text style={tailwind('text-2xl pb-3 font-YC_SemiBold')}>
            Friends
          </Text>
          <RadioButton.Group
            onValueChange={val => {
              const selected = friends.find(obj => obj.uid === val);
              selected &&
                setChallenger({name: selected.name, uid: selected.uid});
            }}
            value={challenger?.uid ?? ''}
          >
            {friends.map(friend => (
              <View
                key={friend.uid}
                style={tailwind('flex-row items-center mb-3')}
              >
                <RadioButton value={friend.uid} />
                <Text style={tailwind('text-xl font-YC_Regular pl-3')}>
                  {friend.name}
                </Text>
              </View>
            ))}
          </RadioButton.Group>
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default ChallengerModal;
