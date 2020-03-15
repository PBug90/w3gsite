import { RequestHandler } from 'express'

const AuthenticationMiddleware : RequestHandler = (request, response, next) => {
  if (request.user) {
    next()
  } else {
    response.status(401).json({ error: true, message: 'You are not authorized.' })
  }
}

export default AuthenticationMiddleware
