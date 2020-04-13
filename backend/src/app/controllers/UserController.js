import * as Yup from 'yup'

import User from '../models/User'

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'provider', 'avatar_id'],
    })

    return res.json(users)
  }

  async store(req, res) {
    let schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required().lowercase(),
      password: Yup.string().required().min(4),
      avatar_id: Yup.number(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.json({
        error: 'Validation is fails',
      })
    }

    const data = req.body

    const emailExists = await User.findOne({ where: { email: req.body.email } })

    if (emailExists)
      return res
        .status(400)
        .json({ error: 'Já existe um usuário com esse e-mail' })

    const user = await User.create(data)

    return res.json(user)
  }

  async update(req, res) {
    let schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email().lowercase(),
      avatar_id: Yup.number(),
      oldPassword: Yup.string().min(4),
      password: Yup.string()
        .min(4)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),

      confirPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    })

    if (!(await schema.isValid(req.body))) {
      return res.json({
        error: 'Validation is fails',
      })
    }

    const user = await User.findByPk(req.userId)

    const { email, password, oldPassword } = req.body

    if (email !== user.email) {
      const emailExists = await User.findOne({ where: { email } })

      if (emailExists) {
        return res
          .status(400)
          .json({ error: 'Já existe um usuário com esse e-mail' })
      }
    }

    if (oldPassword && !(await user.checkPasswors(oldPassword)))
      return res.status(400).json({ error: 'password not match' })

    const { id, name, provider, password_hash, avatar_id } = await user.update(
      req.body
    )

    return res.json({
      id,
      name,
      email,
      provider,
      password_hash,
      avatar_id,
    })
  }
}

module.exports = new UserController()
