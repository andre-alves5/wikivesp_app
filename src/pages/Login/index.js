import React, {useContext, useState} from 'react';
import {ScrollView, Image, Alert, ActivityIndicator} from 'react-native';
import {
  Container,
  Logo,
  InputForm,
  BtnSubmitForm,
  TxtSubmitForm,
  LinkNewUser,
  LoadingArea,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../config/api';
import {AuthContext} from '../../contexts/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const {signIn} = useContext(AuthContext);

  const hadleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    await api
      .post('/login', {email, password})
      .then((response) => {
        AsyncStorage.setItem('@token', response.data.token);
        AsyncStorage.setItem('@idAutor', response.data.user.id);
        AsyncStorage.setItem('@autor', response.data.user.name);
        setLoading(false);
        signIn();
      })
      .catch((err) => {
        if (err.response) {
          Alert.alert('', err.response.data.message);
        } else {
          Alert.alert('', 'Tente mais tarde!');
        }
        setLoading(false);
      });
  };

  const validate = () => {
    if (!email) {
      Alert.alert('', 'Preencha o campo usuário!');
      return false;
    }
    if (!password) {
      Alert.alert('', 'Preencha o campo senha!');
      return false;
    }

    return true;
  };

  const newUser = () => {
    navigation.navigate('NewUser');
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Container>
        <Logo>
          <Image source={require('../../../assets/logo.png')} />
        </Logo>

        <InputForm
          placeholder="Usuário"
          autoCorrect={false}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
          onChangeText={(text) => setEmail(text)}
        />

        <InputForm
          placeholder="Senha"
          autoCorrect={false}
          value={password}
          secureTextEntry={true}
          editable={!loading}
          onChangeText={(text) => setPassword(text)}
        />

        <BtnSubmitForm disabled={loading} onPress={hadleLogin}>
          <TxtSubmitForm>Acessar</TxtSubmitForm>
        </BtnSubmitForm>

        <LinkNewUser onPress={newUser}>Cadastrar</LinkNewUser>

        {loading && (
          <LoadingArea>
            <ActivityIndicator size="large" color="#FFF" />
          </LoadingArea>
        )}
      </Container>
    </ScrollView>
  );
}
