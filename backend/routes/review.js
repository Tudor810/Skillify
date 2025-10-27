import express from 'express'

const router = express.Router()

import  {getAll, createReview} from '../controllers/review.js'
import utils from '../controllers/utils.js'


router.get('/', getAll)

router.post('/', utils.authMiddleware, createReview)


export default router;
