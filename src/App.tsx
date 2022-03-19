import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from '../tailwind.json';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {DefUserContext} from './utils/fn';
import {FriendCardProps} from './utils/types';
import {User} from './utils/models';
import {HabitWithUid, UserContext} from './utils/types';
import RootStackNavigator from './routes/RootStackNavigator';
import SnackBar from './components/SnackBar';

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
  const [friends, setFriends] = useState<FriendCardProps[]>([]);
  const [snackE, setSnackE] = useState('');
  const userContextInitVal: UserContext = {
    user,
    setUser,
    uid,
    setUid,
    habits,
    setHabits,
    friends,
    setFriends,
    snackE,
    setSnackE,
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <TailwindProvider utilities={utilities}>
        <DefUserContext.Provider value={userContextInitVal}>
          <RootStackNavigator />
          <SnackBar />
        </DefUserContext.Provider>
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;
