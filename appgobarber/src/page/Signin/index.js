import React, { useRef, useCallback } from 'react';
import {
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

import { Form } from '@unform/mobile';
import ImageLogo from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Signin = ({ navigation }) => {
  const formRef = useRef(null);
  const passInputRef = useRef(null)

  const handleSignIn = useCallback((data, { reset }) => {
    console.log(data);
    reset();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled">
          <Container>
            <Image source={ImageLogo} style={{ alignSelf: 'center' }} />
            <Title>Faça seu logon</Title>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType='next'
                onSubmitEditing={() => passInputRef.current.focus()}
              />
              <Input
                ref={passInputRef}
                name="passowrd"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType='send'
                onSubmitEditing={() => formRef.current.submitForm()}
              />

              <Button onPress={() => formRef.current.submitForm()}>
                Entrar
              </Button>
            </Form>
            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
          <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
            <Icon name="log-in" color="#ff9000" />
            <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
          </CreateAccountButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Signin;
