import { useState, useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Chart, registerables } from 'chart.js'
import 'chartjs-adapter-date-fns'

import toDatasets from '../chart/toDatasets'
import makeOptions from '../chart/chartOptions'
import styles from '../styles/Forecast.module.css'
import LocaleContext from '../ctx/locale'
import ThemeContext from '../ctx/theme'

function Forecast ({ data, toGraphData, showTimes, name }) {
  const chart = useRef(null)
  const canvas = useRef(null)
  const locale = useContext(LocaleContext)
  const theme = useContext(ThemeContext)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    Chart.register(...registerables)
  }, [])

  useEffect(() => {
    if (chart.current) {
      chart.current.update()
    }
  }, [locale])

  useEffect(() => {
    if (data) {
      const graphData = toGraphData(data)
      if (chart.current) {
        chart.current.destroy()
      }
      const chartConfig = {
        type: 'line',
        data: {
          datasets: toDatasets(graphData, locale, theme)
        },
        options: makeOptions(locale, theme, showTimes)
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
      className={`${styles.forecast} ${styles[theme.className]}`}
      style={{
        opacity: hidden ? 0 : 1,
        backgroundColor: theme.bg
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
