import React,{useState} from 'react'
import { IconButton } from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import {useSpring,animated} from '@react-spring/web'


export default function Question({question,answear}) {
    
    const [questionOpen,setQuestionOpen] = useState(false)

    const questionProps = useSpring({
        opacity: questionOpen ? '1' : '0',
        delay: 100
    })
  return (
    <div className='question-container'>
        <div className='top-part' style={!questionOpen ? {marginBottom: '15px'} : null}>
            <h3 className='question'>{question}</h3>
            <IconButton onClick = {() => setQuestionOpen(prevState => !prevState)}>    
                {!questionOpen ? <AddCircleOutline sx={{ color: 'white',}}/> : <RemoveCircleOutline sx={{ color: 'white',}}/>}
            </IconButton>
        </div>
        {questionOpen && <animated.span style = {questionProps} className='answear'>{answear}</animated.span>}
    </div>
  )
}
