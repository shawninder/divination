import toMs from '../util/toMs'

export default function getBounds (graphData) {
  const {forecast} = graphData
  return {
    start: toMs(forecast[0].dt),
    end: toMs(forecast[forecast.length - 1].dt)
  }
}
