import React from 'react'
import {Image, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {Container, Title,BackToSignInButton, BackToSignInButtonText,CreateAccountButton,CreateAccountButtonText} from './styles'

import ImageLogo from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'



const SignUp = ({navigation}) =>{

  return(
    <>
      <ScrollView contentContainerStyle={{flex:1}}
      keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Image source={ImageLogo} />
          <Title>Crie sua conta</Title>

          <Input name="name" icon="user" placeholder="Nome" />
          <Input name="email" icon="mail" placeholder="E-mail" />
          <Input name="passowrd" icon="lock" placeholder="Senha"/>

          <Button onPress={() => navigation.navigate('SignUp')}>Entrar</Button>
        </Container>
        <BackToSignInButton onPress={() => navigation.navigate('Signin')}>
          <Icon name="arrow-left" color="#fff" />
          <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
        </BackToSignInButton>
        </ScrollView>
    </>
  ) 
}

export default SignUp