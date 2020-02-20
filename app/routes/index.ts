import express from 'express'
import ReplayRouter from './replay'
import FeedRouter from './feed'
import TwitchOAuthRouter from './authentication/Twitch'

const router = express.Router()
router.use(TwitchOAuthRouter)
router.use(ReplayRouter)
router.use(FeedRouter)
export default router
