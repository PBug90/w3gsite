import express from 'express'

const router = express.Router()

router.post('/replay/parse', (request, response) => {
    response.json({"it":"works"})
})

export default router