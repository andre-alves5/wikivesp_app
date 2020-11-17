import React, {useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {LoadingArea, BtnSubmitForm, TxtSubmitForm} from './styles';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../config/api';
import Placeholder from '../../../assets/placeholder.jpg';

const {width} = Dimensions.get('window');

export default function EditArticleBodyImage({route}) {
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const getArticleBody = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('@token');
      const {id} = route.params;
      const response = await api.get('/articledetail/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUrl(response.data.articledetail.url);
      setLoading(false);
    } catch (err) {
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
      getArticleBody();
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
    const {id} = route.params;

    const formData = new FormData();
    formData.append('file', image);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await api.put('/articleimage/' + id, formData, config);
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
    <View style={styles.container}>
      <Image
        source={
          image
            ? {width: '100%', height: 150, uri: image.uri}
            : url
            ? {width: '100%', height: 150, uri: url}
            : Placeholder
        }
        fadeDuration={1000}
        resizeMode={'contain'}
        style={styles.image}
      />
      <BtnSubmitForm
        onPress={() =>
          ImagePicker.showImagePicker(imagePickerOptions, imagePickerCallback)
        }>
        <TxtSubmitForm>Escolher imagem</TxtSubmitForm>
      </BtnSubmitForm>
      <BtnSubmitForm onPress={uploadImage}>
        <TxtSubmitForm>Enviar imagem</TxtSubmitForm>
      </BtnSubmitForm>

      {loading && (
        <LoadingArea>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingArea>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 7,
  },
});
