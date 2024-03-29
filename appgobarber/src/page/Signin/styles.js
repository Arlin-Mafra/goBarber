import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: stretch;
  justify-content: center;

  padding: 0 30px;
`;



export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 64px 0 24px;
  align-self: center;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  align-self: center;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-bottom-width: 1px;
  border-color: #232129;
  padding: 16px 0;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  color: #ff9000;
  margin-left: 16px;
`;
