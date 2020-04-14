import * as Yup from 'yup'
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import Appointment from '../models/Appointment'
import User from '../models/User'
import File from '../models/File'
import Notification from '../schemas/Notifications'
import CancellationMail from '../jobs/CancellationMail'
import Queue from '../../libs/Queue'

class AppointmentController {
  //create
  async store(req, res) {
    let schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.json({
        error: 'Validation is fails',
      })
    }

    const { date, provider_id } = req.body

    //check if is provider
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    })

    if (!isProvider) {
      return res.status(401).json({ error: 'Provider invalid!' })
    }

    //
    const user = await User.findByPk(req.userId)

    if (req.userId === provider_id)
      return res.status(401).json({ error: 'Esta operação não é permitida' })

    //checking if the time has passed
    const hourStart = startOfHour(parseISO(date))

    if (isBefore(hourStart, new Date()))
      return res.status(400).json({
        error: 'scheduling for this time is no longer allowed',
      })

    //check availability
    const checkAvailability = await Appointment.findOne({
      where: { provider_id, date: hourStart, user_id: req.userId },
    })

    if (checkAvailability) {
      return res.status(400).json({
        error: 'scheduling for that date is not available',
      })
    }

    const appointment = await Appointment.create({
      date: hourStart,
      user_id: req.userId,
      provider_id,
    })

    //Notify appointments

    const formattedDate = format(hourStart, "dd 'de' MMMM ', às' H:mm'h'", {
      locale: pt,
    })

    await Notification.create({
      content: `Novo agendamento para ${user.name} para o dia ${formattedDate}`,
      user: provider_id,
    })

    return res.json(appointment)
  }

  async index(req, res) {
    const { page = 1 } = req.query

    const appointment = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'date', 'canceled_at'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    })

    return res.json(appointment)
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    })

    if (appointment.user_id !== req.userId)
      return res
        .status(401)
        .json({ error: 'you are not allowed to cancel this appointment' })

    const dateWithSub = subHours(appointment.date, 2)
    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'only cancellation is allowed up to 2 hours before scheduling',
      })
    }

    appointment.canceled_at = new Date()

    appointment.save()

    await Queue.add(CancellationMail.key, {
      appointment,
    })

    return res.json(appointment)
  }
}

export default new AppointmentController()
