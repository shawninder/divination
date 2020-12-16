import qs from 'qs'

const key = process.env.WEATHER_FORECAST_OPEN_WEATHER_API_KEY

export default async (req, res) => {
  const { query } = req
  if (!query) {
    return res.status(400).end({})
  }
  const { name, lang, units } = query
  const url = `https://api.openweathermap.org/data/2.5/weather?${qs.stringify({
    q: name,
    lang,
    units,
    appid: key
  })}`
  const cityWeather = await fetch(url)
  return res.status(200).send(cityWeather.body)
}
