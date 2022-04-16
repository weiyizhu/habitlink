import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {useUserContext} from '../utils/fn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../components/CustomText';
import {CompetitionEndScreenProp, fontType} from '../utils/types';
import {User, WLD} from '../utils/models';
import {firebase} from '@react-native-firebase/firestore';
import CompetitionDates from '../components/CompetitionDates';
import {SafeAreaView} from 'react-native-safe-area-context';

const CompetitionEndScreen = ({
  route,
  navigation,
}: CompetitionEndScreenProp) => {
  const tailwind = useTailwind();
  const {user, uid} = useUserContext();
  const myScore =
    user && user.competition && Object.keys(user.competition).length > 0
      ? Math.ceil((user.competition.completed / user.competition.total) * 100)
      : 0;
  const compScore =
    user && user.competition && Object.keys(user.competition).length > 0
      ? user.competition.compScore
      : 0;
  const result =
    myScore > compScore ? 'win' : myScore < compScore ? 'loss' : 'draw';
  const [compUser, setCompUser] = useState<User | null>();

  const iconName =
    result === 'win' ? 'trophy-variant' : result === 'loss' ? 'skull' : 'tie';
  const iconColor =
    result === 'win' ? 'gold' : result === 'loss' ? 'red' : 'lightblue';

  const titleText =
    result === 'win'
      ? 'Congratulation!'
      : result === 'loss'
      ? 'Oops...'
      : 'Good job!';

  const subtitle1 =
    result === 'win'
      ? 'You won your last competition.'
      : result === 'loss'
      ? 'You lost your last competition.'
      : 'You tied your last competition.';

  const subtitle2 =
    result === 'win'
      ? 'Keep it up!'
      : result === 'loss'
      ? 'You can do it next time!'
      : 'Try Again!';

  useEffect(() => {
    if (user && user.competition && Object.keys(user.competition).length > 0) {
      const getCompetitor = async () => {
        const compId = user.competition?.competitor;
        setCompUser(
          (
            await firebase.firestore().collection('users').doc(compId).get()
          ).data() as User | null,
        );
      };
      getCompetitor();
    }
  }, [user]);

  const handleContinue = () => {
    if (
      user &&
      user.competition &&
      Object.keys(user.competition).length > 0 &&
      uid
    ) {
      // delete competition object and update WLD
      const newWLD: WLD =
        result === 'win'
          ? {...user.wld, wins: user.wld.wins + 1}
          : result === 'loss'
          ? {...user.wld, losses: user.wld.losses + 1}
          : {...user.wld, draws: user.wld.draws + 1};

      firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .update({competition: {}, wld: newWLD});

      // make inCompetition false
      const habitRef = firebase
        .firestore()
        .collection('habits')
        .where('user', '==', uid)
        .where('inCompetition', '==', true);

      habitRef.get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          firebase
            .firestore()
            .collection('habits')
            .doc(documentSnapshot.id)
            .update({inCompetition: false});
        });
      });
    }
    navigation.navigate('CompetitionStack');
  };

  return (
    <SafeAreaView style={tailwind('flex-1 px-5 items-center')}>
      <CustomText font={fontType.SemiBold} size={48} additionStyle="mt-4 mb-2">
        {titleText}
      </CustomText>
      <CompetitionDates />
      <MaterialCommunityIcons
        name={iconName}
        size={100}
        color={iconColor}
        style={tailwind('mt-10')}
      />

      {/* Display scores */}
      <View style={tailwind('flex-row justify-center pt-10')}>
        <View style={tailwind('w-5/12 items-center')}>
          <Text style={tailwind('text-4xl pb-2 font-YC_SemiBold')}>
            {myScore}
          </Text>
          <Text style={tailwind('text-xl font-YC_SemiBold')}>
            {user?.name ?? 'undefined'}
          </Text>
          <Text style={tailwind('text-sm pb-4 font-YC_SemiBold')}>
            ({user?.wld.wins}-{user?.wld.losses}-{user?.wld.draws})
          </Text>
        </View>
        <View style={tailwind('w-1/12 items-center')}>
          <Text
            style={tailwind('text-4xl pb-2 font-YC_SemiBold text-transparent')}>
            0
          </Text>
          <Text style={tailwind('text-center text-xl font-YC_SemiBold')}>
            vs
          </Text>
        </View>
        <View style={tailwind('w-5/12 items-center')}>
          <Text style={tailwind('text-4xl pb-2 font-YC_SemiBold')}>
            {compScore}
          </Text>
          <Text style={tailwind('text-xl font-YC_SemiBold')}>
            {compUser?.name ?? 'undefined'}
          </Text>
          <Text style={tailwind('text-sm pb-4 font-YC_SemiBold')}>
            ({compUser?.wld.wins}-{compUser?.wld.losses}-{compUser?.wld.draws})
          </Text>
        </View>
      </View>

      <CustomText font={fontType.Regular} size={24} additionStyle="pt-10">
        {subtitle1}
      </CustomText>
      <CustomText font={fontType.Regular} size={24} additionStyle="pt-3">
        {subtitle2}
      </CustomText>
      <CustomText
        font={fontType.SemiBold}
        size={24}
        additionStyle="pt-20"
        handlePress={handleContinue}>
        Continue
      </CustomText>
    </SafeAreaView>
  );
};

export default CompetitionEndScreen;
