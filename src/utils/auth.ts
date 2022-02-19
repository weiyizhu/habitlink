import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

let user: FirebaseAuthTypes.UserCredential | null = null;

const createAccount = (email: string, password: string) => {
  return auth()
    .createUserWithEmailAndPassword(email, password)
};

const sendPasswordReset = (email: string) => {
  return auth()
    .sendPasswordResetEmail(email)
};

const signIn = (email: string, password: string) => {
  return auth()
    .signInWithEmailAndPassword(email, password)
};

const signOut = () => {
  return auth()
    .signOut()
};

const setUser = (newUser: FirebaseAuthTypes.UserCredential) => {
  user = newUser;
}

const getUser = () => {
  return user;
}

export {createAccount, signIn, signOut, setUser, getUser};
