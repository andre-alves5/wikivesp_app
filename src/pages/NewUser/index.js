import React, {useState} from 'react';
import {ScrollView, Image, Alert, ActivityIndicator} from 'react-native';
import {
  Container,
  Logo,
  InputForm,
  BtnSubmitForm,
  TxtSubmitForm,
  LinkLogin,
  LoadingArea,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import api from '../../config/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const cadUser = async () => {
    if (!validate()) return;
    setLoading(true);
    //alert("Cadastrar!");
    await api
      .post('/users', {name, email, password})
      .then((response) => {
        Alert.alert('', 'Cadastro realizado sucesso!');
        navigation.navigate('Login');
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          Alert.alert('', err.response.data.message);
        } else {
          Alert.alert(
            '',
            'Usuário não cadastrado com sucesso, tente mais tarde!',
          );
        }
        setLoading(false);
      });
  };

  const validate = () => {
    if (!name) {
      Alert.alert('', 'Preencha o campo nome!');
      return false;
    }
    if (!email) {
      Alert.alert('', 'Preencha o campo usuário!');
      return false;
    }
    if (!password) {
      Alert.alert('', 'Preencha o campo senha!');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('', 'A senha precisa ter pelo menos 6 caracteres!');
      return false;
    }

    return true;
  };

  const Login = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Container>
        <Logo>
          <Image source={require('../../../assets/logo.png')} />
        </Logo>

        <InputForm
          placeholder="Seu nome completo"
          autoCorrect={false}
          value={name}
          editable={!loading}
          onChangeText={(text) => setName(text)}
        />

        <InputForm
          placeholder="Seu melhor e-mail"
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

        <BtnSubmitForm disabled={loading} onPress={cadUser}>
          <TxtSubmitForm>Cadastrar</TxtSubmitForm>
        </BtnSubmitForm>

        <LinkLogin onPress={Login}>Acessar</LinkLogin>

        {loading && (
          <LoadingArea>
            <ActivityIndicator size="large" color="#FFF" />
          </LoadingArea>
        )}
      </Container>
    </ScrollView>
  );
}
