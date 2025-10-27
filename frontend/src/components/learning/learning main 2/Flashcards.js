import React from 'react'
import { Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, A11y } from 'swiper'

import Flashcard from './Flashcard'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default function Flashcards({flashcards, userLanguage}) {

  const flashcardsLines = flashcards.split('\n\n').filter(item => item.trim() !== "")

  // console.log(flashcardsLines);
  const flashcardsQuestions = flashcardsLines.map(item => {

    const newItem = item.split('\n')
    const newFlashcards = {
      "question": newItem[0],
      "answear": [
        newItem[1],
        newItem[2],
        newItem[3]
      ],
      "correct": newItem[4]
    }

    return newFlashcards
  })

  return (
    <Swiper
     modules={[Navigation, A11y]}
      spaceBetween={50}
      navigation = {true}
      slidesPerView= {1}    
    >

      
      {flashcardsQuestions.map((item, index) => {
        return <SwiperSlide key={index}>
          <Flashcard correct = {item.correct} question={item.question} answear={item.answear} number={index + 1} userLanguage={userLanguage}/>
        </SwiperSlide>
      })}
    </Swiper>
  )
}
