import React from 'react'
import { Link } from 'react-router-dom'

export default function Categories({title, description, image, button, link}) {
  return (
    <div className={`card ${button === "Coming soon" ? "coming-soon-card" : ""}`}>
        <div className = 'text'>
            <p className = "main-text">{title}</p>
            <p className='secondary-text'>{description}</p>
        </div>
        <img src={image} className = {`${title === "SkillyFriend: Your Learning Ally" ? "smaller" : ""}`}alt='Related to content'/>
        <Link className = "button-container" to = {link}><button className={`more-button ${button === "Coming soon" ? "coming-soon" : ""}`}>{button}</button></Link>
    </div>
  )
}
