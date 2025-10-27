import React, {useState} from 'react'
import {Link} from 'react-router-dom'

export default function Category({title, description, icon, canDo, width}) {
  
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
    <div className='main-container'>
        <div className={`flip-card ${hover ? 'hover' : ""}`} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
            <div className='front-card'>
                <div className='card-content'>
                  <h2>{title}</h2>
                  <i className={`fa-solid ${icon}`}></i>
                  {icon === 'fa-stairs' && <i className="fa-solid fa-person-walking"></i>}
                  <p>{description}</p>
                  {width < 700 && <p style={{color: 'var(--description-color)', fontSize: '0.9rem'}}>(Click to see more)</p>}
                </div>
            </div>
            <div className='back-card'>
              <div className='card-content'>
                <h2>What can it do?</h2>
                <ul>
                  {canDo.map((item, index) => {
                    return <li key={index}>{item}</li>
                  })}
                </ul>
                <Link style = {{marginTop: 'auto'}} to = {`/learn/${title !== "Videos and Documents Summarization Tool" ? title.toLowerCase().replace(' ', '-') : "summary"}`}><button className='home-button'>Explore</button></Link>
              </div>
            </div>
        </div>
    </div>
  )
}
