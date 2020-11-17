import React, {useState, useCallback} from 'react';

import {
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Animated,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

import {LoadingArea, BtnAddForm, TxtSubmitForm} from './styles';
import AsyncStorage from '@react-native-community/async-storage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation, useFocusEffect} from '@react-navigation/native';

import api from '../../config/api';

export default function ArticleBody({route}) {
  const [articleDetails, setArticleDetails] = useState('');
  const [limitResult, setLimitResult] = useState(10);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [max, setMax] = useState('');

  const navigation = useNavigation();

  const getArticleDetails = async (page, limit) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const {idArticle} = route.params;

      const response = await api.get(
        '/articledetails/' + idArticle + '?page=' + page + '&limit=' + limit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMax(response.data.articledetails.totalDocs);
      setArticleDetails(
        response.data.articledetails.docs.map((Item, index) => ({
          key: `${index}`,
          id: Item._id,
          titulo: Item.subTitulo,
          categoria: Item.corpoSubTitulo,
        })),
      );
      setLoading(false);
    } catch (err) {
      if (err.response) {
        Alert.alert('', err.response.data.message);
      } else {
        Alert.alert('', 'Nenhum Subtítulo encontrado, insira um novo!');
      }
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getArticleDetails(1, limitResult);
      setLimitResult(limitResult + 10);
    }, [navigation]),
  );

  const loadPage = async () => {
    if (reloading) return;
    if (limitResult >= max) return;
    setReloading(true);
    await getArticleDetails(1, limitResult);
    setReloading(false);
  };

  const refreshList = async () => {
    setRefreshing(true);
    await getArticleDetails(1, 10);
    setRefreshing(false);
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const editRow = (rowMap, idSubTitulo) => {
    navigation.navigate('EditArticleBody', {
      idSubTitulo,
    });
  };

  const deleteRow = async (rowMap, idArticleBody) => {
    setLoading(true);
    const token = await AsyncStorage.getItem('@token');

    await api
      .delete('/articledetails/' + idArticleBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
            'Subtítulo não foi deletado com sucesso, tente mais tarde!',
          );
        }
        setLoading(false);
      });
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const onLeftActionStatusChange = (rowKey) => {
    console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = (rowKey) => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = (rowKey) => {
    console.log('onRightAction', rowKey);
  };

  const onLeftAction = (rowKey) => {
    console.log('onLeftAction', rowKey);
  };

  const addArticleBody = () => {
    const {idArticle} = route.params;
    navigation.navigate('AddArticleBody', {
      idArtigo: idArticle,
    });
  };

  const VisibleItem = (props) => {
    const {
      data,
      rowHeightAnimatedValue,
      editRow,
      removeRow,
      leftActionState,
      rightActionState,
    } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    if (leftActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        editRow();
      });
    }

    return (
      <Animated.View
        style={[styles.rowFront, {height: rowHeightAnimatedValue}]}>
        <TouchableHighlight
          style={styles.rowFrontVisible}
          onPress={() => {
            navigation.navigate('ArticleBodyView', {
              id: data.item.id,
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
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(data.item.id)}
        editRow={() => editRow(data.item.id)}
      />
    );
  };

  const HiddenItemWithActions = (props) => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
      onEdit,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    if (leftActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
        {!rightActionActivated && (
          <TouchableOpacity
            style={[styles.backLeftBtn, styles.backLeftBtnRight]}
            onPress={onClose}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={25}
              style={styles.leftBtn}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {!rightActionActivated && (
          <Animated.View
            style={[
              styles.backLeftBtn,
              styles.backLeftBtnLeft,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backLeftBtn, styles.backLeftBtnLeft]}
              onPress={onEdit}>
              <Animated.View
                style={[
                  styles.leftBtn,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [45, 90],
                          outputRange: [0, 1],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <MaterialCommunityIcons
                  name="file-edit-outline"
                  size={25}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
        {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onClose}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={25}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onEdit={() => editRow(rowMap, data.item.id)}
        onDelete={() => deleteRow(rowMap, data.item.id)}
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
        <View>
          <SwipeListView
            data={articleDetails}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={150}
            rightOpenValue={-150}
            leftActivationValue={200}
            rightActivationValue={-200}
            leftActionValue={0}
            rightActionValue={-600}
            onRowDidOpen={onRowDidOpen}
            onLeftAction={onLeftAction}
            onRightAction={onRightAction}
            onLeftActionStatusChange={onLeftActionStatusChange}
            onRightActionStatusChange={onRightActionStatusChange}
            onRefresh={refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.1}
            onEndReached={() => loadPage()}
            ListFooterComponent={reloading && <Loading />}
          />
          <BtnAddForm disabled={loading} onPress={addArticleBody}>
            <TxtSubmitForm>Adicionar</TxtSubmitForm>
          </BtnAddForm>
        </View>
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
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backLeftBtn: {
    alignItems: 'flex-start',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingLeft: 17,
  },
  backRightBtnLeft: {
    backgroundColor: 'dodgerblue',
    right: 75,
  },

  backLeftBtnRight: {
    backgroundColor: 'dodgerblue',
    left: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  backLeftBtnLeft: {
    backgroundColor: 'orange',
    left: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
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
