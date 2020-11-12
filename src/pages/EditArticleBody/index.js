import React, {useContext, useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {Alert, ScrollView, ActivityIndicator} from 'react-native';
import {
  Container,
  InputForm,
  BtnSubmitForm,
  TxtSubmitForm,
  TitleInput,
  TitleRequired,
  LoadingArea,
} from './styles';

import api from '../../config/api';

export default function EditArticleBody({route}) {
  const [idArtigo, setIdArtigo] = useState('');
  const [subTitulo, setSubTitulo] = useState('');
  const [corpoSubTitulo, setCorpoSubtitulo] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const getArticleDetail = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('@token');
      const {idSubTitulo} = route.params;

      const response = await api.get('/articledetail/' + idSubTitulo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIdArtigo(response.data.articledetail.idArtigo);
      setSubTitulo(response.data.articledetail.subTitulo);
      setCorpoSubtitulo(response.data.articledetail.corpoSubTitulo);
      setImage(response.data.articledetail.key);
      setUrl(response.data.articledetail.url);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        Alert.alert('', err.response.data.message);
      } else {
        Alert.alert('', 'Subtítulo não encontrado, tente novamente!');
      }
      setLoading(false);
    }
  };

  const editArticleDetail = async () => {
    if (!validate()) return;
    setLoading(true);
    const token = await AsyncStorage.getItem('@token');
    const {idSubTitulo} = route.params;
    await api
      .put(
        '/articledetails',
        {_id: idSubTitulo, idArtigo, subTitulo, corpoSubTitulo},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        Alert.alert('', response.data.message);
        setLoading(false);
        navigation.navigate('ArticleBody');
      })
      .catch((err) => {
        if (err.response) {
          Alert.alert('', err.response.data.message);
        } else {
          Alert.alert(
            '',
            'Subtítulo não editado com sucesso, tente mais tarde!',
          );
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    getArticleDetail();
  }, []);

  const validate = () => {
    if (!subTitulo) {
      Alert.alert('', 'Preencha o Subtítulo do Artigo!');
      return false;
    }
    if (!corpoSubTitulo) {
      Alert.alert('', 'Preencha o Conteúdo para este Subtítulo!');
      return false;
    }
    return true;
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Container>
        <TitleInput>* Subtítulo: </TitleInput>
        <InputForm
          placeholder="Nome completo"
          autoCorrect={false}
          value={subTitulo}
          editable={!loading}
          onChangeText={(text) => setSubTitulo(text)}
        />

        <TitleInput>* Conteúdo: </TitleInput>
        <InputForm
          placeholder="O melhor e-mail"
          autoCorrect={false}
          value={corpoSubTitulo}
          editable={!loading}
          onChangeText={(text) => setCorpoSubtitulo(text)}
        />
        <TitleRequired>* Campo Obrigatório</TitleRequired>

        <BtnSubmitForm disabled={loading} onPress={editArticleDetail}>
          <TxtSubmitForm>Editar</TxtSubmitForm>
        </BtnSubmitForm>

        {loading && (
          <LoadingArea>
            <ActivityIndicator size="large" color="#fff" />
          </LoadingArea>
        )}
      </Container>
    </ScrollView>
  );
}
