import express from 'express';
import { createCheckout, handleCheckout, handlePortal} from '../controllers/payment.js'

import utils from '../controllers/utils.js'

const router = express.Router()

import bodyParser from 'body-parser'

router.post('/create-checkout-session', express.json(), utils.getPayload, createCheckout)

router.post('/webhook', bodyParser.raw({type: 'application/json'}), handleCheckout)

router.post('/customer-portal', express.json(), handlePortal)

export default router