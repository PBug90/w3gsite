import { RequestHandler } from 'express'

export const bla : RequestHandler = (request, response, next) => {
  if (request.user) {
    next()
  }
  response.status(401).json({ error: true, message: 'You are not authorized.' })
}
