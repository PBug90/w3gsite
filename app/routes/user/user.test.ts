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

describe('/user/<username>/feed', () => {
  test('can retrieve feeds of a user by his username', async () => {
    await db.collection('users').insertOne({ username: 'testuser', feeds: [{ name: 'testfeed', visibility: 'PUBLIC' }, { name: 'testfeed2', visibility: 'PUBLIC' }] })
    const result = await request(app)
      .get('/user/testuser/feed')
      .send()
    expect(result.status).toEqual(200)
    expect(result.body).toEqual([
      { name: 'testfeed', visibility: 'PUBLIC' },
      { name: 'testfeed2', visibility: 'PUBLIC' }
    ])
  })

  test('only lists public feeds for an anonymous user', async () => {
    await db.collection('users').insertOne({ username: 'testuser', feeds: [{ name: 'testfeed', visibility: 'PUBLIC' }, { name: 'testfeed2', visibility: 'PRIVATE' }] })
    const result = await request(app)
      .get('/user/testuser/feed')
      .send()
    expect(result.status).toEqual(200)
    expect(result.body).toEqual([
      { name: 'testfeed', visibility: 'PUBLIC' }
    ])
  })

  test.skip('lists all feeds for the feed owner', async () => {
    await db.collection('users').insertOne({
      username: 'testuser',
      feeds: [
        { name: 'testfeed', visibility: 'PUBLIC' },
        { name: 'testfeed2', visibility: 'PRIVATE' },
        { name: 'testfeed2', visibility: 'TWITCH' }
      ]
    })
    const result = await request(app)
      .get('/user/testuser/feed')
      .send()
    expect(result.status).toEqual(200)
    expect(result.body).toEqual([
      { name: 'testfeed', visibility: 'PUBLIC' },
      { name: 'testfeed2', visibility: 'PRIVATE' },
      { name: 'testfeed2', visibility: 'TWITCH' }
    ])
  })
  test.skip('lists public and twitch sub feeds for logged in user that is a twitch sub of the owner', async () => {
    await db.collection('users').insertOne({
      username: 'testuser',
      feeds: [
        { name: 'testfeed', visibility: 'PUBLIC' },
        { name: 'testfeed2', visibility: 'PRIVATE' },
        { name: 'testfeed2', visibility: 'TWITCH' }
      ]
    })
    const result = await request(app)
      .get('/user/testuser/feed')
      .send()
    expect(result.status).toEqual(200)
    expect(result.body).toEqual([
      { name: 'testfeed', visibility: 'PUBLIC' },
      { name: 'testfeed2', visibility: 'TWITCH' }
    ])
  })
})

afterEach(async () => {
  await db.dropCollection('users')
})

afterAll(() => {
  Database.close()
})
