import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.svg'

export default function Signup() {
  return (
    <>
      <img src={logo} alt="Gobarber" />

      <form action="">
        <input type="text" placeholder="Nome completo" />
        <input type="email" placeholder="Seu e-mail" />
        <input type="password" placeholder="Sua senha" />
        <button type="submit">Cadastrar</button>
        <Link to="/">Já tenho conta</Link>
      </form>
    </>
  )
}
