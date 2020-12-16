import { useState } from 'react'

import getCityWeather from '../lib/getCityWeather'

export default function useCity (locale) {
  const [err, setErr] = useState(null)

  async function getCity (city) {
    const cityWeather = await getCityWeather(city, locale)
    if (cityWeather.cod === 200) {
      const { lat, lon } = cityWeather.coord
      clearErr()
      const cityName = cityWeather.name
      const name = cityWeather.sys.country ? `${cityName}, ${cityWeather.sys.country}` : cityName
      return {
        name,
        coords: { latitude: lat, longitude: lon }
      }
    }
    setErr(cityWeather.message)
    return null
  }

  function clearErr () {
    setErr(null)
  }

  return { getCity, err, clearErr }
}
