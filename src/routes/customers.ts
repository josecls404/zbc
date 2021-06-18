import { Router, Request, Response } from 'express'
import { bookSessionById } from '../services/database'

const router = Router()

/**
 * This endpoint is responsible for reiceve the professional identifier, a day (2022-01-05) and a
 * initial hour (08:00) and book a 1 hour session.
 */
router.post('/sessions', (req: Request, res: Response) => {
  try {
    // get professional id, session day and session hour
    const { id, day, hour } = req.body

    // validates if all params have been received properly
    if (!id) return res.status(400).send({ msg: 'O id do profissional não foi informado.', status: 400 })
    if (!day) return res.status(400).send({ msg: 'O dia de agendamento não foi informado.', status: 400 })
    if (!hour) return res.status(400).send({ msg: 'O dia de agendamento não foi informado.', status: 400 })

    // attempt to book session and validates it
    const sessionSuccessfullyBooked = bookSessionById(id, day, hour)
    if (!sessionSuccessfullyBooked)
      return res.status(400).send({ msg: 'O profissional não está disponível nesse horário.', status: 400 })

    return res.status(200).send({ msg: 'A sessão foi agendada com sucesso.', status: 200 })
  } catch (error) {
    return res.status(400).send({ msg: 'Não foi possível agendar uma sessão.', status: 400 })
  }
})

export default router