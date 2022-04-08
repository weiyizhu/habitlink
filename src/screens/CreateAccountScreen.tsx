import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {TextInput, HelperText} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {useNavigation} from '@react-navigation/native';
import {CreateAccountScreenProp} from '../utils/types';
import {createAccount} from '../utils/auth';
import firestore from '@react-native-firebase/firestore';
import {User, WLD} from '../utils/models';
import {useUserContext} from '../utils/fn';

const CreateAccountScreen = () => {
  const navigation = useNavigation<CreateAccountScreenProp>();
  const {user, setUser, setUid, setSnackE} = useUserContext();
  const [username, setUsername] = useState('');
  const [usernameE, setUsernameE] = useState('');
  const [password, setPassword] = useState('');
  const [passwordE, setPasswordE] = useState('');
  const [name, setName] = useState('');
  const [nameE, setNameE] = useState('');

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
        placeholder="Email / Username"
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
      <TextInput
        style={tailwind(
          'border border-gray-200 bg-gray-50 p-2 m-2 h-5 w-10/12 rounded-md',
        )}
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        placeholder="Name"
        value={name}
        error={nameE !== ''}
        onChangeText={val => setName(val)}
      />
      <View style={tailwind('w-10/12')}>
        <HelperText
          style={tailwind('text-left')}
          type="error"
          visible={nameE !== ''}
        >
          {nameE}
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
        onChangeText={val => setPassword(val)}
      />
      <View style={tailwind('w-10/12')}>
        <HelperText
          style={tailwind('text-left')}
          type="error"
          visible={passwordE !== ''}
        >
          {passwordE}
        </HelperText>
      </View>
      <TouchableOpacity
        style={tailwind('bg-blue-500 rounded py-2 my-3 w-10/12')}
        onPress={() => {
          setUsernameE('');
          setPasswordE('');
          setNameE('');
          const pwd = password;
          setPassword('');
          if (name === '') {
            setNameE('Please enter a name');
            return;
          }

          createAccount(username, pwd)
            .then((authUser: FirebaseAuthTypes.UserCredential) => {
              const wld: WLD = {wins: 0, losses: 0, draws: 0};
              const newUser: User = {
                email: username,
                name: name,
                competition: null,
                wld: wld,
                friends: [],
                sentFriendRequests: [],
                competitionRequests: []
              };

              firestore()
                .collection('users')
                .doc(authUser.user.uid)
                .set(newUser)
                .then(() => {
                  const userRef = firestore()
                    .collection('users')
                    .doc(authUser.user.uid);
                  setUid(authUser.user.uid);
                  userRef.onSnapshot(documentSnapshot => {
                    const currentUser = documentSnapshot.data() as User | null;
                    if (currentUser) setUser(currentUser);
                  });

                  navigation.navigate('RootHomeStack');
                });
            })
            .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
              if (error.code === 'auth/email-already-in-use') {
                setUsernameE('That email address is already in use');
              } else if (error.code === 'auth/invalid-email') {
                setUsernameE('Invalid email');
              } else if (error.code === 'auth/user-not-found') {
                setUsernameE('A user with this email was not found');
              } else if (error.code === 'auth/invalid-password') {
                setPasswordE('Invalid password');
              } else if (error.code === 'auth/weak-password') {
                setPasswordE('Weak password, try making it longer');
              } else {
                setSnackE(error.message);
              }
            });
        }}
      >
        <Text style={tailwind('text-white text-center')}> Create Account </Text>
      </TouchableOpacity>
      <View style={tailwind('absolute bottom-0 w-full')}>
        <View
          style={{
            borderBottomColor: '#D1D5DB',
            borderBottomWidth: 0.5,
          }}
        />
        <View style={tailwind('py-10')}>
          <Text style={tailwind('text-center font-YC_Medium text-gray-400')}>
            {' '}
            Already have an account?{' '}
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

export default CreateAccountScreen;
