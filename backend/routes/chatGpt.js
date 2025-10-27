import express from 'express'

const router = express.Router()

import { chat, lesson, lessonContent, 
essayOutline, essay, bookSummary, tests, answear, revision, completion,
email, businessSteps, recipe, allRecipes, split, diet,
sportEquipment, exercises, survivalEquipment, survive, chef, 
practice, level, description, posts, message, icebreakers, icebreakerContent, habits,
allBooks, bookDescription, allStreching, streching, allYoga, yoga, meditation, homework, flashcards, testLesson,
practiceFighting, fightEquipment, getDefinition, getDocumentSummary, explanationFlashcard} from '../controllers/chatGpt.js'

import {getPdf, getVideo} from '../controllers/readFiles.js'

import utils from '../controllers/utils.js'

router.use(utils.getPayload)

router.post("/chat", chat)


// Lesson 

router.post('/lesson', lesson)

router.post('/lesson-content', lessonContent)

router.post('/homework', homework)

router.post('/flashcards', flashcards)

router.post('/explanation', explanationFlashcard)

router.post('/test-lesson', testLesson)
// School

router.post('/essay-outline', essayOutline)

router.post('/essay', essay)

router.post("/book", bookSummary)

router.post("/tests", tests)

router.post("/answear", answear)

// Programming 

router.post("/completion", completion)

router.post("/revision", revision)

// High income

router.post("/email", email)

router.post('/business', businessSteps)

// Cooking

router.post('/all-recipes', allRecipes)

router.post('/recipe', recipe)

router.post('/chef', chef)

// Gym

router.post('/split', split)

router.post('/diet', diet)

router.post('/all-streching', allStreching)

router.post('/streching', streching)

// Sport 

router.post('/sport-equipment', sportEquipment)

router.post('/exercise', exercises)

// Fighting

router.post('/practice-fighting', practiceFighting)

router.post('/fight-equipment', fightEquipment)
// Survival skills

router.post('/survival-equipment', survivalEquipment)

router.post('/survive', survive)

// Video games

router.post('/practice', practice)

router.post('/level', level)
// Social Media

router.post('/description', description)

router.post('/posts', posts)

// Social skills

router.post('/message', message)

router.post('/all-icebreakers', icebreakers)

router.post('/icebreaker', icebreakerContent)

// Self improvement

router.post('/habits', habits)

router.post('/all-books', allBooks)

router.post('/book-improvement', bookDescription)

// Minfulness

router.post('/all-yoga', allYoga)

router.post('/yoga', yoga)

router.post('/meditation', meditation)

// Defintion

router.post('/definition', getDefinition)

// Get transcript/text

router.get('/video', getVideo)

router.post("/pdf", getPdf)

// Summary 

router.post('/document-summary', getDocumentSummary)



export default router
