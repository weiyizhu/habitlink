import React, {useEffect, useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {FriendCheckbox, SharedWithModalProps} from '../utils/types';
import Modal from 'react-native-modal/dist/modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useUserContext} from '../utils/fn';

const SharedWithModal = ({
  isSharedModalVisible,
  setIsSharedModalVisible,
  newSharedWith,
  setNewSharedWith,
}: SharedWithModalProps) => {
  const tailwind = useTailwind();
  const {friends} = useUserContext();
  const [friendsList, setFriendsList] = useState<FriendCheckbox[]>([]);

  useEffect(() => {
    const newFriendsList: FriendCheckbox[] = friends.map(friend => ({
      uid: friend.uid,
      name: friend.name,
      checked: newSharedWith.includes(friend.uid),
    }));
    setFriendsList(newFriendsList);
  }, [friends, newSharedWith]);

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
        onDismiss={handleModalSave}
        animationIn="fadeIn"
        animationOut="fadeOut">
        <View style={tailwind('bg-white p-7')}>
          {friendsList.length > 0 ? (
            <>
              {friendsList.map(value => (
                <View
                  key={value.uid}
                  style={tailwind('flex-row mb-3 items-center')}>
                  <MaterialCommunityIcons
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
                      value.checked
                        ? 'checkbox-marked'
                        : 'checkbox-blank-outline'
                    }
                    size={25}
                  />
                  <Text style={tailwind('text-xl font-YC_Regular pl-3')}>
                    {value.name}
                  </Text>
                </View>
              ))}
            </>
          ) : (
            <Text style={tailwind('text-xl font-YC_Regular pl-3')}>
              {'You have no friends lol'}
            </Text>
          )}
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default SharedWithModal;
