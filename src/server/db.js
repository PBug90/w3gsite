const {MongoClient, GridFSBucket} = require('mongodb');
let dbInstance = null;
let client = null;
let bucketInstance = null;

module.exports = {
  connect: () => {
    if (!client || client.isConnected() === false) {
      return MongoClient.connect(
        process.env.MONGODB_CONNECTION_STRING,
        {useNewUrlParser: true}
      ).then((localClient) => {
        console.log('Connected to MongoDB successfully.');
        dbInstance = localClient.db();
        client = localClient;
        bucketInstance = new GridFSBucket(dbInstance);
        return dbInstance;
      });
    }
    return Promise.resolve(dbInstance);
  },
  get: () => dbInstance,
  getBucket: () => bucketInstance,
  close: () => client.close()
};
