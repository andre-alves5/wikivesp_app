import React, {useState, useCallback} from 'react';
import {
  Alert,
  ActivityIndicator,
  FlatList,
  Text,
  Image,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  TitleContent,
  LoadingArea,
  ContentUser,
  BtnSubmitForm,
  TxtSubmitForm,
  SubTitleImg,
} from './styles';
import api from '../../config/api';

const {width} = Dimensions.get('window');

export default function AllArticlesView({route}) {
  const [loading, setLoading] = useState(false);
  const [articleBody, setArticleBody] = useState('');
  const [dialog, setDialog] = useState(null);

  const navigation = useNavigation();

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
      setArticleBody(response.data.articledetail);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        Alert.alert('', err.response.data.message);
        navigation.navigate('List');
      } else {
        Alert.alert('', 'Artigo não encontrado, tente novamente');
        navigation.navigate('List');
      }
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getArticleBody();
    }, []),
  );

  return (
    <Container>
      <TitleContent>Subtítulo: </TitleContent>
      <ContentUser>{articleBody.subTitulo}</ContentUser>

      <TitleContent>Conteúdo: </TitleContent>
      <ContentUser>{articleBody.corpoSubTitulo}</ContentUser>

      <View>
        {articleBody.url ? (
          <View>
            <TouchableOpacity onPress={() => setDialog(articleBody.url)}>
              <Image
                source={{width: width, height: 150, uri: articleBody.url}}
                fadeDuration={600}
                resizeMode={'contain'}
                style={{paddingHorizontal: 25}}
              />
            </TouchableOpacity>
            <BtnSubmitForm>
              <TxtSubmitForm
                onPress={() => {
                  const {id} = route.params;
                  navigation.navigate('EditArticleBodyImage', {id});
                }}>
                Editar Imagem
              </TxtSubmitForm>
            </BtnSubmitForm>
          </View>
        ) : (
          <BtnSubmitForm>
            <TxtSubmitForm
              onPress={() => {
                const {id} = route.params;
                navigation.navigate('EditArticleBodyImage', {id});
              }}>
              Inserir Imagem
            </TxtSubmitForm>
          </BtnSubmitForm>
        )}
        <Modal visible={dialog !== null} animated>
          <TouchableOpacity onPress={() => setDialog(null)}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={25}
              height={25}
              width={25}
              color="#948f8f"
            />
          </TouchableOpacity>
          <ScrollView>
            <ReactNativeZoomableView
              maxZoom={2}
              minZoom={0.5}
              zoomStep={0.5}
              initialZoom={1}
              bindToBorders={true}
              captureEvent={true}>
              <Image
                source={
                  dialog !== null
                    ? {width: width, height: 300, uri: dialog}
                    : null
                }
                resizeMode={'contain'}
              />
            </ReactNativeZoomableView>
          </ScrollView>
        </Modal>
      </View>

      {loading && (
        <LoadingArea>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingArea>
      )}
    </Container>
  );
}
