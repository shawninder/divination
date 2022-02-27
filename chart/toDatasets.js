import toChartData from '../chart/toChartData'
import { colors } from '../config'
import texts from '../texts'

export default function toDatasets (graphData, locale) {
  const txt = texts[locale]
  const datasets = []
  if (typeof graphData.forecast[0].temp !== 'undefined') {
    datasets.push({
      label: txt.tempLabel,
      data: toChartData(graphData, 'temp'),
      backgroundColor: colors.temp,
      borderColor: colors.temp,
      xAxisID: 'timeAxis',
      yAxisID: 'tempAxis'
    })
  }
  if (typeof graphData.forecast[0].feels_like !== 'undefined') {
    datasets.push({
      label: txt.feelsLikeLabel,
      data: toChartData(graphData, 'feels_like'),
      backgroundColor: colors.feels_like,
      borderColor: colors.feels_like,
      xAxisID: 'timeAxis',
      yAxisID: 'tempAxis'
    })
  }
  if (typeof graphData.forecast[0].minTemp !== 'undefined') {
    datasets.push({
      label: txt.minTempLabel,
      data: toChartData(graphData, 'minTemp'),
      backgroundColor: colors.minTemp,
      borderColor: colors.minTemp,
      xAxisID: 'timeAxis',
      yAxisID: 'tempAxis'
    })
  }
  if (typeof graphData.forecast[0].maxTemp !== 'undefined') {
    datasets.push({
      label: txt.maxTempLabel,
      data: toChartData(graphData, 'maxTemp'),
      backgroundColor: colors.maxTemp,
      borderColor: colors.maxTemp,
      xAxisID: 'timeAxis',
      yAxisID: 'tempAxis'
    })
  }
  if (typeof graphData.forecast[0].pop !== 'undefined') {
    datasets.push({
      label: txt.popLabel,
      data: toChartData(graphData, 'pop'),
      backgroundColor: colors.pop,
      borderColor: colors.pop,
      xAxisID: 'timeAxis',
      yAxisID: 'percentAxis'
    })
  }
  if (typeof graphData.forecast[0].humidity !== 'undefined') {
    datasets.push({
      label: txt.humidityLabel,
      data: toChartData(graphData, 'humidity'),
      backgroundColor: colors.humidity,
      borderColor: colors.humidity,
      xAxisID: 'timeAxis',
      yAxisID: 'percentAxis'
    })
  }
  return datasets
}
