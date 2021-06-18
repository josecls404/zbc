import { eachMinuteOfInterval, format, subHours } from "date-fns"
import cors from 'cors'

/**
 * This helper function is responsible for structuring the availability periods to the following
 * pattern: day -> availability periods
 * @param availabilities unstructured availability periods
 * @returns structured availability periods
 */
export const organizeAvailabilitiesPeriods = (availabilities: Record<string, string>) => {
  // define the final structure
  const availablePeriods: Record<string, Record<string, boolean>> = {}

  // structuring the availability periods
  for (let availablePeriod in availabilities) {
    const interval = availabilities[availablePeriod].split(/\s*-\s*/)
    const start = new Date(`${availablePeriod} ${interval[0]}`)
    const end = subHours(new Date(`${availablePeriod} ${interval[1]}`), 1)
    const temporaryStorage: Record<string, boolean> = {}

    // date-fns lovely functions returns all possible half hour intervals and then formats it to hours:minutes
    const eachHalfHourOfInterval = eachMinuteOfInterval({ start, end }, { step: 30 })
    eachHalfHourOfInterval.forEach(date => temporaryStorage[format(date, 'HH:mm')] = true)

    // // update temporary storage
    availablePeriods[availablePeriod] = temporaryStorage
  }

  return availablePeriods
}

/**
 * This helper function is responsible for configuring Cors
 * @returns cors configuration
 */
export const applyCorsConfig = cors({
  allowedHeaders: '*',
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
})
