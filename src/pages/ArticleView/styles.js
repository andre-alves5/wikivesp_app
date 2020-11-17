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
  font-size: 14px;
`;

export const SubTitleContent = styled.Text`
  padding-top: 18px;
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
  background-color: ${colour.blue};
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

export const CloseBtn = styled.TouchableOpacity`
  align-items: 'flex-end',
  position: 'absolute',
  margin-top: 25px,
  margin-right: 25px,
`;

export const SubTitleImgModal = styled.Modal`
  flex: 1;
  padding: 0 25px;
  justify-content: center;
  align-items: center;
  background-color: ' ${colour.gray}';
`;

export const SubTitleImg = styled.Image`
  height: '300';
`;
