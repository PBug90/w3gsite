import request from 'supertest'
import RouterFactory from './index'
import Database from '../../Database'
import express, { Router, RequestHandler } from 'express'
import { Db, ObjectId } from 'mongodb'

const testUser : Express.User = { _id: new ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'), displayName: 'testuser', login: 'testuser', provider: 'test' }
jest.mock('../authentication/Middleware', () => {
  const fn : RequestHandler = (request, reponse, next) => {
    request.user = testUser
    next()
  }
  return fn
})

let router : Router
let db: Db
const app = express()

beforeAll(async () => {
  process.env.MONGO_CONNECTION_STR = process.env.MONGO_URL
  process.env.TWITCH_SECRET = 'sometwitchsecret'
  process.env.TWITCH_CLIENT_ID = 'sometwitchclientid'
  process.env.CALLBACK_URL = '/api/mycallback'
  process.env.SESSION_SECRET = 'somesecret'
  router = RouterFactory()
  app.use(router)
  db = await Database.get()
})

test('can create a feed', async () => {
  const result = await request(app)
    .post('/feed/')
    .send({ name: 'test' })
  expect(result.status).toEqual(200)
})

test('can not create feed with same name twice', async () => {
  await db.collection('feeds').insertOne({ name: 'mytestfeed', owner: 'sampleuser' })
  const result = await request(app)
    .post('/feed/')
    .send({ name: 'mytestfeed', owner: 'somebodyelse' })
  expect(result.status).toEqual(400)
  const feed = await db.collection('feeds').findOne({ name: 'mytestfeed' })
  expect(feed).toEqual({ name: 'mytestfeed', owner: 'sampleuser', _id: expect.anything() })
})

test('can create a private feed', async () => {
  const result = await request(app)
    .post('/feed/')
    .send({ name: 'privatefeed', owner: 'sampleuser', visibility: 'private' })
  expect(result.status).toEqual(200)
  const feed = await db.collection('feeds').findOne({ name: 'privatefeed' })
  expect(feed).toEqual({ name: 'privatefeed', owner: 'sampleuser', _id: expect.anything(), visibility: 'private', _owner: testUser._id })
})

test('private feed can not be viewed by anonymous user', async () => {
  await db.collection('feeds').insertOne({ name: 'privatefeed2', owner: testUser._id, visibility: 'private' })
  const result = await request(app)
    .get('/feed/privatefeed2')
    .send({ feed: 'mytestfeed', owner: 'somebodyelse' })
  expect(result.status).toEqual(401)
})

afterAll(() => {
  Database.close()
})
