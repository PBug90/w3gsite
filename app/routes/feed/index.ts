import express, { Router } from 'express'
import Database from '../../Database'

export default function RouteFactory () : Router {
  const router = express.Router()

  router.get('/feed/:feedid', async (request, response) => {
    try {
      const db = await Database.get()
      const result = await db.collection('replays').find({ feed: request.params.feedid }).toArray()
      return response.json(result)
    } catch (err) {
    }
    return response.status(500).json({ error: true, message: 'Could not retrieve replays.' })
  })
  return router
}
