import React, {useEffect, useMemo, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';

import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../contexts/auth';
import {getValToken} from '../services/auth';

import Login from '../pages/Login';
import NewUser from '../pages/NewUser';
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';

const Stack = createStackNavigator();

function routes() {
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn: async () => {
        const valToken = AsyncStorage.getItem('@token');
        setUserToken(valToken);
      },
      signOut: () => {
        AsyncStorage.removeItem('@token');
        AsyncStorage.removeItem('@idAutor');
        setUserToken(null);
      },
    };
  }, []);

  const getToken = async () => {
    try {
      const valToken = await getValToken();
      if (valToken !== null) {
        setUserToken(valToken);
      }
    } catch (error) {
      setUserToken(null);
    }
  };

  useEffect(() => {
    getToken();
  }, [userToken]);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? (
          <DrawerNavigator />
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NewUser"
              component={NewUser}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default routes;
