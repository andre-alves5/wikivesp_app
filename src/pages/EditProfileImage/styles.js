import styled from 'styled-components/native';

import colour from '../../config/colours';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 25px;
  justify-content: flex-start;
  align-items: center;
  justify-content: center;
  background-color: ${colour.white};
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

export const UserImage = styled.Image`
  width: 300px;
  height: 300px;
  border-radius: 7px;
`;

export const BtnSubmitForm = styled.TouchableOpacity`
  background-color: ${colour.blue};
  width: 100%;
  height: 45px;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 0 15px;
`;

export const TxtSubmitForm = styled.Text`
  color: #fff;
  font-size: 22px;
`;
