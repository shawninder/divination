import fs from 'fs'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

const NEWLINES_MATCH = /\n|\r|\r\n/g

describe('environment variables', () => {
  it('can load .env.local', async () => {
    expect.assertions(1)
    const [local, example] = await Promise.all([
      await readFile('./.env.local'),
      await readFile('./.env.local.example')
    ])
    const localEnv = local.toString()
    const exampleEnv = example.toString()
    expect(localEnv.match(NEWLINES_MATCH)).toHaveLength(
      exampleEnv.match(NEWLINES_MATCH).length
    )
  })
})
