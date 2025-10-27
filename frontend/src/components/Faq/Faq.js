import React from 'react'

import { questions } from '../home/data'
import Question from './Question'

const allQuestions = questions.map((item,index) => {
    return <Question key = {index} {...item}/>
})
export default function Faq() {
  return (
    <div className='questions'>
        {allQuestions}
    </div>
  )
}
