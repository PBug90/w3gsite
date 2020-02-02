import express from 'express'
import Parser from 'w3gjs'

const router = express.Router()
const parser = new Parser()

router.post('/replay/parse', (request, response) => {
  parser.parse('asd')
  response.json({ it: 'works' })
})

export default router
