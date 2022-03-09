import React, {useEffect, useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {FriendCheckbox, SharedWithModalProps} from '../utils/types';
import Modal from 'react-native-modal/dist/modal';
import firestore from '@react-native-firebase/firestore';
import {User} from '../utils/models';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SharedWithModal = ({
  isSharedModalVisible,
  setIsSharedModalVisible,
  newSharedWith,
  setNewSharedWith,
  userUid,
}: SharedWithModalProps) => {
  const tailwind = useTailwind();
  const [friendsList, setFriendsList] = useState<FriendCheckbox[]>([]);

  useEffect(() => {
    const fetchInfo = async () => {
      const userRef = await firestore().collection('users').doc(userUid).get();
      const userData = userRef.data() as User;
      const friendsIds = userData.friends;
      const getFriendsNames = friendsIds.map(async uid => {
        const friendRef = await firestore().collection('users').doc(uid).get();
        const friendData = friendRef.data() as User;
        const name = friendData.name;
        const obj: FriendCheckbox = {
          uid,
          name,
          checked: newSharedWith.includes(uid),
        };
        return obj;
      });
      Promise.all(getFriendsNames).then(val => setFriendsList(val));
    };

    fetchInfo();
  }, [newSharedWith, userUid]);

  const handleModalSave = () => {
    const getCheckedFriends = friendsList
      .filter(friend => friend.checked)
      .map(friend => friend.uid);
    setNewSharedWith(getCheckedFriends);
    setIsSharedModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Modal
        isVisible={isSharedModalVisible}
        onBackdropPress={() => setIsSharedModalVisible(false)}
        // useNativeDriver
        // hideModalContentWhileAnimating
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View style={tailwind('bg-white p-7')}>
          {friendsList.map(value => (
            <View style={tailwind('flex-row mb-3 items-center')}>
              <MaterialCommunityIcons
                key={value.uid}
                onPress={() => {
                  setFriendsList(prev => {
                    // copy original array of obj
                    const newFriendsList = [...prev];
                    // find the obj that needs to be updated
                    const index = newFriendsList.findIndex(
                      e => e.uid === value.uid,
                    );
                    // update
                    newFriendsList[index].checked =
                      !newFriendsList[index].checked;
                    return newFriendsList;
                  });
                }}
                name={
                  value.checked ? 'checkbox-marked' : 'checkbox-blank-outline'
                }
                size={25}
              />
              <Text
                style={tailwind('text-xl font-Regular pl-3')}>
                {value.name}
              </Text>
            </View>
          ))}
          <Text
            style={tailwind('text-xl font-Medium self-end mr-2')}
            onPress={handleModalSave}>
            Save
          </Text>
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default SharedWithModal;
