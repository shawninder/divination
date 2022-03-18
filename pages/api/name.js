import qs from 'qs'

const key = process.env.WEATHER_FORECAST_OPEN_WEATHER_API_KEY

const getLocationName = async (req, res) => {
  const { query } = req
  if (!query) {
    return res.status(400).end()
  }
  const { lat, lon, limit = 1, lang } = query
  const url = `https://api.openweathermap.org/geo/1.0/reverse?${qs.stringify({
    lat,
    lon,
    limit,
    appid: key
  })}`
  const namesRes = await fetch(url)
  const names = await namesRes.json()
  return res.status(200).send(names[0].local_names[lang])
}

export default getLocationName
