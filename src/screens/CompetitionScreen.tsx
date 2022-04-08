import {firebase} from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import CompetitorInfo from '../components/CompetitorInfo';
import FloatingBtn from '../components/FloatingBtn';
import RequestCard from '../components/RequestCard';
import {DeleteCompetitionRequest, useUserContext} from '../utils/fn';
import {CompetitionRequest, Habit, User, WLD} from '../utils/models';
import {CompetitionScreenProp, HabitWithUid} from '../utils/types';

const CompetitionScreen = ({route, navigation}: CompetitionScreenProp) => {
  const tailwind = useTailwind();
  const {user, uid} = useUserContext();
  const [myHabits, setMyHabits] = useState<HabitWithUid[]>([]);
  const [compUser, setCompUser] = useState<User>();
  const [compHabits, setCompHabits] = useState<HabitWithUid[]>([]);
  const [myScore, setMyScore] = useState<number>(0);
  const [compScore, setCompScore] = useState<number>(0);

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
      {user &&
      user.competition &&
      Object.keys(user.competition).length > 0 &&
      compUser &&
      compUser.competition &&
      Object.keys(compUser.competition).length > 0 ? (
        <View style={tailwind('flex-1 flex-row px-5 justify-center')}>
          <CompetitorInfo
            wld={user.wld}
            name={user.name}
            habits={myHabits}
            startDate={user.competition.startDate}
            total={user.competition.total}
            score={myScore}
            setScore={setMyScore}
          />
          <View style={tailwind('w-1/12 items-center')}>
            <Text
              style={tailwind(
                'text-4xl pb-2 font-YC_SemiBold text-transparent',
              )}
            >
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
            startDate={compUser.competition.startDate}
            total={compUser.competition.total}
            score={compScore}
            setScore={setCompScore}
          />
        </View>
      ) : (
        <View style={tailwind('flex-1 px-5')}>
          {user &&
            user.competitionRequests.map(request => (
              <RequestCard
                key={request.uid}
                name={request.name}
                check={() => handleRequestCheck(request)}
                close={() => handleRequestCross(request.uid)}
              />
            ))}
          <FloatingBtn handlePlusCirclePress={handlePlusCirclePress} />
        </View>
      )}
    </>
  );
};

export default CompetitionScreen;
