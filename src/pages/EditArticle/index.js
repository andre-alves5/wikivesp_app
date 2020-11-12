import React, {useContext, useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {Alert, ScrollView, ActivityIndicator} from 'react-native';
import {
  Container,
  InputForm,
  BtnSubmitForm,
  BtnEditForm,
  TxtSubmitForm,
  TitleInput,
  TitleRequired,
  LoadingArea,
} from './styles';

import api from '../../config/api';

export default function EditPerfil({route}) {
  const [titulo, setTitulo] = useState('');
  const [introducao, setIntroducao] = useState('');
  const [indice, setIndice] = useState('');
  const [bibliografia, setBibliografia] = useState('');
  const [categoria, setCategoria] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const getArticle = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('@token');
      const {idArticle} = route.params;

      const response = await api.get('/articles/' + idArticle, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTitulo(response.data.article.titulo);
      setIntroducao(response.data.article.introducao);
      setIndice(response.data.article.indice);
      setBibliografia(response.data.article.bibliografia);
      setCategoria(response.data.article.categoria);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        Alert.alert('', err.response.data.message);
        setLoading(false);
      } else {
        Alert.alert('', 'Artigo não encontrado, tente novamente!');
        console.log(idArticle);
        navigation.navigate('MyArticles');
      }
    }
  };

  const editArticle = async () => {
    if (!validate()) return;
    setLoading(true);
    const token = await AsyncStorage.getItem('@token');
    const {idArticle} = route.params;
    const _id = idArticle;
    await api
      .put(
        '/articles',
        {_id, titulo, introducao, indice, bibliografia, categoria},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        Alert.alert('', response.data.message);
        setLoading(false);
        navigation.navigate('MyArticles');
      })
      .catch((err) => {
        if (err.response) {
          Alert.alert('', err.response.data.message);
        } else {
          Alert.alert('', 'Artigo não editado com sucesso, tente mais tarde!');
        }
        setLoading(false);
      });
  };

  const viewArticleBody = () => {
    const {idArticle} = route.params;
    console.log(idArticle);
    navigation.navigate('ArticleBody', {
      idArticle,
    });
  };

  useEffect(() => {
    getArticle();
  }, []);

  const validate = () => {
    if (!titulo) {
      Alert.alert('', 'Preencha o campo nome!');
      return false;
    }
    if (!introducao) {
      Alert.alert('', 'Preencha o campo e-mail!');
      return false;
    }
    if (!categoria) {
      Alert.alert('', 'Preencha o campo senha!');
      return false;
    }
    return true;
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Container>
        <TitleInput>* Titulo: </TitleInput>
        <InputForm
          placeholder="Insira o Titulo do seu Artigo"
          autoCorrect={false}
          value={titulo}
          editable={!loading}
          onChangeText={(text) => setTitulo(text)}
        />

        <TitleInput>* Introdução: </TitleInput>
        <InputForm
          placeholder="Digite a introdução do seu Artigo"
          autoCorrect={false}
          value={introducao}
          editable={!loading}
          onChangeText={(text) => setIntroducao(text)}
        />

        <TitleInput>Indice: </TitleInput>
        <InputForm
          placeholder="Indice do Artigo"
          autoCorrect={false}
          value={indice}
          editable={!loading}
          onChangeText={(text) => setIndice(text)}
        />

        <TitleInput>Bibliografia: </TitleInput>
        <InputForm
          placeholder="Bibliografia do Artigo"
          autoCorrect={false}
          value={bibliografia}
          editable={!loading}
          onChangeText={(text) => setBibliografia(text)}
        />

        <TitleInput>* Categoria: </TitleInput>
        <InputForm
          placeholder="Digite a Categoria do Artigo"
          autoCorrect={false}
          value={categoria}
          editable={!loading}
          onChangeText={(text) => setCategoria(text)}
        />

        <TitleRequired>* Campo Obrigatório</TitleRequired>

        <BtnSubmitForm disabled={loading} onPress={editArticle}>
          <TxtSubmitForm>Editar</TxtSubmitForm>
        </BtnSubmitForm>

        <BtnEditForm disabled={loading} onPress={viewArticleBody}>
          <TxtSubmitForm>Subtítulos</TxtSubmitForm>
        </BtnEditForm>

        {loading && (
          <LoadingArea>
            <ActivityIndicator size="large" color="#fff" />
          </LoadingArea>
        )}
      </Container>
    </ScrollView>
  );
}
