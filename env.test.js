import fs from 'fs'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

const NEWLINES_MATCH = /\n|\r|\r\n/g

describe('Environment variables', () => {
  let localEnv, exampleEnv
  beforeAll(async () => {
    return Promise.all([
      await readFile('./.env.local'),
      await readFile('./.env.local.example')
    ])
      .then(([ local, example ]) => {
        localEnv = local.toString()
        exampleEnv = example.toString()
      })
  })

  test('can load .env.local', () => {
    expect(localEnv.match(NEWLINES_MATCH).length).toBe(exampleEnv.match(NEWLINES_MATCH).length)
  })
})
