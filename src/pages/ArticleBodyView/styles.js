import styled from 'styled-components/native';

import colour from '../../config/colours';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 25px;
  justify-content: flex-start;
  background-color: ${colour.white};
`;

export const TitleContent = styled.Text`
  padding-top: 15px;
  color: #111;
  font-weight: bold;
  font-size: 18px;
`;

export const ContentUser = styled.Text`
  padding-bottom: 15px;
  color: #111;
  font-size: 18px;
  border-bottom-color: ${colour.blue};
  border-bottom-width: 1px;
`;

export const BtnActionEdit = styled.TouchableOpacity`
  margin-top: 15px;
  margin-bottom: 20px;
  background-color: ${colour.blue};
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
`;

export const BtnActionDelete = styled.TouchableOpacity`
  margin-top: 15px;
  background-color: #dc3545;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
`;

export const TxtBtnAction = styled.Text`
  color: #fff;
  font-size: 22px;
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

export const CloseBtn = styled.TouchableOpacity`
  align-items: 'flex-end',
  position: 'absolute',
  margin-top: 25px,
  margin-right: 25px,
`;

export const BtnSubmitForm = styled.TouchableOpacity`
  top: 15px;
  margin-bottom: 20px;
  background-color: ${colour.blue};
  height: 45px;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
`;

export const TxtSubmitForm = styled.Text`
  color: #fff;
  font-size: 22px;
`;

export const ImageModal = styled.Modal`
  flex: 1;
  padding: 0 25px;
  align-items: center;
  justify-content: center;
  background-color: ${colour.black};
`;

export const ImageBox = styled.View`
  padding: 0 25px;
`;
