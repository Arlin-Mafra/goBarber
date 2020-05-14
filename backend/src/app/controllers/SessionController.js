import jwt from 'jsonwebtoken'

import User from '../models/User'
import File from '../models/File'
import authConfig from '../../config/authConfig'

class SessionController {
  async store(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    })

    if (!user) return res.status(401).json({ error: 'Usuário não existe...' })

    if (!(await user.checkPasswors(password)))
      return res.status(401).json({ error: 'Password not match' })

    const { id, name, avatar, provider } = user

    return res.json({
      user: {
        id,
        name,
        email,
        provider,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

module.exports = new SessionController()
