import request from 'supertest'
import app from '../../Server'
import Database from '../../Database'
import path from 'path'

beforeAll(() => {
  process.env.MONGO_CONNECTION_STR = process.env.MONGO_URL
  process.env.TWITCH_SECRET = 'sometwitchsecret'
  process.env.TWITCH_CLIENT_ID = 'sometwitchclientid'
  process.env.CALLBACK_URL = '/api/mycallback'
  process.env.SESSION_SECRET = 'somesecret'
})

test('returns 404 status code', async () => {
  const result = await request(app).get('/api/replays/')
  expect(result.body).toEqual({ error: 'not found' })
  expect(result.status).toEqual(404)
})

test('can get a list of replays', async () => {
  const result = await request(app).get('/api/replay/')
  expect(result.body).toEqual([])
  expect(result.status).toEqual(200)
})

test('can upload a replay file', async () => {
  const result = await request(app)
    .post('/api/replay/')
    .attach('replay', path.resolve(__dirname, 'example.w3g'))
  expect(result.body.buildNumber).toEqual(6091)
  expect(result.status).toEqual(200)
})

test('can download an existing replay file', async () => {
  const result = await request(app)
    .post('/api/replay/')
    .attach('replay', path.resolve(__dirname, 'example.w3g'))
  expect(result.body._id).toBeTruthy()
  const download = await request(app).get(`/api/replay/${result.body._id}/download`)
  expect(download.status).toBe(200)
  expect(download.header['content-length']).toBe('42119')
  expect(download.header['content-disposition']).toBe('attachment; filename=replay.w3g')
})

afterAll(() => {
  Database.close()
})
