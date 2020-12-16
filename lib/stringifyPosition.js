export default function stringifyPosition (position, replacer, space) {
  if (position === null) {
    return null
  }
  return JSON.stringify({
    name: position.name, // not standard
    timestamp: position.timestamp,
    coords: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      altitude: position.coords.altitude,
      accuracy: position.coords.accuracy,
      altitudeAccuracy: position.coords.altitudeAccuracy,
      heading: position.coords.heading,
      speed: position.coords.speed
    }
  },replacer, space)
}
