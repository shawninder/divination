import roundCoord from './util/roundCoord'

export function position (pos) {
  return pos.name || `lat ${roundCoord(pos.coords.latitude)} lon ${roundCoord(pos.coords.longitude)}`
}

const texts = {
  en: {
    appTitle: 'Divination',
    desc: 'Get the weather for any city in the World!',
    daysLabel: 'Days',
    tempLabel: 'Temperature',
    minTempLabel: 'Low',
    maxTempLabel: 'High',
    feelsLikeLabel: 'Feels Like',
    humidityLabel: 'Humidity',
    popLabel: 'Probability of precipitation',
    findCity: 'Find a city.',
    getWeather: 'OK',
    or: 'Or',
    useLocation: 'use your current location',
    feelsLikeSpan: 'feels like',
    iconFallbackAlt: 'No weather info',
    darkMode: 'Dark Mode',
    worldMap: 'Map of the World',
    worldComment: 'Beautiful',
    wind: 'wind',
    rain: 'rain',
    snow: 'snow',
    bannerAlt: 'The Moon',
    dismiss: 'dismiss',
    position
  },
  fr: {
    appTitle: 'Divination',
    desc: 'Trouvez la météo, où que vous soyez!',
    daysLabel: 'Jours',
    tempLabel: 'Température',
    minTempLabel: 'Minimum',
    maxTempLabel: 'Maximum',
    feelsLikeLabel: 'Ressenti',
    humidityLabel: 'Humidité',
    popLabel: 'Probabilité de précipitation',
    findCity: 'Trouver une ville',
    getWeather: 'OK',
    or: 'Ou',
    useLocation: 'utilisez votre position actuelle',
    feelsLikeSpan: 'Ressenti',
    iconFallbackAlt: 'Aucune info météo',
    darkMode: 'Mode Sombre',
    worldMap: 'Carte du Monde',
    worldComment: 'Magnifique',
    wind: 'vent',
    rain: 'pluie',
    snow: 'neige',
    bannerAlt: 'La Lune',
    dismiss: 'fermer',
    position
  }
}

export default texts
