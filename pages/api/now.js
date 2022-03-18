import qs from 'qs'

const key = process.env.WEATHER_FORECAST_OPEN_WEATHER_API_KEY

const getWeather = async (req, res) => {
  const { query } = req
  if (!query) {
    return res.status(400).end()
  }
  const { lat, lon, lang, units } = query
  const url = `https://api.openweathermap.org/data/2.5/onecall?${qs.stringify({
    lat,
    lon,
    exclude: 'minutely',
    appid: key,
    lang,
    units
  })}`
  const weather = await fetch(url)
  return res.status(200).send(weather.body)
}

export default getWeather
