import { getTime, startOfDay } from 'date-fns'

const DAY_IN_S = 60 * 60 * 24

export default function getDays (data) {
  const start = toMs(data.forecast[0].dt)
  const dayStart = getTime(startOfDay(start))
  const end = toMs(data.forecast[data.forecast.length - 1].dt)
  const total = end - start
  const nbDays = Math.ceil(total / toMs(DAY_IN_S))
  const days = []
  for (let i = 0; i <= nbDays; i += 1) {
    const x = i === 0
      ? start
      : dayStart + i * toMs(DAY_IN_S)
    const y = 100
    days.push({ x, y })
  }
  return days
}

export function toMs (seconds) {
  return 1000 * seconds
}
