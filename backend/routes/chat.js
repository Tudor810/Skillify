import express from 'express'
import {addReplies, createComment, createThread, getAllThreads, getComments, getOneThread, getReplies, like} from '../controllers/chat.js'
import utils from '../controllers/utils.js'

const router = express.Router()

router.use(utils.getPayload)

router.get('/', getAllThreads)

router.post('/', createThread)

router.get("/comment", getComments)

router.get("/reply", getReplies)

router.post("/reply", addReplies)

router.post("/comment", createComment)

router.post('/like', like)

router.post('/like', like)

router.get('/:id', getOneThread)

export default router
