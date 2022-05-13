import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import BottomTabNavigator from './BottomTabNavigator';
import AppIntroScreen from '../screens/AppIntroScreen';
import { getCurrentUser } from '../utils/auth';
import firestore from '@react-native-firebase/firestore';
import { useUserContext } from '../utils/fn';
import { User } from '../utils/models';
import { AuthScreenProp } from '../utils/types';
import { useNavigation } from '@react-navigation/native';

const RootStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation<AuthScreenProp>();
 const {user, setUser, setUid, setSnackE, setUnsubscribe, unsubscribe} =
    useUserContext();

  useEffect(() => {
    const temp = getCurrentUser();
    if (temp != null) {
      const userRef = firestore()
      .collection('users')
      .doc(temp.uid);
      setUid(temp.uid);
      const unsubscribeFun = userRef.onSnapshot(documentSnapshot => {
      const currentUser = documentSnapshot.data() as User | null;
      if (currentUser) {
        setUser(currentUser);
      }
    });
    setUnsubscribe(() => unsubscribeFun);
    navigation.navigate('RootHomeStack');
    }
  }, [setUid, setUnsubscribe, setUser, navigation]);


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="RootLoginStack"
    >
      <Stack.Screen name="RootLoginStack" component={LoginScreen} />
      <Stack.Screen name="RootHomeStack" component={BottomTabNavigator} />
      <Stack.Screen name="RootCreateStack" component={CreateAccountScreen} />
      <Stack.Screen name="RootAppIntroStack" component={AppIntroScreen} />
      <Stack.Screen name="RootForgotStack" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
