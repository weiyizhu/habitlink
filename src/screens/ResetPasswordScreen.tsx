import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {TextInput, HelperText} from 'react-native-paper';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {useNavigation} from '@react-navigation/native';
import {ResetScreenProp, SettingsScreenProp} from '../utils/types';
import {sendPasswordReset} from '../utils/auth';
import {useUserContext} from '../utils/fn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ResetScreenNavigationProp} from '../utils/types';

const ResetPasswordScreen = ({navigation}: ResetScreenNavigationProp) => {
  const {user, setSnackE} = useUserContext();
  const [username, setUsername] = useState('');
  const [usernameE, setUsernameE] = useState('');

  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 items-center justify-center')}>
      <TextInput
        style={tailwind(
          'border border-gray-200 bg-gray-50 p-2 m-2 h-5 w-10/12 rounded-md',
        )}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        placeholder="Username"
        value={username}
        error={usernameE !== ''}
        onChangeText={val => setUsername(val)}
      />
      <View style={tailwind('w-10/12')}>
        <HelperText
          style={tailwind('text-left')}
          type="error"
          visible={usernameE !== ''}
        >
          {usernameE}
        </HelperText>
      </View>
      <TouchableOpacity
        style={tailwind('bg-blue-500 rounded py-2 my-3 w-10/12')}
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
        <Text style={tailwind('text-white text-center')}>
          {' '}
          Send Reset Email
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;
