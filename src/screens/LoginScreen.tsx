import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {TextInput, HelperText, Snackbar} from 'react-native-paper';
import React, { ChangeEvent, useState } from 'react';
import {Text, TouchableOpacity, View, TextInputChangeEventData, NativeSyntheticEvent} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import { setUser, signIn} from '../utils/auth';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenProp } from '../utils/types';

const LoginScreen = () => {
  const navigation = useNavigation<AuthScreenProp>()
  const [username, setUsername] = useState('')
  const [usernameE, setUsernameE] = useState('')
  const [password, setPassword] = useState('')
  const [passwordE, setPasswordE] = useState('')
  const [snackE, setSnackE] = useState('')

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
        activeUnderlineColor='transparent'
        placeholder="Username"
        value={username}
        error={usernameE !== ''}
        onChangeText={(val) => setUsername(val)}
      />
      <View style={tailwind('w-10/12')} >
      <HelperText style={tailwind('text-left')} type="error" visible={usernameE !== ''}>
        {usernameE}
      </HelperText>
      </View>
      <TextInput
        style={tailwind(
          'border border-gray-200 bg-gray-50 p-2 m-2 h-5 w-10/12 rounded-md',
        )}
        secureTextEntry={true}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        placeholder="Password"
        value={password}
        error={passwordE !== ''}
 onChangeText={(val) => setPassword(val)}
      />
      <View style={tailwind('w-10/12')}>
      <HelperText type="error" visible={passwordE !== ''}>
        {passwordE}
      </HelperText>
      </View>
      <Text style={tailwind('text-right w-10/12 pb-4 text-blue-500')}>
        {' '}
        Forgot password?
      </Text>
      <TouchableOpacity
        style={tailwind('bg-blue-300 rounded py-2 my-3 w-10/12')
      } onPress={() => {
        setUsernameE('')
        setPasswordE('')
        setPassword('')
        signIn(username, password).then((user: FirebaseAuthTypes.UserCredential) => {
          setUser(user);
          navigation.navigate('RootHomeStack')
        }).catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
          if (error.code === 'auth/email-already-in-use') {
            setUsernameE('That email address is already in use');
          } else if (error.code === 'auth/invalid-email') {
            setUsernameE("Invalid email")
          } else if (error.code === 'auth/user-not-found') {
            setUsernameE('A user with this email was not found')
          } else if (error.code === 'auth/invalid-password') {
            setPasswordE('Invalid password')
          } else if (error.code === 'auth/wrong-password') {
            setPasswordE('Wrong password')
          } else {
              setSnackE(error.message)
          }
                  })
                }
      }
      >
        <Text style={tailwind('text-white text-center')}> Log In</Text>
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
            Don't have an account?{' '}
            <Text style={tailwind('text-blue-500')}>Sign Up</Text>
          </Text>
        </View>
      </View>

      <Snackbar visible={(snackE !== '')} onDismiss={()=>{setSnackE('')}}>
            {snackE}
      </Snackbar>
    </View>
  );
};

export default LoginScreen;
