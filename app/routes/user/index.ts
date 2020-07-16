import express, { Router } from 'express'
import Database from '../../Database'
import bodyParser from 'body-parser'
import AuthMiddleware from '../authentication/Middleware'
import { MulterRequest } from '../types'
import { parseAndInsertFromBuffer } from '../../database/Replay'
import { replayUpload as ReplayUploadMiddleware } from '../Middlewares'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum VisibilityType {
  PRIVATE,
  PUBLIC,
  TWITCH_SUB
}

interface Feed {
  visibility: string;
  name: string;
}

export default function RouteFactory () : Router {
  const router = express.Router()
  router.use(bodyParser.json())

  router.get('/user/:username/feed', async (request, response) => {
    try {
      const db = await Database.get()
      const result = await db.collection('users').find({ username: request.params.username }, { projection: { feeds: 1 } }).toArray()
      if (result.length > 0) {
        return response.json(result[0].feeds.filter((feed: Feed) => feed.visibility === 'PUBLIC'))
      }
      return response.status(404).json({ error: true, message: 'Feed not found.' })
    } catch (err) {
      console.error(err)
    }
    return response.status(500).json({ error: true, message: 'Could not retrieve feed' })
  })

  router.post('/user/:username/feed', AuthMiddleware, async (request, response) => {
    if (request.user?.login !== request.params.username) {
      return response.json({ error: true, message: 'Unauthorized' }).status(401)
    }
    try {
      const db = await Database.get()
      const result = await db.collection('feeds').findOneAndUpdate(
        { name: request.body.name, _owner: request.user._id },
        { $setOnInsert: { _owner: request.user!._id, ...request.body } },
        { upsert: true, returnOriginal: false }
      )
      if (result.lastErrorObject.updatedExisting === true) {
        return response.status(400).json({ error: true, message: 'A feed with that name already exists.' })
      }
      return response.json(result.value)
    } catch (err) {
      console.error(err)
      return response.status(500).json({ error: true, message: 'There was an error creating this feed.' })
    }
  })

  router.put('/user/:username/feed/:feedname', AuthMiddleware, async (request, response) => {
    try {
      const db = await Database.get()
      const result = await db.collection('feeds').findOneAndUpdate(
        { name: request.body.name, _owner: request.user!._id },
        { $set: { visibility: request.body.visibility, name: request.body.name } },
        { returnOriginal: false }
      )
      return response.json(result.value)
    } catch (err) {
      console.error(err)
      return response.status(500).json({ error: true, message: 'There was an error creating this feed.' })
    }
  })

  router.post('/user/:username/feed/:feedname/replay', AuthMiddleware, ReplayUploadMiddleware, async (request, response) => {
    const fileBuffer = (request as MulterRequest).file.buffer
    await parseAndInsertFromBuffer(fileBuffer)
    return response.json({})
  })

  return router
}
