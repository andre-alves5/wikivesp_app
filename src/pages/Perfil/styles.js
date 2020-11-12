import styled from 'styled-components/native';
import colour from '../../config/colours';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 25px;
  justify-content: flex-start;
  background-color: #fff;
`;

export const TitleContent = styled.Text`
  padding-top: 15px;
  color: #111;
  font-weight: bold;
  font-size: 14px;
`;

export const ContentUser = styled.Text`
  padding-bottom: 15px;
  color: #111;
  font-size: 20px;
  border-bottom-color: ${colour.blue};
  border-bottom-width: 1px;
`;

export const BtnActionEdit = styled.TouchableOpacity`
  margin-top: 15px;
  background-color: #ebb105;
  width: 100%;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
`;

export const BtnActionDelete = styled.TouchableOpacity`
  margin-top: 15px;
  background-color: #dc3545;
  width: 100%;
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

export const ImageUser = styled.Image`
  top: 20px;
  bottom: 20px;
  borderRadius: 100px;
`;

export const ViewName = styled.View`
  top: 20px;
`;

export const ViewImageUser = styled.View`
  align-items: center;
`;

export const BtnSubmitForm = styled.TouchableOpacity`
  background-color: ${colour.blue};
  top: 20px;
  width: 100%;
  height: 45px;
  borderRadius: 7px;
  align-items: center;
  justify-content: center;
`;

export const TxtSubmitForm = styled.Text`
  color: #fff;
  font-size: 22px;
`;
