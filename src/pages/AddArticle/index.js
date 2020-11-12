import React, {useState} from 'react';
import {ActivityIndicator, Alert, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
import AsyncStorage from '@react-native-community/async-storage';

export default function AddArticle() {
  const [titulo, setTitulo] = useState('');
  const [introducao, setIntroducao] = useState('');
  const [indice, setIndice] = useState('');
  const [bibliografia, setBibliografia] = useState('');
  const [categoria, setCategoria] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const cadArticle = async () => {
    if (!validate()) return;
    setLoading(true);
    const token = await AsyncStorage.getItem('@token');
    const idAutor = await AsyncStorage.getItem('@idAutor');
    const autor = await AsyncStorage.getItem('@autor');
    await api
      .post(
        '/articles',
        {idAutor, autor, titulo, introducao, indice, bibliografia, categoria},
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
          Alert.alert(
            '',
            'Artigo não cadastrado com sucesso, tente mais tarde!',
          );
        }
        setLoading(false);
      });
  };

  const validate = () => {
    if (!titulo) {
      Alert.alert('', 'Insira o Titulo do Artigo!');
      return false;
    }
    if (!introducao) {
      Alert.alert('', 'Insira a Introdução do Artigo!');
      return false;
    }
    if (!categoria) {
      Alert.alert('', 'Insira a Categoria do Artigo!');
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

        <BtnSubmitForm disabled={loading} onPress={cadArticle}>
          <TxtSubmitForm>Cadastrar</TxtSubmitForm>
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
