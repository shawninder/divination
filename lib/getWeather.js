import fetch from 'node-fetch'

export default async function getWeather (position, locale) {
  const weather = await fetch(`/api/now?units=metric&lang=${locale}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
  return weather.json()
}
