import express, { Request, Response } from 'express'

import * as path from 'path'
import router from './routes'

const app = express()

app.use(express.static(path.resolve('./') + '/frontend/build'))

app.use('/api', router)
app.get('/api/*', (req: Request, res: Response): void => {
  res.status(404).json({ error: 'not found' })
})

app.get('*', (req: Request, res: Response): void => {
  res.sendFile(path.resolve('./') + '/frontend/build/index.html')
})

export default app
