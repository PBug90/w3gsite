import express, { Request, Response, Express } from 'express'
import routerFactory from './routes'
import proxy from 'express-http-proxy'
import cors from 'cors'
import * as path from 'path'

export default function AppFactory () : Express {
  const app = express()

  if (process.env.NODE_ENV !== 'production') {
    app.use(cors())
  }

  app.use('/api', routerFactory())
  app.get('/api/*', (req: Request, res: Response): void => {
    res.status(404).json({ error: 'not found' })
  })

  if (process.env.NODE_ENV !== 'production') {
    app.get('*', proxy('http://localhost:3000'))
  } else {
    app.use(express.static(path.resolve('./') + '/frontend/build'))
    app.get('*', (req: Request, res: Response): void => {
      res.sendFile(path.resolve('./') + '/frontend/build/index.html')
    })
  }

  return app
}
