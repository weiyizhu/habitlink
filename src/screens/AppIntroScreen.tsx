import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTailwind} from 'tailwind-rn/dist';
import CustomText from '../components/CustomText';
import {AppIntroScreenProp, fontType} from '../utils/types';

export type AppIntroSlides = {
  key: string;
  title: string;
  text: string;
  image: ImageSourcePropType;
};

const s1 = require('../assets/images/s1.png');
const s2 = require('../assets/images/s2.png');
const s3 = require('../assets/images/s3.png');
const s4 = require('../assets/images/s4.png');

const slides: AppIntroSlides[] = [
  {
    key: 's1',
    title: 'Welcome to Habitlink',
    text: 'Habitlink lets you build and share habits with your friends',
    image: s1,
  },
  {
    key: 's2',
    title: 'Track your \nhabits',
    text: 'Habits will turn blue when the goal has been reached',
    image: s2,
  },
  {
    key: 's3',
    title: 'Compete with friends',
    text: 'Need motivation? Enter a 3-week competition with a friend!',
    image: s3,
  },
  {
    key: 's4',
    title: 'Share with friends',
    text: 'Need support? Share with a friend to keep you on track',
    image: s4,
  },
];

const AppIntroScreen = () => {
  const navigation = useNavigation<AppIntroScreenProp>();
  const tailwind = useTailwind();

  return (
    <AppIntroSlider
      data={slides}
      renderItem={({item}) => (
        <SafeAreaView
          style={tailwind(
            'flex-1 px-10 py-10 items-center justify-evenly bg-white',
          )}>
          <CustomText
            font={fontType.SemiBold}
            size={45}
            additionStyle="text-center">
            {item.title}
          </CustomText>
          <Image
            source={item.image}
            style={{
              height: 300,
              width: 300,
              aspectRatio: 1,
              resizeMode: 'contain',
              marginBottom: 30,
            }}
          />
          <CustomText
            font={fontType.Regular}
            size={18}
            additionStyle="text-center">
            {item.text}
          </CustomText>
          <View />
          <View />
        </SafeAreaView>
      )}
      onDone={() => navigation.navigate('RootHomeStack')}
      renderNextButton={() => (
        <View style={tailwind('mr-10 mt-2')}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color="#A7A7A7"
          />
        </View>
      )}
      renderPrevButton={() => (
        <View style={tailwind('ml-10 mt-2')}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={30}
            color="#A7A7A7"
          />
        </View>
      )}
      renderDoneButton={() => (
        <View style={tailwind('mr-10 mt-2')}>
          <MaterialCommunityIcons name="check" size={30} color="lightgreen" />
        </View>
      )}
      activeDotStyle={tailwind('bg-hl-blue')}
      dotStyle={tailwind('bg-hl-light-grey')}
      showSkipButton={false}
      showPrevButton
      showNextButton
    />
  );
};

export default AppIntroScreen;
