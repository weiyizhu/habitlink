import {TextInput, HelperText} from 'react-native-paper';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {AddFriendNavigationProp} from '../utils/types';
import firestore from '@react-native-firebase/firestore';
import {useUserContext} from '../utils/fn';

const AddFriendsScreen = ({navigation}: AddFriendNavigationProp) => {
  const {uid, user, setSnackE} = useUserContext();
  const [friendRequest, setFriendRequest] = useState('');
  const [friendRequestE, setFriendRequestE] = useState('');

  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 items-center justify-center')}>
      <TextInput
        style={tailwind(
          'border border-gray-200 bg-gray-50 p-2 m-2 h-5 w-10/12 rounded-md',
        )}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        placeholder="Email"
        value={friendRequest}
        error={friendRequestE !== ''}
        onChangeText={val => setFriendRequest(val)}
      />
      <View style={tailwind('w-10/12')}>
        <HelperText
          style={tailwind('text-left')}
          type="error"
          visible={friendRequestE !== ''}>
          {friendRequestE}
        </HelperText>
      </View>
      <TouchableOpacity
        style={tailwind('bg-blue-500 rounded py-2 my-3 w-10/12')}
        onPress={() => {
          const temp = friendRequest;
          setFriendRequest('');
          setFriendRequestE('');

          const re = /^(.+)@(.+)$/;
          if (temp === '') {
            setFriendRequestE('Please enter a value');
            return;
          } else if (!re.test(temp)) {
            setFriendRequestE('Please enter a valid email address');
            return;
          } else if (temp.toLowerCase() === user?.email.toLowerCase()) {
            console.log(temp.toLowerCase());
            console.log(user?.email.toLowerCase());
            setFriendRequestE('You can not send a friend request to yourself');
            return;
          }

          firestore()
            .collection('users')
            // Filter results
            .where('email', '==', temp)
            .get()
            .then(querySnapshot => {
              if (querySnapshot.size > 1) {
                setSnackE('An error occurred');
              } else if (querySnapshot.size === 0) {
                setSnackE(
                  'If a user exists with this email, a friend request has been sent to them',
                );
                return;
              }

              querySnapshot.forEach(documentSnapshot => {
                firestore()
                  .collection('users')
                  .doc(uid as string)
                  .update({
                    sentFriendRequests: firestore.FieldValue.arrayUnion(
                      documentSnapshot.id,
                    ),
                  });
              });

              setSnackE(
                'If a user exists with this email, a friend request has been sent to them',
              );
            });
        }}>
        <Text style={tailwind('text-white text-center')}>
          {' '}
          Send Friend Request
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddFriendsScreen;
