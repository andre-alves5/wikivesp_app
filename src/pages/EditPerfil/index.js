import React, {useEffect, useState} from 'react';

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

export default function EditPerfil() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [turma, setTurma] = useState('');
  const [polo, setPolo] = useState('');
  const [password, setPassword] = useState('');
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
      setName(response.data.user.name);
      setEmail(response.data.user.email);
      setCurso(response.data.user.curso);
      setTurma(response.data.user.turma);
      setPolo(response.data.user.polo);
      setPassword(response.data.user.password);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        Alert.alert('', err.response.data.message);
      } else {
        Alert.alert('', 'Perfil não encontrado, tente novamente!');
      }
      setLoading(false);
    }
  };

  const editUser = async () => {
    if (!validate()) return;
    setLoading(true);
    const token = await AsyncStorage.getItem('@token');
    await api
      .put(
        '/profile',
        {name, email, curso, turma, polo, password},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        Alert.alert('', response.data.message);
        setLoading(false);
        navigation.navigate('Perfil');
      })
      .catch((err) => {
        if (err.response) {
          Alert.alert('', err.response.data.message);
        } else {
          Alert.alert('', 'Perfil não editado com sucesso, tente mais tarde!');
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const validate = () => {
    if (!name) {
      Alert.alert('', 'Preencha o campo nome!');
      return false;
    }
    if (!email) {
      Alert.alert('', 'Preencha o campo e-mail!');
      return false;
    }
    if (!password) {
      Alert.alert('', 'Preencha o campo senha!');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('', 'A senha precisa ter pelo menos seis caracteres!');
      return false;
    }
    return true;
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Container>
        <TitleInput>* Nome: </TitleInput>
        <InputForm
          placeholder="Nome completo"
          autoCorrect={false}
          value={name}
          editable={!loading}
          onChangeText={(text) => setName(text)}
        />

        <TitleInput>* E-mail: </TitleInput>
        <InputForm
          placeholder="O melhor e-mail"
          autoCorrect={false}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          editable={!loading}
          onChangeText={(text) => setEmail(text)}
        />

        <TitleInput>Curso: </TitleInput>
        <InputForm
          placeholder="O melhor e-mail"
          autoCorrect={false}
          autoCapitalize="none"
          value={curso}
          editable={!loading}
          onChangeText={(text) => setCurso(text)}
        />

        <TitleInput>Turma: </TitleInput>
        <InputForm
          placeholder="O melhor e-mail"
          autoCorrect={false}
          autoCapitalize="none"
          value={turma}
          editable={!loading}
          onChangeText={(text) => setTurma(text)}
        />

        <TitleInput>Polo: </TitleInput>
        <InputForm
          placeholder="O melhor e-mail"
          autoCorrect={false}
          autoCapitalize="none"
          value={polo}
          editable={!loading}
          onChangeText={(text) => setPolo(text)}
        />

        <TitleInput>* Senha: </TitleInput>
        <InputForm
          placeholder="A senha deve ter no mínimo 6 caracteres"
          autoCorrect={false}
          value={password}
          secureTextEntry={true}
          editable={!loading}
          onChangeText={(text) => setPassword(text)}
        />

        <TitleRequired>* Campo Obrigatório</TitleRequired>

        <BtnSubmitForm disabled={loading} onPress={editUser}>
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
