import { createContext } from 'react'

export const themes = {
  light: {
    className: 'theme-light',
    mapBoxTheme: 'light-v10',
    fontColor: 'dimgrey',
    chartGridColor: 'darkgray',
    bg: '#f6f6f4'
  },
  dark: {
    className: 'theme-dark',
    mapBoxTheme: 'dark-v10',
    fontColor: 'aliceblue',
    chartGridColor: 'lightcyan',
    bg: '#343332'
  }
}

export const defaultTheme = 'light'

const ThemeContext = createContext(themes[defaultTheme])

ThemeContext.displayName = 'ThemeContext'

export default ThemeContext
