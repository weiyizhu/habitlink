import {firebase} from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTailwind} from 'tailwind-rn/dist';
import CompetitionDates from '../components/CompetitionDates';
import CompetitorInfo from '../components/CompetitorInfo';
import CustomText from '../components/CustomText';
import FloatingBtn from '../components/FloatingBtn';
import RequestCard from '../components/RequestCard';
import {
  DeleteCompetitionRequest,
  isCompetitionFinished,
  useUserContext,
} from '../utils/fn';
import {CompetitionRequest, Habit, User} from '../utils/models';
import {CompetitionScreenProp, fontType, HabitWithUid} from '../utils/types';
import CompetitionEndPage from '../components/CompetitionEndPage';

const CompetitionScreen = ({route, navigation}: CompetitionScreenProp) => {
  const tailwind = useTailwind();
  const {user, uid} = useUserContext();
  const [myHabits, setMyHabits] = useState<HabitWithUid[]>([]);
  const [compUser, setCompUser] = useState<User>();
  const [compHabits, setCompHabits] = useState<HabitWithUid[]>([]);

  // https://stackoverflow.com/a/63289170
  useEffect(() => {
    (user &&
      user.competition &&
      Object.keys(user.competition).length > 0 &&
      compUser &&
      compUser.competition &&
      Object.keys(compUser.competition).length > 0) ||
    isCompetitionFinished(user)
      ? navigation.setOptions({headerShown: false})
      : navigation.setOptions({headerShown: true});
  }, [compUser, navigation, user]);

  useEffect(() => {
    if (user && user.competition && Object.keys(user.competition).length > 0) {
      const habitRef = firebase
        .firestore()
        .collection('habits')
        .where('user', '==', uid)
        .where('inCompetition', '==', true);
      return habitRef.onSnapshot(querySnapshot => {
        const habitList: HabitWithUid[] = [];
        querySnapshot.forEach(doc => {
          const habitInfo = doc.data() as Habit;
          habitList.push({...habitInfo, uid: doc.id});
        });
        setMyHabits(habitList);
      });
    }
  }, [uid, user]);

  useEffect(() => {
    if (user && user.competition && Object.keys(user.competition).length > 0) {
      const {competitor} = user.competition;
      const compUserRef = firebase
        .firestore()
        .collection('users')
        .doc(competitor);
      return compUserRef.onSnapshot(snapshot => {
        const compUserInfo = snapshot.data() as User;
        setCompUser(compUserInfo);
      });
    }
  }, [compUser, user]);

  useEffect(() => {
    if (user && user.competition && Object.keys(user.competition).length > 0) {
      const {competitor} = user.competition;
      const habitRef = firebase
        .firestore()
        .collection('habits')
        .where('user', '==', competitor)
        .where('inCompetition', '==', true);
      return habitRef.onSnapshot(querySnapshot => {
        const habitList: HabitWithUid[] = [];
        querySnapshot.forEach(doc => {
          const habitInfo = doc.data() as Habit;
          habitList.push({...habitInfo, uid: doc.id});
        });
        setCompHabits(habitList);
      });
    }
  }, [user]);

  const handlePlusCirclePress = () => {
    navigation.navigate('CreateCompetition');
  };

  const handleRequestCheck = (request: CompetitionRequest) => {
    navigation.navigate('AcceptCompetition', {
      request,
    });
  };
  const handleRequestCross = (requestUserId: string) => {
    if (user && uid) {
      DeleteCompetitionRequest(user.competitionRequests, uid, requestUserId);
    }
  };

  return (
    <>
      {isCompetitionFinished(user) ? (
        <CompetitionEndPage />
      ) : user &&
        user.competition &&
        Object.keys(user.competition).length > 0 &&
        compUser &&
        compUser.competition &&
        Object.keys(compUser.competition).length > 0 ? (
        <SafeAreaView style={tailwind('flex-1 px-5 items-center')}>
          <CustomText
            font={fontType.SemiBold}
            size={48}
            additionStyle="mt-4 mb-2">
            Competition
          </CustomText>
          <CompetitionDates />
          <View style={tailwind('flex-1 flex-row px-5 justify-center pt-5')}>
            <CompetitorInfo
              wld={user.wld}
              name={user.name}
              habits={myHabits}
              score={Math.ceil(
                (user.competition.completed / user.competition.total) * 100,
              )}
            />
            <View style={tailwind('w-1/12 items-center')}>
              <Text
                style={tailwind(
                  'text-4xl pb-2 font-YC_SemiBold text-transparent',
                )}>
                0
              </Text>
              <Text style={tailwind('text-center text-xl font-YC_SemiBold')}>
                vs
              </Text>
            </View>
            <CompetitorInfo
              wld={compUser.wld}
              name={compUser.name}
              habits={compHabits}
              score={Math.ceil(
                (compUser.competition.completed / compUser.competition.total) *
                  100,
              )}
            />
          </View>
        </SafeAreaView>
      ) : (
        <View style={tailwind('flex-1 px-7 items-center')}>
          {user && user.competitionRequests.length > 0 ? (
            user.competitionRequests.map(request => (
              <RequestCard
                key={request.uid}
                name={request.name}
                check={() => handleRequestCheck(request)}
                close={() => handleRequestCross(request.uid)}
              />
            ))
          ) : (
            <CustomText font={fontType.Medium} size={18}>
              Click the add button to compete against your friends!
            </CustomText>
          )}
          <FloatingBtn handlePlusCirclePress={handlePlusCirclePress} />
        </View>
      )}
    </>
  );
};

export default CompetitionScreen;
