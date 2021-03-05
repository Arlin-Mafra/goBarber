import React from 'react'
import {Image, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {Container, Title,ForgotPassword, ForgotPasswordText,CreateAccountButton,CreateAccountButtonText} from './styles'

import ImageLogo from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'



const Signin = ({navigation}) =>{

  return(
    <>
      <ScrollView contentContainerStyle={{flex:1}}
      keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Image source={ImageLogo} />
          <Title>Faça seu logon</Title>

          <Input name="email" icon="mail" placeholder="E-mail" />
          <Input name="passowrd" icon="lock" placeholder="Senha"/>

          <Button onPress={() => navigation.navigate('SignUp')}>Entrar</Button>

          <ForgotPassword>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
        <CreateAccountButton>
          <Icon name="log-in" color="#ff9000" />
          <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton>
        </ScrollView>
    </>
  ) 
}

export default Signin