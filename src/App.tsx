import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {TailwindProvider} from 'tailwind-rn';
import utilities from '../tailwind.json';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {DefUserContext} from './utils/fn';
import {User, UserWID} from './utils/models';
import {HabitWithUid, UserContext} from './utils/types';
import RootStackNavigator from './routes/RootStackNavigator';
import SnackBar from './components/SnackBar';
import {Provider} from 'react-native-paper';
import {LogBox} from 'react-native';

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
  const [friends, setFriends] = useState<UserWID[]>([]);
  const [friendRequests, setFriendRequests] = useState<UserWID[]>([]);
  const [snackE, setSnackE] = useState('');
  const [unsubscribe, setUnsubscribe] = useState<any>(() => {});

  const userContextInitVal: UserContext = {
    user,
    setUser,
    uid,
    unsubscribe,
    setUnsubscribe,
    setUid,
    habits,
    setHabits,
    friends,
    setFriends,
    friendRequests,
    setFriendRequests,
    snackE,
    setSnackE,
  };

  // https://stackoverflow.com/a/70774437
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);

  return (
    <NavigationContainer theme={MyTheme}>
      <TailwindProvider utilities={utilities}>
        <DefUserContext.Provider value={userContextInitVal}>
          <Provider>
            <RootStackNavigator />
            <SnackBar />
          </Provider>
        </DefUserContext.Provider>
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;
