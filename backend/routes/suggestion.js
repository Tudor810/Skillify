import express from 'express'
import utils from '../controllers/utils.js'
const router = express.Router()
import writeSuggestion from '../controllers/suggestion.js'

router.post('/', utils.authMiddleware, utils.getPayload, writeSuggestion)

export default router