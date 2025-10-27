import { Paper, IconButton} from '@mui/material'
import { useSpring, animated } from '@react-spring/web'
import React, { useEffect, useState } from 'react'
import {tutorialData} from '../../home/data'
import httpClient from '../../../httpClient'

export default function Tutorial({openTutorial, show, display, closeTutorial, tutorial, width}) {

  

  const [page, setPage] = useState(1)
  const [tutorial2, setTutorial2] = useState(false)

  const props = useSpring({
    opacity: !show ? '0' : '1',
    config: {mass: 1, tension: 200, friction: 20}
  })

  
  useEffect(() => {

    const open = async () => {

      
      if(tutorial) return

      if(tutorial2) return 
       
      setTutorial2(true)
      
      
      try {
        await httpClient.patch("https://api.skillify-ai.com/users/tutorial")
      
      } catch (err) {
        console.log(err);
      }
      openTutorial() 
    }

    open()
    
  
  }, [openTutorial, tutorial, tutorial2])

  const handleNext = () => {
    if(page === tutorialData.length) 
    {
      closeTutorial()
      setPage(1)
      return 
    }

    setPage(prevState => prevState + 1)
  }

  
  const handlePrevious = () => {
    if(page === 1) 
    {
      closeTutorial()
      setPage(1)
      return
    }
    
    setPage(prevState => prevState - 1) 
  }

  return (
    <animated.div style={props}>
      <Paper elevation={3} className={`tutorial-paper ${!display ? 'no-display' : ""} ${width <= 500 ? 'phone-tutorial' : ""}`}>
          <div className='tutorial-video'>
            <IconButton style = {{color: "#aaa", zIndex: "2"}} className = "icon-profile" onClick = {() => {
              closeTutorial()
              setPage(1)
              }} >
              <i className="fa-solid fa-xmark"></i>
            </IconButton>
            {(page === 1 || page === 2) && <img src={tutorialData[page - 1].video} alt='Tutorial' />}
            {page !== 1 && page !== 2 && <video src={tutorialData[page - 1].video} controls autoPlay muted/>}
          </div>
          <div className='tutorial-content'>
            <div className='tutorial-write'>
              <div style={{
                display: "flex",
                alignItems:"center" , 
                justifyContent:'space-between', 
                width : '100%'}} >
                <p className='page'>{page} / {tutorialData.length}</p>
                {tutorialData[page - 1].cost && <p className='page'>{tutorialData[page-1].cost} credits</p>}
              </div>
              <h3>{tutorialData[page - 1].title}</h3>
              <p className='tutorial-description'>{tutorialData[page - 1].description}</p>
            </div>
            <div className='tutorial-actions'>
              <button onClick = {handlePrevious} className='previous-button'>{page === 1 ? "Maybe later" : "Previous"}</button>
              <button onClick = {handleNext} className='next-button'>{page === tutorialData.length ? "Close" : "Next"}</button>
            </div>
          </div>
      </Paper>
    </animated.div>
  )
}
