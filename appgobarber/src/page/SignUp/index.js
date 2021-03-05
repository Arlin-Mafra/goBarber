import React from 'react'
import {Button,Text} from 'react-native'
import {Container} from './styles'



const SignUp = ({navigation}) =>{

  return(
    <Container>
      <Button title="Voltar" onPress={() => navigation.navigate('Signin')} />
    </Container>
  ) 
}

export default SignUp