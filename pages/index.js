import { useEffect, useState, createContext } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import Location from '../components/Location'
import Weather from '../components/Weather'
import Forecast from '../components/Forecast'
import Map from '../components/Map'
import toGraphData from '../chart/toGraphData'
import toWeekGraphData from '../chart/toWeekGraphData'
import getWeather from '../lib/getWeather'
import usePosition from '../use/position'
import styles from '../styles/Home.module.css'
import ThemeContext, { themes } from '../ctx/theme'
import LocaleContext from '../ctx/locale'
import texts from '../texts'
import { maxWidth } from '../config'
import pkg from '../package.json'

const NAMESPACE = pkg.name
const THEME = `${NAMESPACE}--theme`

function Home () {
  const { locale, locales } = useRouter()
  const [position, setPosition] = useState(null)
  const { setPos, requestLocation } = usePosition(setPosition)
  const [weather, setWeather] = useState(null)
  const [theme, setTheme] = useState(themes.light)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME)
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme))
    }
  }, [])

  const txt = texts[locale]

  useEffect(async () => {
    if (position) {
      setWeather(await getWeather(position, locale))
    } else {
      setWeather(null)
    }
  }, [position, locale])

  function clear () {
    setWeather(null)
    setPos(null)
  }

  function toggleDarkMode (event) {
    const wantedTheme = event.target.checked ? themes.dark : themes.light
    setTheme(wantedTheme)
    window.localStorage.setItem(THEME, JSON.stringify(wantedTheme))
  }

  return (
    <LocaleContext.Provider value={locale}>
      <ThemeContext.Provider value={theme}>
        <div className={`${styles.frame} ${styles[theme.className]}`}>
          <div
            className={styles.container}
            style={{
              maxWidth: `${maxWidth}px`
            }}
          >
            <Head>
              <title>{txt.appTitle}</title>
              <link rel='apple-touch-icon' sizes='120x120' href='/apple-touch-icon.png' />
              <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
              <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
              <link rel='manifest' href='/site.webmanifest' />
              <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
              <meta name='msapplication-TileColor' content={theme.bg} />
              <meta name='theme-color' content={theme.bg} />
            </Head>

            <main className={styles.main}>
              <h1>{txt.appTitle}</h1>
              <section name='options'>
                <label>
                  <input
                    type='checkbox'
                    onClick={toggleDarkMode}
                    defaultChecked={theme.className === 'theme-light' ? false : true}
                  />
                {txt.darkMode}
                </label>
              </section>
              <section name='langs'>
                {locales.reduce((others, item) => {
                  if (item !== locale) {
                    others.push(
                      <Link key={item} href='/' locale={item}>
                        <a>{item}</a>
                      </Link>
                    )
                  }
                  return others
                }, [])}
              </section>
              <section name='location'>
                <Location position={position} setPos={setPos} requestLocation={requestLocation} />
              </section>
              <section name='map'>
                <Map position={position} />
              </section>
              <section name='weather'>
                <Weather data={weather} position={position} />
              </section>
              <section name='forecast'>
                <Forecast name='forecastChart' data={weather} toGraphData={toGraphData} showTimes />
              </section>
              {weather
                ? (
                  <h3>7-day forecast</h3>
                ) : null
              }
              <section name='weekForecast'>
                <Forecast name='weekForecastChart' data={weather} toGraphData={toWeekGraphData} />
              </section>
            </main>
          </div>
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  )
}

export default Home
