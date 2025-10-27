import React, { useState } from 'react'

export default function FlipBox({title, text, image}) {

  const [hover, setHover] = useState(false)

  
  const handleHover = () => {
      setHover(true)
  }

  const handleMouseLeave = () => {
    setTimeout(() => {
      setHover(false)
    }, 700)
  }

  return (
    <div className='main-container about-us-card'>
        <div className={`flip-card ${hover ? 'hover' : ""}`} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
            <div className='front-card'>
              <div style = {{alignItems: 'center', justifyContent: 'center'}} className='card-content'>
                <h2>{title}</h2>
                <img src={image} alt='Meaningful'/>
              </div>
              
            </div>
            <div className={'back-card'}>
                <div style = {{alignItems: 'center', justifyContent: 'center'}} className='card-content'>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
