import roundCoord from '../util/roundCoord'

export default function getSrcFactory (host, lon, lat, zoom, width, height, token) {
  return (themeName) => {
    return `${host}/styles/v1/mapbox/${themeName}/static/${roundCoord(
      lon
    )},${roundCoord(lat)},${zoom},0/${width}x${height}?access_token=${token}`
  }
}
