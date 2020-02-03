import express, { Request } from 'express'
import Parser from 'w3gjs'
import multer from 'multer'

interface MulterRequest extends Request {
  file: any;
}

const router = express.Router()
const parser = new Parser()
const upload = multer({ dest: 'uploads/', storage: multer.memoryStorage() })

router.post('/replay/parse', upload.single('replay'), (request: Request, response) => {
  const fileBuffer = (request as MulterRequest).file.buffer
  const parsedReplay = parser.parse(fileBuffer)
  response.json(parsedReplay)
})

export default router
