import express from 'express'
const router = express.Router();


import payment from './payment.js'
import users from './users.js'
import home from './home.js'
import plans from './plans.js'
import chatGpt from './chatGpt.js'
import passwordReset from './passwordReset.js'
import review from './review.js'
import refund from './refund.js'
import suggestion from './suggestion.js'
import chat from './chat.js'

router.use('/stripe', payment)
router.use(express.json())
router.use('/users', users);
router.use('/home', home)
router.use('/plans', plans)
router.use('/chatGpt', chatGpt)
router.use('/passwordReset', passwordReset)
router.use('/review', review)
router.use('/refund', refund)
router.use('/suggestion', suggestion)
router.use('/chat', chat)
export default router;