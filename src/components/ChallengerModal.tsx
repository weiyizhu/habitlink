import React, {useEffect, useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import {Challenger, ChallengerModalProps} from '../utils/types';
import Modal from 'react-native-modal/dist/modal';
import {useUserContext} from '../utils/fn';
import {User} from '../utils/models';
import {firebase} from '@react-native-firebase/firestore';

const ChallengerModal = ({
  isModalVisible,
  setIsModalVisible,
  challenger,
  setChallenger,
}: ChallengerModalProps) => {
  const tailwind = useTailwind();
  const {setSnackE, user} = useUserContext();
  const friends = user?.friends;
  const [friendsList, setFriendsList] = useState<Challenger[]>([]);

  useEffect(() => {
    const fetchInfo = async () => {
      if (friends) {
        const getFriendsNames = friends.map(async friendUid => {
          const friendRef = await firebase
            .firestore()
            .collection('users')
            .doc(friendUid)
            .get();
          const friendData = friendRef.data() as User | undefined;
          if (friendData) {
            const name = friendData.name;
            const obj: Challenger = {
              uid: friendUid,
              name,
            };
            return obj;
          }
        });
        Promise.all(getFriendsNames)
          .then(arr => {
            const filteredFriends: Challenger[] = arr.filter(
              (obj): obj is Challenger => {
                return obj !== undefined;
              },
            );
            setFriendsList(filteredFriends);
          })
          .catch(reason => {
            setSnackE(reason);
          });
      }
    };

    fetchInfo();
  }, [friends, setSnackE]);

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
              const selected = friendsList.find(obj => obj.uid === val);
              selected && setChallenger(selected);
            }}
            value={challenger?.uid ?? ''}
          >
            {friendsList.map(friend => (
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
