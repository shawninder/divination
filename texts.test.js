import nextConfig  from './next.config'
import texts from './texts'

test('All texts are translated in all available languages', () => {
  for (const prop in texts[nextConfig.i18n.defaultLocale]) {
    for (const lang in texts) {
      if (lang !== nextConfig.i18n.defaultLocale) {
        expect(texts[lang]).toHaveProperty(prop)
      }
    }
  }
})

test('All declared locales have translations', () => {
  nextConfig.i18n.locales.forEach((locale) => {
    expect(texts).toHaveProperty(locale)
  })
})
