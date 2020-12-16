import { useState, useEffect, useContext } from 'react'
import get from 'lodash.get'

import useCity from '../use/city'
import styles from '../styles/location.module.css'
import LocaleContext from '../ctx/locale'
import texts from '../texts'

export default function Location ({ position, setPos, requestLocation }) {
  const locale = useContext(LocaleContext)
  const [working, setWorking] = useState(false)
  const { getCity, err, clearErr } = useCity(locale)

  const txt = texts[locale]

  useEffect(() => {
    if (position) {
      clearErr()
    }
  }, [position])

  async function onSubmit (event) {
    event.preventDefault()
    setWorking(true)
    const pos = await getCity(event.target.querySelector('input[name=city]').value)
    setWorking(false)
    setPos(pos)
  }

  async function onGeolocate (event) {
    event.preventDefault()
    setWorking(true)
    try {
      await requestLocation()
    } catch (ex) {
      console.error(`${ex}: ${ex.message} ${Object.keys(ex)}`)
    }
    setWorking(false)
  }

  return (
    <form onSubmit={onSubmit} className={styles.location}>
      <div>
        <input
          type='text'
          name='city'
          placeholder={txt.findCity}
          onChange={clearErr}
          defaultValue={get(position, 'name', '')}
          disabled={working}
        />
        <input
          type='submit'
          value={txt.getWeather}
          disabled={working}
        />
      </div>
      <br />
      <button
        onClick={onGeolocate}
        disabled={working}
      >
        {txt.or} <strong>{txt.useLocation}</strong>
      </button>
      <p className={`${styles.err} ${err ? '' : styles.hidden}`}>
        {err}
        &nbsp;
        <span
          className={styles.dismiss}
        >
          (<a onClick={clearErr}>dismiss</a>)
        </span>
      </p>
    </form>
  )
}
