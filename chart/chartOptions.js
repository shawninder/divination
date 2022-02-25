import generateLabels from '../chart/generateLabels'
import { colors } from '../config'

import dateFnsLocales from '../lib/dateFnsLocales'

export default function makeOptions (locale, theme, showTimes) {
  const timeAxis = {
    axis: 'x',
    type: 'time',
    time: {
      displayFormats: {
        hour: 'H:mm'
      },
      unit: 'hour',
      round: true
    },
    ticks: {
      display: showTimes,
      color: theme.fontColor
    }
  }
  const daysAxis = {
    axis: 'x',
    type: 'time',
    adapters: {
      date: {
        locale: dateFnsLocales[locale]
      }
    },
    position: 'top',
    time: {
      displayFormats: {
        day: 'EEE'
      },
      unit: 'day'
    },
    ticks: {
      color: theme.fontColor
    }
  }
  const tempAxis = {
    axis: 'y',
    type: 'linear',
    title: {
      display: true,
      text: 'ºC',
      color: colors.temp
    },
    ticks: {
      callback: Math.round,
      color: colors.temp
    }
  }
  const percentAxis = {
    axis: 'y',
    type: 'linear',
    position: 'right',
    title: {
      display: true,
      text: '%',
      color: colors.pop
    },
    ticks: {
      callback: Math.round,
      color: colors.pop
    }
  }
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
    locale,
    grid: {
      display: false
    },
    scales: {
      timeAxis,
      daysAxis,
      tempAxis,
      percentAxis
    }
  }
}
