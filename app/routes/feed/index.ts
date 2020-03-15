import express, { Router } from 'express'
import Database from '../../Database'
import bodyParser from 'body-parser'
import AuthMiddleware from '../authentication/Middleware'

export default function RouteFactory () : Router {
  const router = express.Router()
  router.use(bodyParser.json())

  router.get('/feed/:feedid', async (request, response) => {
    try {
      const db = await Database.get()
      const result = await db.collection('feeds').find({ name: request.params.feedid }).toArray()
      if (result.length > 0) {
        if (request.user === undefined && result[0].visibility === 'private') {
          return response.status(401).json({ error: true, message: 'Not authorized to view this' })
        } else {
          return response.json(result[0])
        }
      }
      return response.status(404).json({ error: true, message: 'Feed not found.' })
    } catch (err) {
    }
    return response.status(500).json({ error: true, message: 'Could not retrieve feed' })
  })

  router.post('/feed/', AuthMiddleware, async (request, response) => {
    try {
      const db = await Database.get()
      const result = await db.collection('feeds').findOneAndUpdate({ name: request.body.name }, { $setOnInsert: { _owner: request.user._id, ...request.body } }, { upsert: true })
      if (result.lastErrorObject.updatedExisting === true) {
        return response.status(400).json({ error: true, message: 'A feed with that name already exists.' })
      }
      return response.json(result.value)
    } catch (err) {
      console.error(err)
      return response.status(500).json({ error: true, message: 'There was an error creating this feed.' })
    }
  })

  return router
}
