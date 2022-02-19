import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {TextField} from 'react-native-material-textfield';
import React, { ChangeEvent, useState } from 'react';
import {Text, TouchableOpacity, TextInput, View, TextInputChangeEventData, NativeSyntheticEvent} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import { setUser, signIn} from '../utils/auth';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenProp } from '../utils/types';

const LoginScreen = () => {
  const navigation = useNavigation<AuthScreenProp>()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
          'border border-gray-200 bg-gray-50 p-2 m-2 w-10/12 rounded-md',
        )}
        placeholder="Username"
        value={username}
        onChangeText={(val) => setUsername(val)}
      />
      <TextInput
        style={tailwind(
          'border border-gray-200 bg-gray-50 p-2 m-3 w-10/12 rounded-md',
        )}
        placeholder="Password"
        value={password}
 onChangeText={(val) => setPassword(val)}
      />
      <Text style={tailwind('text-right w-10/12 pb-4 text-blue-500')}>
        {' '}
        Forgot password?
      </Text>
      <TouchableOpacity
        style={tailwind('bg-blue-300 rounded py-2 my-3 w-10/12')
      } onPress={() => 
        signIn(username, password).then((user: FirebaseAuthTypes.UserCredential) => {
          setUser(user);
          navigation.navigate('RootHomeStack')
        }).catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
          console.log("hi")
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use');
          } else if (error.code === 'auth/invalid-email') {
            console.log("Invalid email")
          } else if (error.code === 'auth/invalid-password') {
            console.log('Invalid password')
          } else {
              console.error(error);

          }
                  })
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
    </View>
  );
};

export default LoginScreen;
