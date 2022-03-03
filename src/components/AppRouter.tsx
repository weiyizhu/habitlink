import 'react-native-gesture-handler';
import React, {useState} from 'react';
import RootTabNavigator from '../routes/RootTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {User} from '../utils/models';
import {DefUserContext} from '../utils/fn';

const AppRouter = () => {
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const Stack = createNativeStackNavigator();

  return (
    <DefUserContext.Provider value={{user, setUser, uid, setUid}}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="RootLoginStack">
        <Stack.Screen name="RootLoginStack" component={LoginScreen} />
        <Stack.Screen name="RootHomeStack" component={RootTabNavigator} />
      </Stack.Navigator>
    </DefUserContext.Provider>
  );
};

export default AppRouter;
