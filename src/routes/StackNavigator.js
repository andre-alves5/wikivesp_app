import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {TitleIcon} from './styles';

import Home from '../pages/Home';
import Perfil from '../pages/Perfil';
import List from '../pages/List';
import MyArticles from '../pages/MyArticles';
import ArticleView from '../pages/ArticleView';
import ArticleBody from '../pages/ArticleBody';
import ArticleBodyView from '../pages/ArticleBodyView';
import AddArticle from '../pages/AddArticle';
import AddArticleBody from '../pages/AddArticleBody';
import EditArticle from '../pages/EditArticle';
import EditArticleBody from '../pages/EditArticleBody';
import EditArticleBodyImage from '../pages/EditArticleBodyImage';
import EditPerfil from '../pages/EditPerfil';
import EditProfileImage from '../pages/EditProfileImage';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#948f8f',
  },
  headerTintColor: 'dodgerblue',
  headerBackTitle: 'Voltar',
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const AccountStackNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerTitle: 'Perfil',
          headerRight: () => (
            <TitleIcon>
              <MaterialCommunityIcons
                name="circle-edit-outline"
                size={25}
                color="dodgerblue"
                onPress={() => {
                  navigation.navigate('EditPerfil');
                }}
              />
            </TitleIcon>
          ),
        }}
      />

      <Stack.Screen
        name="EditPerfil"
        component={EditPerfil}
        options={{
          headerTitle: 'Editar Perfil',
        }}
      />

      <Stack.Screen
        name="EditProfileImage"
        component={EditProfileImage}
        options={{
          headerTitle: 'Editar Foto',
        }}
      />
    </Stack.Navigator>
  );
};

const ListStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="List" component={List} />
    </Stack.Navigator>
  );
};

const ListStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="List"
        component={List}
        options={{
          headerTitle: 'Todos Artigos',
        }}
      />

      <Stack.Screen
        name="ArticleView"
        component={ArticleView}
        options={{
          headerTitle: 'Artigo',
        }}
      />
    </Stack.Navigator>
  );
};

const MyArticlesStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="MyArticles"
        component={MyArticles}
        options={{
          headerTitle: 'Meus Artigos',
          headerRight: () => (
            <TitleIcon>
              <MaterialCommunityIcons
                name="plus-circle-outline"
                size={25}
                color="dodgerblue"
                onPress={() => {
                  navigation.navigate('AddArticle');
                }}
              />
            </TitleIcon>
          ),
        }}
      />

      <Stack.Screen
        name="ArticleView"
        component={ArticleView}
        options={{
          headerTitle: 'Artigo',
        }}
      />

      <Stack.Screen
        name="AddArticle"
        component={AddArticle}
        options={{
          headerTitle: 'Novo Artigo',
        }}
      />

      <Stack.Screen
        name="EditArticle"
        component={EditArticle}
        options={{
          headerTitle: 'Editar Artigo',
        }}
      />

      <Stack.Screen
        name="ArticleBody"
        component={ArticleBody}
        options={{
          headerTitle: 'Subtítulos do Artigo',
        }}
      />

      <Stack.Screen
        name="ArticleBodyView"
        component={ArticleBodyView}
        options={{
          headerTitle: 'Subtítulo do Artigo',
        }}
      />

      <Stack.Screen
        name="AddArticleBody"
        component={AddArticleBody}
        options={{
          headerTitle: 'Adicionar Subtítulos',
        }}
      />

      <Stack.Screen
        name="EditArticleBody"
        component={EditArticleBody}
        options={{
          headerTitle: 'Editar Subtítulos',
        }}
      />

      <Stack.Screen
        name="EditArticleBodyImage"
        component={EditArticleBodyImage}
        options={{
          headerTitle: 'Editar Imagem',
        }}
      />
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  AccountStackNavigator,
  ListStackNavigator,
  ListStack,
  MyArticlesStack,
};
