import React from 'react';
import {Text, TouchableOpacity, TextInput, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

const LoginScreen = () => {
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
      />
      <TextInput
        style={tailwind(
          'border border-gray-200 bg-gray-50 p-2 m-3 w-10/12 rounded-md',
        )}
        placeholder="Password"
      />
      <Text style={tailwind('text-right w-10/12 pb-4 text-blue-500')}>
        {' '}
        Forgot password?
      </Text>
      <TouchableOpacity
        style={tailwind('bg-blue-300 rounded py-2 my-3 w-10/12')}
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
