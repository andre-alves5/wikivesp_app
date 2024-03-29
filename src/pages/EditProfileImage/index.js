import React, {useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {
  LoadingArea,
  BtnSubmitForm,
  TxtSubmitForm,
  UserImage,
  Container,
} from './styles';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../config/api';
import Placeholder from '../../../assets/placeholder.jpg';

export default function EditProfileImage() {
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const getUserImage = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('@token');

      const response = await api.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUrl(response.data.user.url);
      setLoading(false);
    } catch (error) {
      if (err.response) {
        Alert.alert('', err.response.data.message);
      } else {
        Alert.alert('', 'Imagem não encontrado, tente novamente');
      }
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserImage();
    }, [image]),
  );

  const imagePickerOptions = {
    title: 'Selecione uma imagem',
    noData: true,
    mediaType: 'photo',
    storageOptions: {
      skipBackup: true,
      waitUntilSaved: true,
      cameraRoll: true,
    },
  };

  function imagePickerCallback(data) {
    if (data.didCancel) {
      return;
    }

    if (data.error) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setImage({
      uri: data.uri,
      name: data.fileName,
      type: data.type,
    });
  }

  const uploadImage = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('@token');

    const formData = new FormData();
    formData.append('file', image);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await api.put('/profileimage', formData, config);
      setImage('');
      setLoading(false);
      Alert.alert('', 'Imagem Editada com Sucesso');
    } catch (error) {
      if (error.response) {
        Alert.alert('', error.response.data.message);
      } else {
        Alert.alert('', 'Não foi possivel enviar a imagem, tente mais tarde!');
      }
      setLoading(false);
    }
  };

  return (
    <Container>
      <UserImage
        source={
          image
            ? {width: '100%', height: 150, uri: image.uri}
            : url
            ? {width: '100%', height: 150, uri: url}
            : Placeholder
        }
        resizeMode={'contain'}
        fadeDuration={1000}
      />
      <BtnSubmitForm
        onPress={() =>
          ImagePicker.showImagePicker(imagePickerOptions, imagePickerCallback)
        }>
        <TxtSubmitForm style={styles.buttonText}>Escolher imagem</TxtSubmitForm>
      </BtnSubmitForm>
      <BtnSubmitForm onPress={uploadImage}>
        <TxtSubmitForm style={styles.buttonText}>Enviar imagem</TxtSubmitForm>
      </BtnSubmitForm>

      {loading && (
        <LoadingArea>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingArea>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
