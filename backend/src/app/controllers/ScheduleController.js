import User from '../models/User'
import { parseISO, startOfDay, endOfDay } from 'date-fns'
import Appointment from '../models/Appointment'
import { Op } from 'sequelize'

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    })

    if (!checkUserProvider)
      return res.status(401).json({ error: 'You are is not provider' })

    const { date } = req.query
    const parseDate = parseISO(date)

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
      },
      attributes: ['id', 'date', 'canceled_at'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
      ],
      order: ['date'],
    })

    return res.json(appointments)
  }
}

export default new ScheduleController()
