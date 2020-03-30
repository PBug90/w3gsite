import express, { Request, Response, Router } from 'express'
// @ts-ignore
import Parser from 'w3gjs'
import Database from '../../Database'
import { ObjectId } from 'mongodb'
import { parseAndInsertFromBuffer } from '../../database/Replay'
import { MulterRequest } from '../types'
import { replayUpload as ReplayUploadMiddleware } from '../Middlewares'

export default function Factory (): Router {
  const router = express.Router()
  const parser = new Parser()

  router.post('/parse', ReplayUploadMiddleware, async (request: Request, response: Response) => {
    const fileBuffer = (request as MulterRequest).file.buffer
    const actions : any[] = []
    parser.on('actionblock', (block: any, playerId: number) => {
      actions.push({ ...block, time: parser.msElapsed, playerId })
    })
    const parsedReplay = parser.parse(fileBuffer)

    const db = await Database.get()
    await db.collection('parsed').insertOne({ ...parsedReplay, actions, uploadedAt: new Date() })
    response.json(parsedReplay)
  })

  router.get('/parse', async (request: Request, response: Response) => {
    try {
      const db = await Database.get()
      const result = await db.collection('parsed').find({}, { projection: { __base64Replay: 0 } }).sort({ uploadedAt: -1 }).toArray()
      return response.json(result)
    } catch (err) {
      console.error(err)
    }
    return response.status(500).json({ error: true, message: 'Could not retrieve replays.' })
  })

  router.post('/replay', ReplayUploadMiddleware, async (request: Request, response: Response) => {
    const fileBuffer = (request as MulterRequest).file.buffer
    const result = await parseAndInsertFromBuffer(fileBuffer, true)
    try {
      if (result.ops.length === 1) {
        delete result.ops[0].__base64Replay
        response.json(result.ops[0])
      } else {
        response.status(500).json({ error: true, message: 'Could not insert replay.' })
      }
    } catch (err) {
      console.error(err)
      return response.status(500).json({ error: true, message: 'Could not insert replay.' })
    }
  })

  router.get('/replay', async (request: Request, response: Response) => {
    try {
      const db = await Database.get()
      const result = await db.collection('replays').find({}, { projection: { __base64Replay: 0 } }).toArray()
      return response.json(result)
    } catch (err) {
      console.error(err)
    }
    return response.status(500).json({ error: true, message: 'Could not retrieve replays.' })
  })

  router.get('/replay/:id/download', async (request: Request, response: Response) => {
    try {
      const db = await Database.get()
      const result = await db.collection('replays').findOne({ _id: new ObjectId(request.params.id) }, { projection: { __base64Replay: 1 } })
      const buffer = Buffer.from(result.__base64Replay, 'base64')
      response.setHeader('Content-disposition', 'attachment; filename=replay.w3g')
      return response.status(200).end(buffer, 'binary')
    } catch (err) {
      console.error(err)
    }
    return response.status(500).json({ error: true, message: 'Could not retrieve replays.' })
  })

  return router
}
