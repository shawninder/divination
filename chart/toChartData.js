import toMs from '../util/toMs'
export default function toChartData (data, key) {
  return data.forecast.map((entry) => {
    return {
      x: toMs(entry.dt),
      y: entry[key]
    }
  })
}
