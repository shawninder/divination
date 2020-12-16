import { useState, useEffect } from 'react'

import stringifyPosition from '../lib/stringifyPosition'
import { lsNamespace } from '../config'

const POSITION = `${lsNamespace}--position`

export default function usePosition (setPosition) {
  useEffect(() => {
    const savedPosition = window.localStorage.getItem(POSITION)
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition))
    }
  }, [])

  function setPos (position) {
    setPosition(position)
    window.localStorage.setItem(POSITION, stringifyPosition(position))
  }

  function requestLocation () {
    return new Promise((resolve, reject) => {
      try {
        window.navigator.geolocation.getCurrentPosition((position) => {
          setPos(position)
          resolve()
        }, reject)
      } catch (ex) {
        reject(ex)
      }
    })
  }

  return { setPos, requestLocation }
}
