import express from 'express'

const router = express.Router()
import utils from '../controllers/utils.js'
import authentificate from '../controllers/home.js'

router.get('/authentificated', authentificate, utils.authMiddleware, (req, res) => {
    res.status(200).json({succes: true, token: true})
})

export default router