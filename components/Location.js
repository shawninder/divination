import { useEffect, useContext, useRef } from 'react'
import get from 'lodash.get'

import styles from '../styles/Location.module.css'
import BusyContext from '../ctx/busy'
import LocaleContext from '../ctx/locale'
import PositionContext from '../ctx/position'
import texts from '../texts'

function Location () {
  const searchInput = useRef(null)
  const locale = useContext(LocaleContext)
  const [working, setWorking] = useContext(BusyContext)
  const {position, requestLocation, findCity, err, clearErr} = useContext(PositionContext)

  const txt = texts[locale]

  useEffect(() => {
    if (position) {
      clearErr()
    }
  }, [position])

  async function onSubmit (event) {
    event.preventDefault()
    setWorking(true)
    await findCity(event.target.querySelector('input[name=city]').value)
    setWorking(false)
  }

  async function onGeolocate (event) {
    event.preventDefault()
    setWorking(true)
    if (searchInput.current) {
      searchInput.current.value = ''
    }
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
        <label className={styles.cityLabel}>
          <span>{txt.findCity}</span>
          <input
            ref={searchInput}
            type='text'
            name='city'
            placeholder={txt.findCity}
            onChange={clearErr}
            defaultValue={get(position, 'isCoords') ? '' : get(position, 'name', '')}
            disabled={working}
          />
        </label>
        <input type='submit' value={txt.getWeather} disabled={working} />
      </div>
      <br />
      <button onClick={onGeolocate} disabled={working}>
        {txt.or} <strong>{txt.useLocation}</strong>
      </button>
      <p className={`${styles.err} ${err ? '' : styles.hidden}`} role='dialog'>
        {err}
        &nbsp;
        <span className={styles.dismiss}>
          (
          <button
            className={styles.dismissButton}
            onClick={clearErr}
            aria-label={txt.dismiss}
          >
            {txt.dismiss}
          </button>
          )
        </span>
      </p>
    </form>
  )
}

export default Location
