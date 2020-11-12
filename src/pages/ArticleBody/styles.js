import styled from 'styled-components/native';
import colour from '../../config/colours';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${colour.bggray};
  align-self: stretch;
`;

export const TitleList = styled.Text`
  color: #111;
  font-size: 22px;
  padding: 10px 0;
`;

export const ListArticles = styled.FlatList`
  width: 95%;
`;

export const RowArticle = styled.View`
  background-color: ${colour.white};
  height: 60;
  padding: 10px;
  margin: 5px;
  marginBottom: 15px;
  border-radius: 5;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  shadowColor: ${colour.gray};
  shadowOffset: {width: 0, height: 1};
  shadowOpacity: 0.8;
  shadowRadius: 2px;
  elevation: 5;
`;

export const DataArticle = styled.Text`
  color: #111;
  flex: 1;
  flex-direction: column;
`;

export const ValueArticle = styled.Text`
  font-size: 16px;
  include-font-padding: false;
  flex: 0;
  text-align-vertical: bottom;
`;

export const ViewArticle = styled.Text`
  justify-content: flex-end;
`;

export const Pagination = styled.View`
  background-color: ${colour.bggray};
  padding: 10px;
  border-radius: 2px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const PaginationText = styled.Text`
  background-color: ${colour.bggray};
  font-size: 16px;
  padding: 12px;
  margin: 3px;
`;

export const PaginationTextActive = styled.Text`
  background-color: ${colour.bggray};
  color: ${colour.blue};
  font-size: 16px;
  padding: 12px;
  margin: 3px;
`;

export const LoadingArea = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
`;

export const BtnAddForm = styled.TouchableOpacity`
  background-color: ${colour.blue};
  height: 45px;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

export const TxtSubmitForm = styled.Text`
  color: #fff;
  font-size: 22px;
`;
