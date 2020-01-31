import request from 'supertest'
import app from '../../Server'

test('returns 404 status code', async () => {
  const result = await request(app).get('/api/replays/')
  expect(result.body).toEqual({ error: 'not found' })
  expect(result.status).toEqual(404)
})
