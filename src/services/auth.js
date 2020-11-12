import AsyncStorage from '@react-native-community/async-storage';
import api from '../config/api';

export const getValToken = async () => {
  await valUser();
  const valueToken = await AsyncStorage.getItem('@token');

  if (valueToken !== null) {
    return valueToken;
  } else {
    return null;
  }
};

const valUser = async () => {
  const valueToken = await AsyncStorage.getItem('@token');

  const headers = {
    headers: {
      Authorization: `Bearer ${valueToken}`,
    },
  };

  await api
    .get('/profile', headers)
    .then((respose) => {
      if (respose.data.user === null) {
        AsyncStorage.removeItem('@token');
      } else {
        AsyncStorage.setItem('@token', respose.data.token);
      }
    })
    .catch((err) => {
      AsyncStorage.removeItem('@token');
    });
};
