import React, {useState} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
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
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

export default function AddArticleBody({route}) {
  const [subTitulo, setSubTitulo] = useState('');
  const [corpoSubTitulo, setCorpoSubTitulo] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const cadArticleBody = async () => {
    if (!validate()) return;
    setLoading(true);
    const token = await AsyncStorage.getItem('@token');
    const {idArtigo} = route.params;
    await api
      .post(
        '/articledetails/' + idArtigo,
        {idArtigo, subTitulo, corpoSubTitulo},
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
            'Subtítulo não cadastrado com sucesso, tente mais tarde!',
          );
        }
        setLoading(false);
      });
  };

  const validate = () => {
    if (!subTitulo) {
      Alert.alert('', 'Insira o Subtítulo do Artigo!');
      return false;
    }
    if (!corpoSubTitulo) {
      Alert.alert('', 'Insira corpo do Subtítulo!');
      return false;
    }
    return true;
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Container>
        <TitleInput>* Subtítulo: </TitleInput>
        <InputForm
          placeholder="Insira o Subtítulo do seu Artigo"
          autoCorrect={false}
          value={subTitulo}
          editable={!loading}
          onChangeText={(text) => setSubTitulo(text)}
        />

        <TitleInput>* Conteúdo: </TitleInput>
        <InputForm
          placeholder="Digite o conteúdo do seu Subtítulo"
          autoCorrect={false}
          value={corpoSubTitulo}
          editable={!loading}
          onChangeText={(text) => setCorpoSubTitulo(text)}
        />

        <TitleRequired>* Campo Obrigatório</TitleRequired>

        <BtnSubmitForm disabled={loading} onPress={cadArticleBody}>
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
