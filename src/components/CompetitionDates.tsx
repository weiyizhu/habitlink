import React from 'react';
import {Text, TextProps, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTailwind} from 'tailwind-rn/dist';
import {FirestoreTimestampToMoment, useUserContext} from '../utils/fn';
import {fontType} from '../utils/types';
import CustomText from './CustomText';

const CompetitionDates = () => {
  const tailwind = useTailwind();
  const {user} = useUserContext();
  return (
    <View style={tailwind('flex-row justify-center items-center bottom-2')}>
      <MaterialCommunityIcons
        name="calendar"
        size={20}
        style={tailwind('mr-2')}
      />
      {user && user.competition && Object.keys(user.competition).length > 0 ? (
        <CustomText font={fontType.SemiBold} size={18}>
          {FirestoreTimestampToMoment(user.competition.startDate).format('LL')}{' '}
          - {FirestoreTimestampToMoment(user.competition.endDate).format('LL')}
        </CustomText>
      ) : (
        <CustomText font={fontType.SemiBold} size={18}>
          Cannot find competition object
        </CustomText>
      )}
    </View>
  );
};

export default CompetitionDates;
