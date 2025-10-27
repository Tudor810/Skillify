import express from 'express'

const router = express.Router()

import refundRequest from '../controllers/refund.js'
import utils from '../controllers/utils.js'


router.post('/', utils.authMiddleware, refundRequest)


export default router;
