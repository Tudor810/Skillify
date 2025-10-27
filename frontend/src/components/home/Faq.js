import React, {useEffect, useState} from 'react'

import {Search} from '@mui/icons-material';
import { TextField, IconButton, InputAdornment } from '@mui/material'
import {questions} from './data'
import Question from '../pricing/Question';
import {useSpring, animated} from '@react-spring/web'



export default function Faq() {

  const [search, setSearch] = useState("")
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    setFilteredQuestions(questions.slice(0, 2))
  },[])



  const appearProps = useSpring({
    opacity: !search ? '0' : '1',
    config: {mass: 1, tension: 100, friction: 20}
  })

  const handleChange = (event) => {
    
    const {value} = event.target
    setSearch(value)

    if(value !==  "" )
    {
      const filtered = questions.filter(
        (item, index) => {
          if(index > 4) return null 
  
          return item.question.toLowerCase().includes(value.toLowerCase())
        }
         
      );
      setFilteredQuestions(filtered)
    } else {
      setFilteredQuestions(questions.slice(0, 2))
    }
    

    
  }
  return (
    <div id='faq-home'>
      <h2>Frequently asked questions</h2>
      <TextField
        placeholder='Find a question'
        className='faq-input'
        // fullWidth
        value={search}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <Search sx={{
                  color: 'white'
                }}/>
              </IconButton>
            </InputAdornment>
          ),
        }}
        
      />
      <animated.div style = {appearProps} className='questions-container'>
      {filteredQuestions.map((item, index) => (
          <Question key={index} answear={item.answear} question={item.question}/>
      ))}
      </animated.div>
    </div>
  )
}
