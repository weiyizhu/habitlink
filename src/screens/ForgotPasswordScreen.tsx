import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {TextInput, HelperText} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenProp} from '../utils/types';
import {sendPasswordReset} from '../utils/auth';
import firestore from '@react-native-firebase/firestore';
import {User} from '../utils/models';
import {useUserContext} from '../utils/fn';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<AuthScreenProp>();
  const {user, setSnackE} = useUserContext();
  const [username, setUsername] = useState('');
  const [usernameE, setUsernameE] = useState('');

  useEffect(() => {
    if (user != null) {
      navigation.navigate('RootHomeStack');
    }
  }, [navigation, user]);

  const tailwind = useTailwind();
  return (
    <View style={tailwind('flex-1 items-center justify-center')}>
      <Text
        style={{
          fontSize: 48,
          fontFamily: 'YaldeviColombo-SemiBold',
          height: 120,
          textAlign: 'center',
        }}
      >
        Habitlink
      </Text>
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
          setUsernameE('');
          sendPasswordReset(username)
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
      <View style={tailwind('absolute bottom-0 w-full')}>
        <View
          style={{
            borderBottomColor: '#D1D5DB',
            borderBottomWidth: 0.5,
          }}
        />
        <View style={tailwind('py-10')}>
          <Text style={tailwind('text-center font-medium text-gray-400')}>
            {' '}
            Ready to sign in?{' '}
            <Text
              onPress={() => navigation.navigate('RootLoginStack')}
              style={tailwind('text-blue-500')}
            >
              Log In
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
