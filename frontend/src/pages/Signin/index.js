import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.svg'
// import { Container } from './styles';

export default function Signin() {
  return (
    <>
      <img src={logo} alt="Gobarber" />

      <form action="">
        <input type="email" placeholder="Seu e-mail" />
        <input type="password" placeholder="Sua senha" />
        <button type="submit">Entrar</button>
        <Link to="/register">Criar conta</Link>
      </form>
    </>
  )
}
