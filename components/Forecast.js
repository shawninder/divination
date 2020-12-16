import { useState, useRef, useEffect, useContext } from 'react'
import Chart from 'chart.js'
import moment from 'moment'

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
    moment.locale(locale)
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
      chart.current = new Chart(canvas.current.getContext('2d'), {
        type: 'line',
        data: {
          datasets: toDatasets(graphData, locale, theme)
        },
        options: makeOptions(locale, theme, showTimes)
      })
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

export default Forecast
