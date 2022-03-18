import { useState, useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Chart, registerables } from 'chart.js'
import 'chartjs-adapter-date-fns'

import toDatasets from '../chart/toDatasets'
import makeOptions from '../chart/chartOptions'
import styles from '../styles/Forecast.module.css'
import LocaleContext from '../ctx/locale'
import getBounds from '../chart/getBounds'

function Forecast ({ data, toGraphData, showTimes, name }) {
  const chart = useRef(null)
  const canvas = useRef(null)
  const locale = useContext(LocaleContext)
  const [theme, setTheme] = useState(null)
  const [hidden, setHidden] = useState(true)

  function getTheme() {
    const docStyles = window.getComputedStyle(window.document.documentElement)
    return {
      textColor: docStyles.getPropertyValue('--text-color'),
      linkColor: docStyles.getPropertyValue('--link-color'),
      bgImg: docStyles.getPropertyValue('--bg-img'),
      themeColor: docStyles.getPropertyValue('--theme-color'),
      forecastBg: docStyles.getPropertyValue('--forecast-bg'),
      chartTextColor: docStyles.getPropertyValue('--chart-text-color'),
      chartGridColor: docStyles.getPropertyValue('--chart-grid-color')
    }
  }

  function onThemeChange () {
    setTheme(getTheme())
  }

  useEffect(() => {
    onThemeChange()
    const matched = window.matchMedia('(prefers-color-scheme: dark)')
    matched.addEventListener('change', onThemeChange)
    return () => {
      matched.removeEventListener('change', onThemeChange)
    }
  }, [])

  useEffect(() => {
    Chart.register(...registerables)
  }, [])

  useEffect(() => {
    if (chart.current) {
      chart.current.update()
    }
  }, [locale])

  useEffect(() => {
    if (data && theme) {
      const graphData = toGraphData(data)
      if (chart.current) {
        chart.current.destroy()
      }
      const bounds = getBounds(graphData)
      const chartConfig = {
        type: 'line',
        data: {
          datasets: toDatasets(graphData, locale)
        },
        options: makeOptions(locale, theme, showTimes, bounds)
      }

      chart.current = new Chart(canvas.current, chartConfig)

      setHidden(false)
    } else {
      setHidden(true)
    }
  }, [data, theme])

  return (
    <div
      key={name}
      className={styles.forecast}
      style={{
        opacity: hidden ? 0 : 1
      }}
    >
      <canvas ref={canvas} />
    </div>
  )
}

Forecast.propTypes = {
  data: PropTypes.shape({
    hourly: PropTypes.arrayOf(
      PropTypes.shape({
        dt: PropTypes.number.isRequired,
        temp: PropTypes.number.isRequired,
        humidity: PropTypes.number.isRequired,
        pop: PropTypes.number.isRequired,
        wind_speed: PropTypes.number.isRequired,
        feels_like: PropTypes.number.isRequired,
        icon: PropTypes.string
      })
    )
  }),
  toGraphData: PropTypes.func.isRequired,
  showTimes: PropTypes.bool,
  name: PropTypes.string.isRequired
}

export default Forecast
