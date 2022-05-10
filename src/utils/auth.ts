import auth from '@react-native-firebase/auth';

const getCurrentUser = () => {
  return auth().currentUser;
};

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

const deleteAccount = () => {
  return auth().currentUser?.delete();
};

export {createAccount, signIn, signOut, sendPasswordReset, deleteAccount, getCurrentUser};
