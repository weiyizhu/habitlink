import React from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {useUserContext} from '../utils/fn';
import {SettingsScreenProp} from '../utils/types';
import {useNavigation} from '@react-navigation/native';
import {signOut} from '../utils/auth';

const SettingsScreen = () => {
  const tailwind = useTailwind();
  const {user, setUser, setSnackE, unsubscribe} = useUserContext();
  const navigation = useNavigation<SettingsScreenProp>();

  const fontFam = {
    fontSize: 18,
    padding: 3,
    fontFamily: 'YaldeviColombo-SemiBold',
  };

  return (
    <View style={tailwind('flex-1 items-start justify-start m-5')}>
      <Text style={fontFam}>{user?.name}</Text>
      <Text style={fontFam}>{user?.email}</Text>
      <Text style={fontFam} onPress={() => navigation.navigate('ResetStack')}>
        Reset Password
      </Text>
      <Text
        style={fontFam}
        onPress={() =>
          signOut()
            .then(() => {
              setUser(null);
              unsubscribe();
              navigation.navigate('RootLoginStack');
            })
            .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
              setSnackE(error.message);
            })
        }
      >
        Log Out
      </Text>
    </View>
  );
};

export default SettingsScreen;
