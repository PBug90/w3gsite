import express, { Router } from 'express'
import ReplayRouter from './replay'
import FeedRouter from './feed'
import TwitchOAuthRouter from './authentication/Twitch'
export default function Factory (): Router {
  const router = express.Router()
  router.use(TwitchOAuthRouter())
  router.use(ReplayRouter())
  router.use(FeedRouter())
  return router
}
