import { useEffect, useState } from 'react'
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
              <meta charSet='utf-8' />
              <title>{txt.appTitle}</title>
              <link rel='apple-touch-icon' sizes='120x120' href='/apple-touch-icon.png' />
              <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
              <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
              <link rel='manifest' href='/site.webmanifest' />
              <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
              <meta name='msapplication-TileColor' content={theme.bg} />
              <meta name='theme-color' content={theme.bg} />
              <meta name='title' content='Divination' />
              <meta name='description' content={txt.desc} />
              <meta name='author' content='Shawn Inder <shawninder@gmail.com>' />

              <meta property='og:type' content='website' />
              <meta property='og:url' content="https://divination.vercel.app" />
              <meta property='og:title' content={txt.appTitle} />
              <meta property='og:description' content={txt.desc} />
              <meta property='og:image' content='/banner.png' />
              <meta property='og:image:alt' content={txt.bannerAlt} />

              <meta property='twitter:card' content='summary_large_image' />
              <meta property='twitter:url' content="https://divination.vercel.app" />
              <meta property='twitter:title' content={txt.appTitle} />
              <meta property='twitter:description' content={txt.desc} />
              <meta property='twitter:image' content='/banner.png?' />
            </Head>

            <main className={styles.main}>
              <h1>{txt.appTitle}</h1>
              <div className={styles.options}>
                <label>
                  <input
                    type='checkbox'
                    onClick={toggleDarkMode}
                    defaultChecked={theme.className === 'theme-light' ? false : true}
                  />
                {txt.darkMode}
                </label>
              </div>
              <div className={styles.langs}>
                {locales.reduce((others, item) => {
                  if (item !== locale) {
                    others.push(
                      <Link key={item} href='/' locale={item}>
                        <a href='/'>{item}</a>
                      </Link>
                    )
                  }
                  return others
                }, [])}
              </div>
              <div className={styles.location}>
                <Location position={position} setPos={setPos} requestLocation={requestLocation} />
              </div>
              <div className={styles.map}>
                <Map position={position} />
              </div>
              <div className={styles.weather}>
                <Weather data={weather} position={position} />
              </div>
              <div className={styles.forecast}>
                <Forecast name='forecastChart' data={weather} toGraphData={toGraphData} showTimes />
              </div>
              {weather
                ? (
                  <h3>7-day forecast</h3>
                ) : null
              }
              <div className={styles.weekForecast}>
                <Forecast name='weekForecastChart' data={weather} toGraphData={toWeekGraphData} />
              </div>
            </main>
          </div>
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  )
}

export default Home
