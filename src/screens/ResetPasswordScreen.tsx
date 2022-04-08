import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {TextInput, HelperText, Button} from 'react-native-paper';
import React, {useState} from 'react';
import {View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {sendPasswordReset} from '../utils/auth';
import {useUserContext} from '../utils/fn';
import {ResetScreenNavigationProp} from '../utils/types';

const ResetPasswordScreen = ({navigation}: ResetScreenNavigationProp) => {
  const {user, setSnackE} = useUserContext();
  const [username, setUsername] = useState('');
  const [usernameE, setUsernameE] = useState('');

  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 px-7')}>
      <View style={tailwind('py-3')}></View>
      <TextInput
        style={tailwind(
          'border border-gray-200 bg-gray-50 p-2 m-1 h-5 rounded-md',
        )}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        placeholder="Username"
        value={username}
        error={usernameE !== ''}
        onChangeText={val => setUsername(val)}
      />
      <View style={tailwind('w-10/12 pb-1')}>
        <HelperText
          style={tailwind('text-left')}
          type="error"
          visible={usernameE !== ''}
        >
          {usernameE}
        </HelperText>
      </View>
      <Button
        icon="send"
        mode="contained"
        color="lightgreen"
        style={tailwind('mt-5 m-1')}
        onPress={() => {
          const temp = username;
          setUsername('');
          setUsernameE('');
          sendPasswordReset(temp)
            .then(() => {
              setSnackE('If this user exits, a reset password email was sent');
            })
            .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
              if (error.code === 'auth/invalid-email') {
                setUsernameE('Invalid email');
              } else if (error.code === 'auth/user-not-found') {
                setSnackE(
                  'If this user exits, a reset password email was sent',
                );
              } else {
                setSnackE(error.message);
              }
            });
        }}
      >
        Send Reset Email
      </Button>
    </View>
  );
};

export default ResetPasswordScreen;
