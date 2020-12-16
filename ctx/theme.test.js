import { themes, defaultTheme } from './theme'

test('All themes declare all theme props', () => {
  for (const themeName in themes) {
    for (const key in themes[defaultTheme]) {
      if (themeName !== defaultTheme) {
        expect(themes[themeName]).toHaveProperty(key)
      }
    }
  }
})
