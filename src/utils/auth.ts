import auth from '@react-native-firebase/auth';

const createAccount = (email: string, password: string) => {
	return auth()
		.createUserWithEmailAndPassword(email, password)
		.catch((error) => console.log(error));
};

const signIn = (email: string, password: string) => {
	return auth()
		.signInWithEmailAndPassword(email, password)
		.catch((error) => console.log(error));
};

const signOut = () => {
	return auth()
		.signOut()
		.catch((error) => console.log(error));	
};

export {createAccount, signIn, signOut};
