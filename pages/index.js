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
import BusyContext from '../ctx/busy'
import LocaleContext from '../ctx/locale'
import PositionContext from '../ctx/position'
import texts from '../texts'
import { maxWidth } from '../config'

function Home () {
  const { locale, locales } = useRouter()
  const [weather, setWeather] = useState(null)
  const [working, setWorking] = useState(false)

  const { position, requestLocation, findCity, err, clearErr } = usePosition(locale, setWorking)
  const txt = texts[locale]

  useEffect(async () => {
    if (position) {
      setWeather(await getWeather(position, locale))
    } else {
      setWeather(null)
    }
  }, [position, locale])

  return (
    <BusyContext.Provider value={[working, setWorking]}>
      <PositionContext.Provider
        value={{ position, requestLocation, findCity, err, clearErr }}
      >
        <LocaleContext.Provider value={locale}>
          <div className={styles.frame}>
            <div
              className={styles.container}
              style={{
                maxWidth: `${maxWidth}px`
              }}
            >
              <Head>
                <meta charSet='utf-8' />
                <title>{txt.appTitle}</title>
                <meta name='color-scheme' content='light dark' />
                <link
                  rel='apple-touch-icon'
                  sizes='120x120'
                  href='/apple-touch-icon.png'
                />
                <link
                  rel='icon'
                  type='image/png'
                  sizes='32x32'
                  href='/favicon-32x32.png'
                />
                <link
                  rel='icon'
                  type='image/png'
                  sizes='16x16'
                  href='/favicon-16x16.png'
                />
                <link rel='manifest' href='/site.webmanifest' />
                <link
                  rel='mask-icon'
                  href='/safari-pinned-tab.svg'
                  color='#5bbad5'
                />
                <meta
                  name='msapplication-TileColor'
                  content='var(--theme-color)'
                />
                <meta name='theme-color' content='var(--theme-color)' />
                <meta name='title' content='Divination' />
                <meta name='description' content={txt.desc} />
                <meta
                  name='author'
                  content='Shawn Inder <shawninder@gmail.com>'
                />

                <meta property='og:type' content='website' />
                <meta
                  property='og:url'
                  content='https://divination.vercel.app'
                />
                <meta property='og:title' content={txt.appTitle} />
                <meta property='og:description' content={txt.desc} />
                <meta property='og:image' content='/banner.png' />
                <meta property='og:image:alt' content={txt.bannerAlt} />

                <meta property='twitter:card' content='summary_large_image' />
                <meta
                  property='twitter:url'
                  content='https://divination.vercel.app'
                />
                <meta property='twitter:title' content={txt.appTitle} />
                <meta property='twitter:description' content={txt.desc} />
                <meta property='twitter:image' content='/banner.png?v=2' />
              </Head>

              <main className={styles.main}>
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
                  <Location />
                </div>
                <div className={styles.map}>
                  <Map />
                </div>
                <div className={styles.weather}>
                  <Weather data={weather} />
                </div>
                <div className={styles.forecast}>
                  <Forecast
                    name='forecastChart'
                    data={weather}
                    toGraphData={toGraphData}
                    showTimes
                  />
                </div>
                {weather ? <h3>{txt.weekForecastLabel}</h3> : null}
                <div className={styles.weekForecast}>
                  <Forecast
                    name='weekForecastChart'
                    data={weather}
                    toGraphData={toWeekGraphData}
                  />
                </div>
              </main>
            </div>
          </div>
        </LocaleContext.Provider>
      </PositionContext.Provider>
    </BusyContext.Provider>
  )
}

export default Home
