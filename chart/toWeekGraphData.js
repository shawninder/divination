export default function toWeekGraphData (data) {
  return {
    forecast: data.daily.map((day) => {
      return {
        dt: day.dt,
        minTemp: day.temp.min,
        maxTemp: day.temp.max,
        humidity: day.humidity,
        pop: day.pop * 100
      }
    })
  }
}
