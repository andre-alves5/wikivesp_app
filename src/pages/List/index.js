import React, {useState, useCallback} from 'react';

import {
  Alert,
  ActivityIndicator,
  StyleSheet,
  Animated,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from 'react-native';

import {
  LoadingArea,
  Loading,
} from './styles';
import AsyncStorage from '@react-native-community/async-storage';

import {useNavigation, useFocusEffect} from '@react-navigation/native';

import api from '../../config/api';

export default function List() {
  const [articles, setArticles] = useState('');
  const [limitResult, setLimitResult] = useState(10);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [max, setMax] = useState('');

  const navigation = useNavigation();

  const getArticles = async (page, limit) => {
    try {
      const token = await AsyncStorage.getItem('@token');

      const response = await api.get(
        '/allarticles?page=' + page + '&limit=' + limit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMax(response.data.articles.totalDocs);
      setArticles(
        response.data.articles.docs.map((Item, index) => ({
          key: `${index}`,
          id: Item._id,
          titulo: Item.titulo,
          categoria: Item.categoria,
        })),
      );
      setLoading(false);
    } catch (err) {
      if (err.response) {
        Alert.alert('', err.response.data.message);
      } else {
        Alert.alert('', 'Nenhum artigo encontrado, tente mais tarde!');
      }
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getArticles(1, limitResult);
      setLimitResult(limitResult + 10);
    }, []),
  );

  const loadPage = async () => {
    if (reloading) return;
    if (limitResult >= max) return;
    setReloading(true);
    await getArticles(1, limitResult);
    setReloading(false);
  };

  const refreshList = async () => {
    setRefreshing(true);
    await getArticles(1, 10);
    setRefreshing(false);
  };

  const VisibleItem = (props) => {
    const {data, rowHeightAnimatedValue} = props;

    Animated.timing(rowHeightAnimatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    });

    return (
      <Animated.View
        style={[styles.rowFront, {height: rowHeightAnimatedValue}]}>
        <TouchableOpacity
          style={styles.rowFrontVisible}
          onPress={() => {
            navigation.navigate('ArticleView', {
              idArticle: data.item.id,
            });
          }}
          underlayColor={'#aaa'}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {data.item.titulo}
            </Text>
            <Text style={styles.details} numberOfLines={1}>
              {data.item.categoria}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingArea>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingArea>
      ) : (
        <FlatList
          data={articles}
          renderItem={renderItem}
          onRefresh={refreshList}
          refreshing={refreshing}
          onEndReachedThreshold={0.1}
          onEndReached={() => loadPage()}
          ListFooterComponent={reloading && <Loading />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: 'center',
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#666',
  },
  details: {
    fontSize: 16,
    marginBottom: 2,
    color: '#999',
  },
});
