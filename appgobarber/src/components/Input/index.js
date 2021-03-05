import React from 'react'


import {Container, TextInput,Icon} from './styles'



const Input = ({name, icon, ...rest}) =>(
  <Container>
    <Icon name={icon}  size={20} color="#666360" />
    <TextInput placeholderTextColor="#666360"   {...rest}/>
  </Container>

)

export default Input