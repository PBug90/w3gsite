import { MongoClient, Db } from 'mongodb'

interface Database {
  connect(): Promise<Db> ;
  get(): Promise<Db>;
}

let instance: MongoClient
let dbInstance: Db

const connect = async (): Promise<Db> => {
  if (instance === undefined) {
    instance = await MongoClient.connect(process.env.MONGO_CONNECTION_STR || 'mongodb://localhost:27017/w3g', { useUnifiedTopology: true })
    dbInstance = instance.db()
  }
  return dbInstance
}

const get = async (): Promise<Db> => {
  if (instance.isConnected()) {
    return dbInstance
  }
  return connect()
}

const db : Database = {
  connect,
  get
}

export default db
