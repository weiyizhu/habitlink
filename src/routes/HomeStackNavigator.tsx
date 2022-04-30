import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import CreateHabitScreen from '../screens/CreateHabitScreen';
import DetailsScreen from '../screens/DetailsScreen';
import EditHabitScreen from '../screens/EditHabitScreen';
import HomeScreen from '../screens/HomeScreen';
import {useUserContext} from '../utils/fn';
import {User, UserWID} from '../utils/models';
import {HomeStackParamList} from '../utils/types';
import firestore from '@react-native-firebase/firestore';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  const {uid, friends, setFriends, friendRequests, setFriendRequests} =
    useUserContext();

  useEffect(() => {
    const socialRef = firestore()
      .collection('users')
      .where('friends', 'array-contains', uid);

    return socialRef.onSnapshot(querySnapshot => {
      const toAdd: UserWID[] = [];

      querySnapshot.forEach(friend => {
        const obj: User = friend.data() as User;
        toAdd.push({...obj, uid: friend.id});
      });

      setFriends(toAdd);
    });
  }, [uid, setFriends]);

  useEffect(() => {
    const friendRequestRef = firestore()
      .collection('users')
      .where('sentFriendRequests', 'array-contains', uid);

    return friendRequestRef.onSnapshot(querySnapshot => {
      const toAdd: UserWID[] = [];

      querySnapshot.forEach(friend => {
        const obj: User = friend.data() as User;
        toAdd.push({...obj, uid: friend.id});
      });

      setFriendRequests(toAdd);
    });
  }, [uid, setFriendRequests]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 48,
          fontFamily: 'YaldeviColombo-SemiBold',
        },
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          left: 20,
        },
        headerBackTitleStyle: {
          fontFamily: 'YaldeviColombo-SemiBold',
        },
        headerStyle: {
          height: 150,
        },
        headerRightContainerStyle: {
          paddingLeft: 15,
        },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={() => ({
          title: 'Hablink',
        })}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen
        name="EditHabit"
        component={EditHabitScreen}
        options={() => ({
          title: 'Edit Habit',
        })}
      />
      <Stack.Screen
        name="CreateHabit"
        component={CreateHabitScreen}
        options={() => ({
          title: 'Create Habit',
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
