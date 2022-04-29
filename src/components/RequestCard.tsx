import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useTailwind} from 'tailwind-rn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserWID} from '../utils/models';
import {useUserContext} from '../utils/fn';

type RequestProps = {
  check: (item: any) => void;
  close: (item: any) => void;
  name: string;
};

const RequestCard = ({check, close, name}: RequestProps) => {
  const tailwind = useTailwind();
  const {uid, friends} = useUserContext();

  return (
    <View
      style={tailwind(
        'px-3 py-2 bg-neutral-200 flex-row justify-between items-center mb-4 w-full',
      )}
    >
      <Text style={tailwind('text-2xl font-YC_SemiBold')}>{name}</Text>
      <View style={tailwind('flex-row')}>
        <MaterialCommunityIcons
          name={'check'}
          onPress={check}
          size={25}
          color="green"
          style={tailwind('px-3')}
        />
        <MaterialCommunityIcons name={'close'} onPress={close} size={25} />
      </View>
    </View>
  );
};

export default RequestCard;
