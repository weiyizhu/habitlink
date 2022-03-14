import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Context, createContext, useState} from 'react';

const createAccount = (email: string, password: string) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

const sendPasswordReset = (email: string) => {
  return auth().sendPasswordResetEmail(email);
};

const signIn = (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};

const signOut = () => {
  return auth().signOut();
};

export {createAccount, signIn, signOut, sendPasswordReset};
