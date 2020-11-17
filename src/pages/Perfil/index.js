import React, {useState, useCallback} from 'react';
import {ActivityIndicator, Alert, View, ScrollView} from 'react-native';

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  TitleContent,
  ContentUser,
  BtnActionEdit,
  BtnActionDelete,
  TxtBtnAction,
  LoadingArea,
  ImageUser,
  ViewName,
  ViewImageUser,
  BtnSubmitForm,
  TxtSubmitForm,
  MainView,
} from './styles';

import api from '../../config/api';

export default function Perfil() {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const getUser = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('@token');

      const response = await api.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      if (err.response) {
        Alert.alert('', err.response.data.message);
      } else {
        Alert.alert('', 'Usuário não encontrado, tente novamente');
      }
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, []),
  );

  return (
    <Container>
      {loading ? (
        <LoadingArea>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingArea>
      ) : (
        <MainView>
          <ViewImageUser>
            <ImageUser
              source={{width: 180, height: 180, uri: user.url}}
              fadeDuration={1000}
            />
          </ViewImageUser>

          <ViewName>
            <TitleContent>Nome: </TitleContent>
            <ContentUser>{user.name}</ContentUser>
          </ViewName>

          <ViewName>
            <TitleContent>E-mail: </TitleContent>
            <ContentUser>{user.email}</ContentUser>
          </ViewName>

          {user.curso && (
            <ViewName>
              <TitleContent>Curso: </TitleContent>
              <ContentUser>{user.curso}</ContentUser>
            </ViewName>
          )}

          {user.turma && (
            <ViewName>
              <TitleContent>Turma: </TitleContent>
              <ContentUser>{user.turma}</ContentUser>
            </ViewName>
          )}

          {user.polo && (
            <ViewName>
              <TitleContent>Polo: </TitleContent>
              <ContentUser>{user.polo}</ContentUser>
            </ViewName>
          )}

          {user.url ? (
            <BtnSubmitForm>
              <TxtSubmitForm
                onPress={() => {
                  navigation.navigate('EditProfileImage');
                }}>
                Editar Imagem
              </TxtSubmitForm>
            </BtnSubmitForm>
          ) : (
            <BtnSubmitForm>
              <TxtSubmitForm
                onPress={() => {
                  navigation.navigate('EditProfileImage');
                }}>
                Inserir Imagem
              </TxtSubmitForm>
            </BtnSubmitForm>
          )}
        </MainView>
      )}
    </Container>
  );
}
