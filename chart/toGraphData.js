export default function toGraphData (data) {
  return {
    forecast: data.hourly.map((hour) => {
      return {
        dt: hour.dt,
        temp: hour.temp,
        humidity: hour.humidity,
        pop: hour.pop * 100,
        wind: {
          speed: hour.wind_speed
        },
        feels_like: hour.feels_like,
        icon: hour.icon
      }
    })
  }
}
