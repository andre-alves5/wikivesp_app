import styled from 'styled-components/native';

import colour from '../../config/colours';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colour.white};
`;

export const Logo = styled.View`
  padding-bottom: 20px;
  align-items: center;
`;

export const InputForm = styled.TextInput`
  background-color: ${colour.white};
  width: 90%;
  margin-bottom: 15px;
  color: #222;
  font-size: 18px;
  border-radius: 7px;
  border-color: ${colour.blue};
  border-width: 1px;
  padding: 10px;
`;

export const BtnSubmitForm = styled.TouchableOpacity`
  background-color: ${colour.blue};
  width: 90%;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
`;

export const TxtSubmitForm = styled.Text`
  color: #fff;
  font-size: 22px;
`;

export const LinkNewUser = styled.Text`
  color: #000;
  margin-top: 15px;
  font-size: 18px;
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
