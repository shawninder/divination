import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import get from 'lodash.get'

import { colors } from '../config'
import styles from '../styles/Weather.module.css'
import LocaleContext from '../ctx/locale'
import PositionContext from '../ctx/position'
import texts from '../texts'

import {
  formatRelative
} from 'date-fns'

import dateFnsLocales from '../lib/dateFnsLocales'

function Weather ({ data }) {
  const locale = useContext(LocaleContext)
  const {position} = useContext(PositionContext)
  const [hidden, setHidden] = useState(!data)

  const txt = texts[locale]

  const icon = get(data, ['current', 'weather', '0', 'icon'])
  const description = get(data, ['current', 'weather', '0', 'description'])

  const tempRaw = get(data, ['current', 'temp'])
  const temp = typeof tempRaw !== 'undefined' ? `${Math.round(tempRaw)}ºC` : ''

  const feelRaw = get(data, ['current', 'feels_like'])
  const feelsLike = typeof feelRaw !== 'undefined' ? `${Math.round(feelRaw)}ºC` : ''

  const humidity = get(data, ['current', 'humidity'])
  const hum = typeof humidity !== 'undefined' ? `${humidity}%` : ''

  // const windDeg = get(data, ['current', 'wind_deg'])
  const windSpeed = get(data, ['current', 'wind_speed'])
  const wind = typeof windSpeed !== 'undefined' ? `${windSpeed}m/s` : ''
  // const windGust = get(data, ['current', 'wind_gust'])

  const rainRaw = get(data, ['current', 'rain', '1h'])
  const rain = typeof rainRaw !== 'undefined' ? `${rainRaw}mm` : ''

  const snowRaw = get(data, ['current', 'snow', '1h'])
  const snow = typeof snowRaw !== 'undefined' ? `${snowRaw}mm` : ''

  const now = get(data, ['current', 'dt'])
  const timestamp = typeof now !== 'undefined' ? formatRelative(now * 1000, new Date(), {locale: dateFnsLocales[locale]}) : ''

  const iconSize = 75

  useEffect(() => {
    setHidden(!data)
  }, [data])

  return (
    <div
      className={styles.card}
      style={{
        opacity: hidden ? 0 : 1
      }}
    >
      <div className={styles.info}>
        <h2
          className={`${styles.position} ${
            get(position, 'isCoords') ? styles.isCoords : ''
          }`}
        >
          {get(position, 'name', '-')}
        </h2>
        <div className={styles.icon}>
          {icon ? (
            <Image
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              width={iconSize}
              height={iconSize}
              alt={description || txt.iconFallbackAlt}
              title={description}
            />
          ) : (
            <div style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
          )}
        </div>
        <strong className={styles.desc}>{description}</strong>
        <strong
          className={styles.val}
          style={{
            color: colors.temp
          }}
        >
          {temp}
        </strong>
        <p className={styles.line}>
          <span className={styles.txt}>{txt.feelsLikeLabel.toLowerCase()}</span>
          <span
            className={styles.val}
            style={{
              color: colors.feels_like
            }}
          >
            {feelsLike}
          </span>
        </p>
        <p className={styles.line}>
          <span className={styles.txt}>{txt.humidityLabel.toLowerCase()}</span>
          <span
            className={styles.val}
            style={{
              color: colors.humidity
            }}
          >
            {hum}
          </span>
        </p>
        <p className={styles.leftLine}>
          <span className={styles.txt}>{txt.wind}</span>
          <span className={styles.val}>{wind}</span>
        </p>
        {rainRaw ? (
          <p className={styles.leftLine}>
            <span className={styles.txt}>{txt.rain}</span>
            <span className={styles.val}>{rain}</span>
          </p>
        ) : null}
        {snowRaw ? (
          <p className={styles.leftLine}>
            <span className={styles.txt}>{txt.snow}</span>
            <span className={styles.val}>{snow}</span>
          </p>
        ) : null}
        <p className={styles.timestamp}>{timestamp}</p>
      </div>
    </div>
  )
}

Weather.propTypes = {
  data: PropTypes.object
}

export default Weather
