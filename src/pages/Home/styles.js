import styled from 'styled-components/native';

import colour from '../../config/colours';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 25px;
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

export const BtnSubmitForm = styled.TouchableOpacity`
  background-color: ${colour.blue};
  width: 100%;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  align-self: flex-end;
`;

export const TxtSubmitForm = styled.Text`
  color: #fff;
  font-size: 22px;
`;

export const TxtInfo = styled.Text`
  color: #000;
  font-size: 22px;
`;

export const TxtName = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 22px;
`;

export const ViewHome = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
`;

export const ViewTop = styled.View`
  align-items: center;
  justify-content: center;
  align-self: center;
`;
export const LogoImage = styled.Image`
  align-self: center;
`;
