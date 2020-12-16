export default function toChartData (data, key) {
  return data.forecast.map((entry) => {
    return {
      x: entry.dt * 1000,
      y: entry[key]
    }
  })
}
