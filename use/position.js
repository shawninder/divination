import { useEffect, useState } from 'react'
import get from 'lodash.get'

import getCityWeather from '../lib/getCityWeather'
import getPlaceName from '../lib/getPlaceName'
import { lsNamespace } from '../config'
import texts from '../texts'

const POSITION = `${lsNamespace}--position`

export default function usePosition (locale, setWorking) {
  const [position, setPosition] = useState(null)
  const [err, setErr] = useState(null)

  useEffect(() => {
    const savedPosition = window.localStorage.getItem(POSITION)
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition))
    }
  }, [])

  useEffect(async () => {
    if (position) {
      setWorking(true)
      if (get(position, 'isCoords')) {
        await requestLocation()
      } else {
        await findCity(position.name)
      }
      setWorking(false)
    }
  }, [locale])

  function setPos (position) {
    setPosition(position)
    window.localStorage.setItem(POSITION, JSON.stringify(position))
  }

  function requestLocation () {
    return new Promise((resolve, reject) => {
      try {
        window.navigator.geolocation.getCurrentPosition(async (position) => {
          setPos({
            isCoords: true,
            name: `${texts[locale].currentPosition}: ${await getPlaceName(position, locale)}`,
            coords: { latitude: get(position, 'coords.latitude'), longitude: get(position, 'coords.longitude')}
          })
          resolve()
        }, reject)
      } catch (ex) {
        reject(ex)
      }
    })
  }

  async function findCity(city) {
    const cityWeather = await getCityWeather(city, locale)
    if (cityWeather.cod === 200) {
      const { lat, lon } = cityWeather.coord
      clearErr()
      const cityName = cityWeather.name
      const name = cityWeather.sys.country
        ? `${cityName}, ${cityWeather.sys.country}`
        : cityName
      setPos({
        isCoords: false,
        name,
        coords: { latitude: lat, longitude: lon }
      })
    }
    setErr(cityWeather.message)
  }

  function clearErr(event) {
    setErr(null)
    if (event) {
      event.preventDefault()
    }
  }

  return { position, requestLocation, findCity, err, clearErr }
}
