import React, {useState} from 'react';
import {firebase, FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Linking, Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {useUserContext} from '../utils/fn';
import {SettingsScreenProp} from '../utils/types';
import {useNavigation} from '@react-navigation/native';
import {deleteAccount, signOut} from '../utils/auth';
import {Habit, User} from '../utils/models';
import Dialog from '../components/Dialog';

const SettingsScreen = () => {
  const tailwind = useTailwind();
  const {user, uid, setUser, setSnackE, unsubscribe} = useUserContext();
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const navigation = useNavigation<SettingsScreenProp>();

  const fontFam = {
    fontSize: 18,
    padding: 3,
    fontFamily: 'YaldeviColombo-SemiBold',
  };

  const fontFamRed = {
    fontSize: 18,
    padding: 3,
    fontFamily: 'YaldeviColombo-SemiBold',
    color: 'red',
  };

  const delAccount = () => {
    if (user?.competition && Object.keys(user.competition).length > 0) {
      firebase
        .firestore()
        .collection('users')
        .doc(user.competition.competitor)
        .update({competition: {}});
      firebase
        .firestore()
        .collection('users')
        .doc(uid as string)
        .update({competition: {}});

      const otherRef = firebase
        .firestore()
        .collection('habits')
        .where('user', '==', user.competition.competitor)
        .where('inCompetition', '==', true);
      otherRef.get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          firebase
            .firestore()
            .collection('habits')
            .doc(documentSnapshot.id)
            .update({inCompetition: false});
        });
      });
    }

    const habitRef = firebase
      .firestore()
      .collection('habits')
      .where('friends', 'array-contains', uid);

    habitRef.get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const habit = documentSnapshot.data() as Habit;
        const newFriends = habit.friends.filter(item => item !== uid);
        firebase
          .firestore()
          .collection('habits')
          .doc(documentSnapshot.id)
          .update({friends: newFriends});
      });
    });

    user?.friends.forEach(element => {
      firebase
        .firestore()
        .collection('users')
        .doc(element)
        .get()
        .then(snapshot => {
          const friendUser = snapshot.data() as User;
          const newfriendUserArray = friendUser.friends.filter(
            item => item !== uid,
          );
          const friendCompRequests = friendUser.competitionRequests.filter(
            item => item.uid !== uid,
          );
          firebase.firestore().collection('users').doc(element).update({
            friends: newfriendUserArray,
            competitionRequests: friendCompRequests,
          });
        });
    });

    const myHabits = firebase
      .firestore()
      .collection('habits')
      .where('user', '==', uid);

    myHabits.get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        firebase
          .firestore()
          .collection('habits')
          .doc(documentSnapshot.id)
          .delete();
      });
    });

    const friendRequestRef = firebase
      .firestore()
      .collection('users')
      .where('sentFriendRequests', 'array-contains', uid);

    friendRequestRef.get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        const friend = documentSnapshot.data() as User;
        const newFriendRequests = friend.sentFriendRequests.filter(
          item => item !== uid,
        );
        firebase
          .firestore()
          .collection('users')
          .doc(documentSnapshot.id)
          .update({sentFriendRequests: newFriendRequests});
      });
    });

    const currentId = uid;

    firebase
      .firestore()
      .collection('users')
      .doc(currentId as string)
      .delete();

    deleteAccount()
      ?.then(() => {
        setUser(null);
        unsubscribe();
        navigation.navigate('RootLoginStack');
      })
      .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
        setSnackE(error.message);
      });

    setIsDialogVisible(false);
  };

  return (
    <View style={tailwind('flex-1 items-start justify-start m-5')}>
      <Text style={fontFam}>Name: {user?.name}</Text>
      <Text style={fontFam}>Email: {user?.email}</Text>
      <Text style={fontFam} onPress={() => navigation.navigate('ResetStack')}>
        Change Password
      </Text>
      <View style={tailwind('py-2')} />
      <Text style={fontFam}>About Us</Text>
      <Text
        style={fontFam}
        onPress={() =>
          Linking.openURL('mailto:sferia@icloud.com?subject=Habitlink Feedback')
        }
      >
        Send Us Feedback
      </Text>
      <Text style={fontFam}>Rate Us</Text>
      <View style={tailwind('py-2')} />
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
      <Text
        style={fontFamRed}
        onPress={() => {
          setIsDialogVisible(true);
        }}
      >
        Delete Account
      </Text>
      <Dialog
        isDialogVisible={isDialogVisible}
        setIsDialogVisible={setIsDialogVisible}
        title="Warning"
        message={
          'You are about to delete your account, are you sure you want to delete it?'
        }
        handleYes={delAccount}
        yesLabel="Proceed"
        noLabel="Cancel"
      />
    </View>
  );
};

export default SettingsScreen;
