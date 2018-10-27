process.env.JWT_SECRET = 'a secret';

const request = require('supertest');
const app = require('../index');
const db = require('../db');
const {MongoClient} = require('mongodb');
const {initDatabase} = require('../jest/testhelper');
let connection;
let dbInstance;

beforeAll(async () => {
  connection = await MongoClient.connect(
    global.__MONGO_URI__,
    {useNewUrlParser: true}
  );
  dbInstance = await connection.db(global.__MONGO_DB_NAME__);
  db.get = jest.fn().mockReturnValue(dbInstance);
  await initDatabase(dbInstance);
});

describe('Test user routes', () => {
  describe('POST /user/login', () => {
    it('returns 401 if login credentials are invalid', (done) => {
      const username = 'testusername';
      const password = 'p4ss';
      request(app)
        .post('/api/user/login')
        .send({username, password})
        .then((response) => {
          expect(response.statusCode).toBe(401);
          done();
        });
    });

    it('returns 200 if login credentials are valid', (done) => {
      const username = 'testuser';
      const password = 'p4ss';
      request(app)
        .post('/api/user/login')
        .send({username, password})
        .then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });
});

afterAll(async () => {
  await connection.close();
});
