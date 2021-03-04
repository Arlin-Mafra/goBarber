import React from 'react'
import {Image} from 'react-native'
import {Container, Title} from './styles'
import ImageLogo from '../../assets/logo.png'



const Signin = () =>{

  return(
    <Container>
      <Image source={ImageLogo} />
      <Title>Faça se logon</Title>
    </Container>
  ) 
}

export default Signin