import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import authConfig from '../../config/authConfig'

export default async (req, res, next) => {
  const { authorization } = req.headers

  // Ausência do token
  if (!authorization) {
    return res.status(401).json({
      error: 'Token not provider',
    })
  }

  // Desestruturação de vetor (Bearer, ...token)
  const [, token] = authorization.split(' ')

  try {
    const { id } = await promisify(jwt.verify)(token, authConfig.secret)
    // Incluir o userId dentro de todos os requires
    req.userId = id
  } catch (error) {
    return res.status(401).json({
      error: 'Token invalid',
    })
  }
  return next()
}
