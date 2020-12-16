import generateLabels from '../chart/generateLabels'
import { colors } from '../config'

export default function makeOptions (locale, theme, showTimes) {
  const xAxes = [{
    id: 'time-axis',
    type: 'time',
    gridLines: {
      display: false
    },
    bounds: 'data',
    time: {
      displayFormats: {
        hour: 'H[:00]'
      },
      unit: 'hour',
      round: true
    },
    ticks: {
      display: showTimes,
      fontColor: theme.fontColor
    }
  }, {
    id: 'days-axis',
    type: 'time',
    gridLines: {
      display: false
    },
    bounds: 'data',
    position: 'top',
    time: {
      displayFormats: {
        day: 'ddd'
      },
      unit: 'day'
    },
    ticks: {
      fontColor: theme.fontColor
    }
  }]
  return {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top',
      labels: {
        generateLabels: (chart) => {
          return generateLabels(chart, locale)
        },
        usePointStyle: true,
        fontColor: theme.fontColor
      }
    },
    scales: {
      xAxes,
      yAxes: [{
        id: 'temp-axis',
        type: 'linear',
        gridLines: {
          display: false
        },
        scaleLabel: {
          display: true,
          labelString: 'ºC',
          fontColor: colors.temp
        },
        ticks: {
          callback: (tick) => {
            return Math.round(tick)
          },
          fontColor: colors.temp
        }
      }, {
        id: 'percent-axis',
        type: 'linear',
        gridLines: {
          display: false
        },
        position: 'right',
        scaleLabel: {
          display: true,
          labelString: '%',
          fontColor: colors.pop
        },
        ticks: {
          fontColor: colors.pop
        }
      }]
    }
  }
}
