import express from 'express'

const router = express.Router()

import {handleRegister, handleLogin, handleLogOut, sendData, handleGoogleLogin, sendLanguage, changeLanguage, deleteUser, sendTechnique, getPayments, addCredits, changeTutorial} from '../controllers/users.js';
import utils from '../controllers/utils.js'

const {authMiddleware, getPayload, resetValues} = utils


router.post('/login', handleLogin)

router.post('/register', handleRegister)

router.get('/logout', handleLogOut)

router.get('/profile', authMiddleware, getPayload, resetValues, sendData)

router.post('/google-login', handleGoogleLogin)

router.get('/language', authMiddleware, getPayload, sendLanguage)

router.get('/technique', authMiddleware, getPayload, sendTechnique)

router.post('/language', authMiddleware, getPayload, changeLanguage)

router.delete('/delete', getPayload, deleteUser)

router.get("/payments", getPayments)

router.patch("/credits", authMiddleware, getPayload, addCredits)

router.patch("/tutorial", authMiddleware, getPayload, changeTutorial)

export default router