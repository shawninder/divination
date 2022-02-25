const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})
const customJestConfig = {
  testPathIgnorePatterns: [
    '/.next/',
    '/node_modules/',
    '/tests/',
    '/coverage/'
  ]
}
module.exports = createJestConfig(customJestConfig)
