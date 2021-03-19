import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/mobile';
import { Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInButtonText,
} from './styles';

import ImageLogo from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import AuthValidation from '../../validations/AuthValidations';

const SignUp = ({ navigation }) => {
  const formRef = useRef(null);
  const mailInputRef = useRef(null);
  const passInputRef = useRef(null);

  const handleSignUp = useCallback(async (data, { reset }) => {
    try {
      const validFields = await AuthValidation.signUp.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });

      console.log(validFields);
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log(err);
      }
    }
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled">
        <Container>
          <Image source={ImageLogo} style={{ alignSelf: 'center' }} />
          <Title>Crie sua conta</Title>

          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              name="name"
              icon="user"
              placeholder="Nome"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => mailInputRef.current.focus()}
            />
            <Input
              ref={mailInputRef}
              name="email"
              icon="mail"
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passInputRef.current.focus()}
            />
            <Input
              ref={passInputRef}
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => formRef.current.submitForm()}
            />

            <Button onPress={() => formRef.current.submitForm()}>Entrar</Button>
          </Form>
        </Container>
        <BackToSignInButton onPress={() => navigation.navigate('Signin')}>
          <Icon name="arrow-left" color="#fff" />
          <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
        </BackToSignInButton>
      </ScrollView>
    </>
  );
};

export default SignUp;
