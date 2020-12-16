import fetch from 'node-fetch'

export default async function getCityWeather (city, locale) {
  const cityWeather = await fetch(`/api/city?units=metric&lang=${locale}&name=${global.encodeURIComponent(city)}`)
  return cityWeather.json()
}
