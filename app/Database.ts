import { MongoClient, Db } from 'mongodb'

export interface Database {
  connect(): Promise<Db> ;
  get(): Promise<Db>;
  close():Promise<void>;
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
  if (instance && instance.isConnected()) {
    return dbInstance
  }
  return connect()
}

const close = async ():Promise<void> => {
  if (instance && instance.isConnected()) {
    return instance.close(true)
  }
}

const db : Database = {
  connect,
  get,
  close
}

export default db
