import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from '../tailwind.json';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './routes/BottomTabNavigator';
import LoginScreen from './screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefUserContext} from './utils/fn';
import {User} from './utils/models';
import {HabitWithUid, UserContext} from './utils/types';
import RootStackNavigator from './routes/RootStackNavigator';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [habits, setHabits] = useState<HabitWithUid[]>([]);
  const userContextInitVal: UserContext = {
    user,
    setUser,
    uid,
    setUid,
    habits,
    setHabits,
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <TailwindProvider utilities={utilities}>
        <DefUserContext.Provider value={userContextInitVal}>
          <RootStackNavigator />
        </DefUserContext.Provider>
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;
