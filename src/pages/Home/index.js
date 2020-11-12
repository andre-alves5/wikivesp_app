import React, {useContext, useState, useCallback} from 'react';
import {ActivityIndicator, Text, Button, View, TouchableOpacity, Alert, Image} from 'react-native';
import {Container, LoadingArea, BtnSubmitForm, TxtSubmitForm, ViewHome, TxtInfo, TxtName, ViewTop, LogoImage} from './styles';
import {AuthContext} from '../../contexts/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import api from '../../config/api';

export default function Home() {
  const {signOut} = useContext(AuthContext);
  const [countmyarticles, setCountMyArticles] = useState('');
  const [countallarticles, setCountAllArticles] = useState('');
  const [autorName, setAutorName] = useState('')
  const [loading, setLoading] = useState(false);

  const getAllArticles = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('@token');
    try {

      const response = await api.get(
        '/allarticles' ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCountAllArticles(response.data.articles.totalDocs);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        Alert.alert('', err.response.data.message);
      } else {
        Alert.alert('', 'Nenhum artigo encontrado, tente mais tarde!');
      }
      setLoading(false);
    }
  };

  const getMyArticles = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('@token');
    const idAutor = await AsyncStorage.getItem('@idAutor');
    const autor = await AsyncStorage.getItem('@autor');
    setAutorName(autor)
    try {
      const response = await api.get(
        '/myarticles/' + idAutor,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCountMyArticles(response.data.articles.totalDocs);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        Alert.alert('', err.response.data.message);
      } else {
        Alert.alert('', 'Nenhum artigo encontrado, tente mais tarde!');
      }
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllArticles();
      getMyArticles();
    }, []),
  );


  return (
    <Container>
      {loading ? (
        <LoadingArea>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingArea>
      ) : (
        <ViewHome>
          <LogoImage source={require('../../../assets/logo.png')} />
          <ViewTop>
            <TxtInfo>Bem Vindo ao WikiVesp </TxtInfo>
            <TxtName>{autorName}</TxtName>
          </ViewTop>

          <View>
            <TxtInfo>Existem {countallarticles} artigos publicados</TxtInfo>
          </View>

          <View>
            <TxtInfo>Você publicou {countmyarticles} artigos</TxtInfo>
          </View>

          <BtnSubmitForm onPress={() => signOut()}>
            <TxtSubmitForm>Sair do aplicativo</TxtSubmitForm>
          </BtnSubmitForm>
        </ViewHome>
      )}
    </Container>
  );
}
