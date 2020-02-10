import express, { Request, Response } from 'express'
import Parser from 'w3gjs'
import multer from 'multer'
import Database from '../../Database'

interface MulterRequest extends Request {
  file: any;
}

const router = express.Router()
const parser = new Parser()
const upload = multer({ dest: 'uploads/', storage: multer.memoryStorage() })

router.post('/replay/parse', upload.single('replay'), (request: Request, response: Response) => {
  const fileBuffer = (request as MulterRequest).file.buffer
  const parsedReplay = parser.parse(fileBuffer)
  response.json(parsedReplay)
})

router.post('/replay', upload.single('replay'), async (request: Request, response: Response) => {
  const fileBuffer = (request as MulterRequest).file.buffer
  try {
    const parsedReplay = parser.parse(fileBuffer)
    const db = await Database.get()
    const result = await db.collection('replays').insertOne({ ...parsedReplay, uploadedAt: new Date() })
    if (result.ops.length === 1) {
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
    const result = await db.collection('replays').find({}).toArray()
    return response.json(result)
  } catch (err) {
    console.error(err)
  }
  return response.status(500).json({ error: true, message: 'Could not retrieve replays.' })
})

export default router
