import { Router, Request, Response } from 'express'
import { organizeAvailabilitiesPeriods } from '../services/helper'
import {
  addAvailablePeriodsById,
  getAvailablePeriodsById,
  listAvailablePeriodById,
  removeAvailablePeriodsById,
  updateAvailablePeriodsById,
} from '../services/database'
import { Interval } from '../services/types'

const router = Router()

/**
 * This endpoint is responsible for the professional's period availabilities register.
 */
router.post('/availabilities', (req: Request, res: Response) => {
  try {
    // get the professional identifier and its availabilities
    const { id, availabilities } = req.body

    // validate if all params have been received properly
    if (!id) return res.status(400).send({ msg: 'O id precisa ser informado.', status: 400 })
    if (!availabilities) return res.status(400).send({ msg: 'Ao menos um horário precisa ser informado.', status: 400 })

    // structures the data and store it into the memory database
    const availablePeriods = organizeAvailabilitiesPeriods(availabilities)
    const availablePeriodsSuccessfullyAdded = addAvailablePeriodsById(id, availablePeriods)

    if (availablePeriodsSuccessfullyAdded === null)
      return res.status(400).send({ msg: 'Não foi possível adicionar os horários de disponibilidade.', status: 400 })

    return res.status(200).send({ msg: 'Os horários foram registrados com sucesso.', status: 200 })
  } catch (error) {
    return res.status(400).send({ msg: 'Não foi possível adicionar os horários de disponibilidade.', status: 400 })
  }
})

/**
 * This endpoint is responsible for get all available periods of a professional.
 */
router.get('/availabilities', (req: Request, res: Response) => {
  try {
    // get the professional identifier and its availabilities
    const { id } = req.body

    // validate if all params have been received properly
    if (!id) return res.status(400).send({ msg: 'O id precisa ser informado.', status: 400 })

    // get professional's available periods and validate it
    const professionalAvailablePeriods = getAvailablePeriodsById(id)

    if (professionalAvailablePeriods === null)
      return res.status(404).send({ msg: 'Os dados para esse profissional não foram encontrados.', status: 404 })

    return res.status(200).send(professionalAvailablePeriods)
  } catch (error) {
    return res.status(400).send({ msg: 'Não foi possível consultar os horários de disponibilidade.', status: 400 })
  }
})

router.get('/availabilitiesByInterval', (req: Request, res: Response) => {
  try {
    const { id, startDate, endDate } = req.query

    if (!id) return res.status(400).send({ msg: 'O id precisa ser informado.', status: 400 })
    if (!startDate) return res.status(400).send({ msg: 'A data inicial precisa ser informada.', status: 400 })
    if (!endDate) return res.status(400).send({ msg: 'A data final precisa ser informada.', status: 400 })

    const interval: Interval = {
      start: new Date(startDate as string),
      end: new Date(endDate as string)
    }

    const professionalAvailablePeriods = listAvailablePeriodById(id as string, interval)

    if (professionalAvailablePeriods === null)
      return res.status(404).send({ msg: 'Os dados para esse profissional não foram encontrados.', status: 404 })

    return res.status(200).send(professionalAvailablePeriods)
  } catch (error) {
    return res.status(400).send({ msg: 'Não foi possível consultar os horários de disponibilidade.', status: 400 })
  }
})

/**
 * This endpoint is responsible for the professional's period availabilities update.
 */
router.put('/availabilities', (req: Request, res: Response) => {
  try {
    // get the professional identifier and its availabilities
    const { id, availabilities } = req.body

    // validate if all params have been received properly
    if (!id) return res.status(400).send({ msg: 'O id precisa ser informado.', status: 400 })
    if (!availabilities) return res.status(400).send({ msg: 'Ao menos um horário precisa ser informado.', status: 400 })

    // structures the data and update the memory database
    const availablePeriods = organizeAvailabilitiesPeriods(availabilities)
    const availablePeriodsSuccessfullyUpdated = updateAvailablePeriodsById(id, availablePeriods)

    if (!availablePeriodsSuccessfullyUpdated)
      return res.status(400).send({ msg: 'Esse identificador não corresponde a nenhum profissional.', status: 400 })

    return res.status(200).send({ msg: 'Os horários foram atualizados com sucesso.', status: 200 })
  } catch (error) {
    return res.status(400).send({ msg: 'Não foi possível atualizar os horários de disponibilidade.', status: 400 })
  }
})

/**
 * This endpoint is responsible for the professional's period availabilities remotion.
 */
router.delete('/availabilities', (req: Request, res: Response) => {
  try {
    // get the professional identifier and its availabilities
    const { id, day } = req.body

    // validate if all params have been received properly
    if (!id) return res.status(400).send({ msg: 'O id precisa ser informado.', status: 400 })
    if (!day) return res.status(400).send({ msg: 'O dia precisa ser informado.', status: 400 })

    // remove the available periods by id and day
    const availablePeriodSuccessfullyRemoved = removeAvailablePeriodsById(id, day)

    if (!availablePeriodSuccessfullyRemoved)
      return res.status(400).send({ msg: 'Não há período de disponibilidade para o dia informado.', status: 400 })

    return res.status(200).send({ msg: 'Os horários de disponibilidade foram excluídos para o dia informado.', status: 200 })
  } catch (error) {
    return res.status(400).send({ msg: 'Não foi possível apagar os horários de disponibilidade.', status: 400 })
  }
})

export default router