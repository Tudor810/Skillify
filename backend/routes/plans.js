import express from 'express'
import utils from '../controllers/utils.js'

const router = express.Router()

import {saveLesson, getLessonTitles, getLesson, editLesson, saveTool, getToolTitles, editTool, getPlanTitles, deleteLesson, getLessonNumber} from '../controllers/plans.js'

router.use(utils.getPayload)

router.get('/plan-titles', getPlanTitles)

router.post('/save-lesson', saveLesson)

router.get('/lesson-number', getLessonNumber)

router.get('/lesson-titles', getLessonTitles)

router.get('/lesson', getLesson)

router.patch('/edit-lesson', editLesson)

router.post('/save-tool', saveTool)

router.get('/tool-titles', getToolTitles)

router.patch('/edit-tool', editTool)

router.delete('/delete', deleteLesson)

export default router 