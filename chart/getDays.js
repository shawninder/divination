import moment from 'moment'

const DAY_IN_S = 60 * 60 * 24

export default function getDays (data) {
  const start = data.forecast[0].dt
  const startOfDay = moment(toMs(start)).startOf('day').valueOf()
  const end = data.forecast[data.forecast.length - 1].dt
  const total = end - start
  const nbDays = Math.ceil(total / DAY_IN_S)
  const days = []
  for (let i = 0; i <= nbDays; i += 1) {
    const x = i === 0
      ? toMs(start)
      : startOfDay + i * toMs(DAY_IN_S)
    const y = 100
    days.push({ x, y })
  }
  return days
}

export function toMs (seconds) {
  return 1000 * seconds
}
