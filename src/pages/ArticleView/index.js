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
  SubTitleContent,
  SubTitleImgModal,
  SubTitleImg,
} from './styles';
import api from '../../config/api';

const {width} = Dimensions.get('window');

export default function AllArticlesView({route}) {
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState('');
  const [articleBody, setArticleBody] = useState('');
  const [body, setBody] = useState(false);
  const [dialog, setDialog] = useState(null);

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
      setArticle(response.data.article);
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
  const getArticleBody = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('@token');
      const {idArticle} = route.params;
      const response = await api.get('/articledetails/' + idArticle, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArticleBody(response.data.articledetails.docs);
      if (articleBody !== articleBody.length) setBody(true);
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
      getArticle();
      getArticleBody();
    }, []),
  );

  return (
    <Container>
      <ScrollView>
        <TitleContent>Titulo: </TitleContent>
        <ContentUser>{article.titulo}</ContentUser>

        <TitleContent>Introdução: </TitleContent>
        <ContentUser>{article.introducao}</ContentUser>

        <TitleContent>Indice: </TitleContent>
        <ContentUser>{article.indice}</ContentUser>

        {body && (
          <View>
            <FlatList
              data={articleBody}
              renderItem={({item}) => (
                <View>
                  <SubTitleContent>{item.subTitulo}</SubTitleContent>
                  <ContentUser>{item.corpoSubTitulo}</ContentUser>
                  {item.url && (
                    <TouchableOpacity onPress={() => setDialog(item.url)}>
                      <Image
                        source={{width: '100%', height: 150, uri: item.url}}
                        fadeDuration={1000}
                        resizeMode={'contain'}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
              keyExtractor={(articleBody) => String(articleBody._id)}
            />
            <Modal visible={dialog !== null} animated>
              <TouchableOpacity onPress={() => setDialog(null)}>
                <MaterialCommunityIcons
                  name="close-circle-outline"
                  size={25}
                  height={25}
                  width={25}
                  color="#000"
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
                  />
                </ReactNativeZoomableView>
              </ScrollView>
            </Modal>
          </View>
        )}

        <TitleContent>Bibliografia: </TitleContent>
        <ContentUser>{article.bibliografia}</ContentUser>

        <TitleContent>Categoria: </TitleContent>
        <ContentUser>{article.categoria}</ContentUser>

        {loading && (
          <LoadingArea>
            <ActivityIndicator size="large" color="#fff" />
          </LoadingArea>
        )}
      </ScrollView>
    </Container>
  );
}
