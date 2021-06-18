/** Defines the professional's data structure */
export type ProfessionalData = {
  availablePeriods: Record<string, Record<string, boolean>>,
}

/** Defines the Interval (start and end) structure */
export type Interval = {
  start: Date,
  end: Date
}