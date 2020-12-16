import clone from 'lodash.clone'
import { themes, defaultTheme } from './theme'

describe('theme context', () => {
  it('all themes declare all theme props', () => {
    expect.hasAssertions()
    const nonDefaultThemes = clone(themes)
    delete nonDefaultThemes[defaultTheme]
    for (const themeName in themes) {
      for (const key in themes[defaultTheme]) {
        expect(themes[themeName]).toHaveProperty(key)
      }
    }
  })
})
