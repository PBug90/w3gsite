import express from 'express'
import ReplayRouter from './replay'

const router =  express.Router()

router.use(ReplayRouter)

export default router