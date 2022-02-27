import { colors } from '../config'

import dateFnsLocales from '../lib/dateFnsLocales'

export default function makeOptions (locale, theme, showTimes, bounds) {
  const timeAxis = {
    axis: 'x',
    type: 'time',
    bounds: 'data',
    time: {
      displayFormats: {
        hour: 'H:mm'
      },
      unit: 'hour'
    },
    ticks: {
      display: showTimes,
      color: theme.fontColor
    },
    adapters: {
      date: {
        locale: dateFnsLocales[locale]
      }
    },
    grid: {
      color: theme.chartGridColor
    }
  }
  const daysAxis = {
    axis: 'x',
    type: 'time',
    min: bounds.start,
    max: bounds.end,
    time: {
      displayFormats: {
        day: 'EEE'
      },
      unit: 'day'
    },
    ticks: {
      color: theme.fontColor
    },
    adapters: {
      date: {
        locale: dateFnsLocales[locale]
      }
    },
    position: 'top',
    grid: {
      color: theme.fontColor,
      lineWidth: 3
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
    },
    grid: {
      display: false
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
    },
    grid: {
      display: false
    }
  }
  return {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    locale,
    scales: {
      timeAxis,
      daysAxis,
      tempAxis,
      percentAxis
    },
    parsing: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: theme.fontColor
        }
      }
    }
  }
}
