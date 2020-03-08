import request from 'supertest'
import RouterFactory from './index'
import Database from '../../Database'
import express, { Router } from 'express'
import { Db } from 'mongodb'
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
    .send({ feed: 'test' })
  expect(result.status).toEqual(200)
})

test('can not create feed with same name twice', async () => {
  await db.collection('feeds').insertOne({ name: 'mytestfeed', owner: 'sampleuser' })
  const result = await request(app)
    .post('/feed/')
    .send({ feed: 'mytestfeed', owner: 'somebodyelse' })
  expect(result.status).toEqual(400)
  const feed = await db.collection('feeds').findOne({ name: 'mytestfeed' })
  expect(feed).toEqual({ name: 'mytestfeed', owner: 'sampleuser', _id: expect.anything() })
})

afterAll(() => {
  Database.close()
})
