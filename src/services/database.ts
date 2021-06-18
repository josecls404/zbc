import { ProfessionalData, Interval } from './types'
import { addHours, isWithinInterval } from 'date-fns'

/** in memory database */
let storage: Record<string, ProfessionalData> = {}

/**
 * This method is responsible for receive the professional's identifier and the available periods (interval) for each day in
 * and then stores it into the memory database.
 * @param id professional's identifier
 * @param availablePeriods structured available periods
 */
export const addAvailablePeriodsById = (id: string, availablePeriods: Record<string, Record<string, boolean>>): boolean | null => {
  const availablePeriodsDays = Object.keys(availablePeriods)

  for (let availablePeriodDay of availablePeriodsDays) {
    const professionalAvailablePeriods = storage[id]?.availablePeriods[availablePeriodDay] || null

    if (professionalAvailablePeriods === null) {
      storage = {
        ...storage,
        [id]: {
          availablePeriods: {
            ...storage[id]?.availablePeriods,
            [availablePeriodDay]: availablePeriods[availablePeriodDay]
          },
        }
      }
    } else {
      return null
    }
  }

  return true
}

/**
 * 
 * @param id professional's identifier
 * @param availablePeriods available periods to update
 * @returns true when it all works fine and null when it fails
 */
export const updateAvailablePeriodsById = (id: string, availablePeriods: Record<string, Record<string, boolean>>): boolean | null => {
  const professionalAvailablePeriods = storage[id]?.availablePeriods

  if (professionalAvailablePeriods) {
    storage = {
      ...storage,
      [id]: {
        availablePeriods: {
          ...storage[id]?.availablePeriods,
          ...availablePeriods
        },
      }
    }

    return true
  }

  return null
}

/**
 * This method is responsible for receive the professional's identifier and returns its available periods.
 * @param id professional's identifier
 * @returns the professional's available periods
 */
export const getAvailablePeriodsById = (id: string): Record<string, Record<string, boolean>> | null => {
  const professionalAvailablePeriods = storage[id]?.availablePeriods || null

  if (Object.keys(professionalAvailablePeriods).length === 0) return null

  return professionalAvailablePeriods
}

/**
 * This method is responsible for receive the professional's identifier and a available periods day and
 * remove all available periods.
 * @param id professional's identifier
 * @param day available periods day
 * @returns true when it all works fine and null when it fails
 */
export const removeAvailablePeriodsById = (id: string, day: string): boolean | null => {
  const professionalAvailablePeriod = storage[id]?.availablePeriods[day] || null

  if (professionalAvailablePeriod) {
    let availablePeriods = Object.assign({}, storage[id].availablePeriods)
    delete availablePeriods[day]

    storage = {
      ...storage,
      [id]: {
        availablePeriods: {
          ...availablePeriods
        },
      }
    }

    return true
  }

  return null
}

/**
 * 
 * @param id professional's identifier
 * @param interval interval (start date and end date)
 * @returns list of available periods
 */
export const listAvailablePeriodById = (id: string, interval: Interval): Record<string, Record<string, boolean>> | null => {
  let availablePeriods = Object.assign({}, storage[id]?.availablePeriods) || null

  for (let availablePeriod in availablePeriods) {
    if (!isWithinInterval(new Date(availablePeriod), interval)) delete availablePeriods[availablePeriod]
  }

  if (Object.keys(availablePeriods).length === 0) return null

  return availablePeriods
}

/**
 * 
 * @param id professional's identifier
 * @param day day (2022-01-05)
 * @param hour begin hour (8:00)
 * @returns true when it all works fine and null when it fails
 */
export const bookSessionById = (id: string, day: string, hour: string): boolean | null => {
  const availablePeriods = storage[id]?.availablePeriods[day] || null

  if (availablePeriods) {
    const start = new Date(day + ' ' + hour)
    const end = addHours(start, 1)
    const availableHours = Object.keys(availablePeriods)

    if (!availableHours.includes(hour)) return null

    for (let availablePeriod in availablePeriods) {
      const currentDate = new Date(day + ' ' + availablePeriod)
      const isHourBetweenInterval = isWithinInterval(new Date(currentDate), { start, end })

      if (isHourBetweenInterval) {
        const isPeriodAvailable = storage[id].availablePeriods[day][availablePeriod] === true

        if (isPeriodAvailable) {
          storage[id].availablePeriods[day][availablePeriod] = false
        } else {
          return null
        }
      }
    }

    return true
  }

  return null
}
