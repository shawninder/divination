import clone from 'lodash.clone'
import nextConfig  from './next.config'
import texts from './texts'

describe('texts and translations', () => {
  it('all texts are translated in all available languages', () => {
    expect.hasAssertions()
    const nonDefaultLocales = clone(texts)
    delete nonDefaultLocales[nextConfig.i18n.defaultLocale]
    for (const prop in texts[nextConfig.i18n.defaultLocale]) {
      for (const lang in nonDefaultLocales) {
        expect(texts[lang]).toHaveProperty(prop)
      }
    }
  })

  it('all declared locales have translations', () => {
    expect.hasAssertions()
    nextConfig.i18n.locales.forEach((locale) => {
      expect(texts).toHaveProperty(locale)
    })
  })
})
