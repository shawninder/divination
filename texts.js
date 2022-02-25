import roundCoord from './util/roundCoord'

export function position (pos) {
  return pos.name || `lat ${roundCoord(pos.coords.latitude)} lon ${roundCoord(pos.coords.longitude)}`
}

const texts = {
  en: {
    appTitle: 'Divination',
    bannerAlt: 'The Moon',
    darkMode: 'Dark Mode',
    daysLabel: 'Days',
    desc: 'Get the weather for any city in the World!',
    dismiss: 'dismiss',
    feelsLikeLabel: 'Feels Like',
    findCity: 'Find a city.',
    getWeather: 'OK',
    humidityLabel: 'Humidity',
    iconFallbackAlt: 'No weather info',
    maxTempLabel: 'High',
    minTempLabel: 'Low',
    or: 'Or',
    popLabel: 'Probability of precipitation',
    position,
    rain: 'rain',
    snow: 'snow',
    tempLabel: 'Temperature',
    useLocation: 'use your current location',
    weekForecastLabel: '7-day forecast',
    wind: 'wind',
    worldComment: 'Beautiful',
    worldMap: 'Map of the World'
  },
  fr: {
    appTitle: 'Divination',
    bannerAlt: 'La Lune',
    darkMode: 'Mode Sombre',
    daysLabel: 'Jours',
    desc: 'Trouvez la météo, où que vous soyez!',
    dismiss: 'fermer',
    feelsLikeLabel: 'Ressenti',
    findCity: 'Trouver une ville',
    getWeather: 'OK',
    humidityLabel: 'Humidité',
    iconFallbackAlt: 'Aucune info météo',
    maxTempLabel: 'Maximum',
    minTempLabel: 'Minimum',
    or: 'Ou',
    popLabel: 'Probabilité de précipitation',
    position,
    rain: 'pluie',
    snow: 'neige',
    tempLabel: 'Température',
    useLocation: 'utilisez votre position actuelle',
    weekForecastLabel: 'Prévisions sur 7 jours',
    wind: 'vent',
    worldComment: 'Magnifique',
    worldMap: 'Carte du Monde'
  }
}

export default texts
