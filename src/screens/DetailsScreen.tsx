import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {DetailsScreenNavigationProp} from '../utils/types';

const DetailsScreen = ({navigation, route}: DetailsScreenNavigationProp) => {
  const tailwind = useTailwind();
  const {name} = route.params;
  
  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, []);

  return (
    <View style={tailwind('flex-1 items-center justify-center')}>
      <Text>{name}</Text>
    </View>
  );
};

export default DetailsScreen;
