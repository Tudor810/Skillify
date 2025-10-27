import express from 'express'
const router = express.Router()

import {forgotPassword, resetPassword} from '../controllers/passwordReset.js'


router.post('/forgot', forgotPassword)

router.patch('/reset', resetPassword)

export default router
