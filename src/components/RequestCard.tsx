import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useTailwind} from 'tailwind-rn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserWID} from '../utils/models';
import {useUserContext} from '../utils/fn';

type RequestProps = {
  obj: any;
  check: (item: any) => void;
  close: (item: any) => void;
  name: string;
}

const RequestCard = ({obj, check, close, name}: RequestProps) => {
  const tailwind = useTailwind();
  const {uid, friends} = useUserContext();

  return (
    <View
      style={tailwind(
        'px-3 py-2 bg-neutral-200 flex-row justify-between items-center mb-4',
      )}
    >
      <Text style={tailwind('text-2xl font-SemiBold')}>{name}</Text>
      <View style={tailwind('flex-row')}>
        <MaterialCommunityIcons
          name={'check'}
          onPress={() => check(obj)}
          size={25}
          color="green"
          style={tailwind('px-3')}
        />
        <MaterialCommunityIcons
          name={'close'}
          onPress={() => close(obj)}
          size={25}
        />
      </View>
    </View>
  );
};

export default RequestCard;
