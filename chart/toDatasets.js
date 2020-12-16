import { useContext } from 'react'

import getDays from '../chart/getDays'
import toChartData from '../chart/toChartData'
import { colors } from '../config'
import LocaleContext from '../ctx/locale'
import texts from '../texts'

export default function toDatasets (graphData, locale, theme) {
  const txt = texts[locale]
  const datasets = [{
    label: txt.daysLabel,
    type: 'bar',
    data: getDays(graphData),
    barThickness: 3,
    backgroundColor: theme.fontColor,
    xAxisID: 'days-axis',
    yAxisID: 'percent-axis',
    order: 1
  }]
  if (graphData.forecast[0].temp) {
    datasets.push({
      label: txt.tempLabel,
      data: toChartData(graphData, 'temp'),
      fill: false,
      backgroundColor: colors.temp,
      borderColor: colors.temp,
      xAxisID: 'time-axis',
      yAxisID: 'temp-axis'
    })
  }
  if (graphData.forecast[0].feels_like) {
    datasets.push({
      label: txt.feelsLikeLabel,
      data: toChartData(graphData, 'feels_like'),
      fill: false,
      backgroundColor: colors.feels_like,
      borderColor: colors.feels_like,
      xAxisID: 'time-axis',
      yAxisID: 'temp-axis'
    })
  }
  if (graphData.forecast[0].minTemp) {
    datasets.push({
      label: txt.minTempLabel,
      data: toChartData(graphData, 'minTemp'),
      fill: false,
      backgroundColor: colors.minTemp,
      borderColor: colors.minTemp,
      xAxisID: 'time-axis',
      yAxisID: 'temp-axis'
    })
  }
  if (graphData.forecast[0].maxTemp) {
    datasets.push({
      label: txt.maxTempLabel,
      data: toChartData(graphData, 'maxTemp'),
      fill: false,
      backgroundColor: colors.maxTemp,
      borderColor: colors.maxTemp,
      xAxisID: 'time-axis',
      yAxisID: 'temp-axis'
    })
  }
  if (graphData.forecast[0].pop) {
    datasets.push({
      label: txt.popLabel,
      data: toChartData(graphData, 'pop'),
      fill: false,
      backgroundColor: colors.pop,
      borderColor: colors.pop,
      xAxisID: 'time-axis',
      yAxisID: 'percent-axis'
    })
  }
  if (graphData.forecast[0].humidity) {
    datasets.push({
      label: txt.humidityLabel,
      data: toChartData(graphData, 'humidity'),
      fill: false,
      backgroundColor: colors.humidity,
      borderColor: colors.humidity,
      xAxisID: 'time-axis',
      yAxisID: 'percent-axis'
    })
  }
  return datasets
}
