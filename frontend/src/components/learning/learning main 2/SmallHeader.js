import { ClickAwayListener } from '@mui/material';
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

export default function SmallHeader({selected, lineStyle, handleClick, category, width, open, handleClose, handleOpen, credits, superCredits}) {

 
  const [diff, setDiff] = useState(0)
  useEffect(() => {
    
     if(width > 1800)
      setDiff(0)
    else if(width > 1600) {
      setDiff(10)
    }
    else 
      setDiff(25)
  }, [width]);

  
 
  return (
    <header className='small-header'>
      {width > 500 &&  <ul className='type-list'>
            <li onClick={event => handleClick(event, "first", 65, 0)} className={`${selected.first === true ? 'active' : ''}`}><i className={`${category !== "summary" ? "fa-regular fa-message" : "fa-solid fa-file-pdf"}`}></i> {category !== "summary" ? "Chat" : "File"}</li>
            
            <li onClick={event => handleClick(event, "second", 80 - diff / 1.5, 105 - diff)} className={`${selected.second === true ? 'active' : ''}`}><i className = {`${category !== "summary" ? "fa-solid fa-graduation-cap" : "fa-brands fa-youtube"}`}></i>{category !== "summary" ? "Lesson" : "Youtube"}</li>
            
            {category === 'sport' && <li onClick={event => handleClick(event, "third", 95 - diff / 1.5, 235 - diff * 1.55)} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-volleyball"></i>Equipment</li>}
            {category === 'sport' && <li onClick={event => handleClick(event, "fourth", 85 - diff / 1.5, 380 - diff * 2.5)} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-stopwatch-20"></i>Exercises</li>}

            {category === 'school' && <li onClick={event => handleClick(event, "third", 65 - diff / 1.5, 228 - diff * 1.55)} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-pen-nib"></i>Essay</li>}
            {category === 'school' && <li onClick={event => handleClick(event, "fourth", 65 - diff / 1.5, 340 - diff * 2.1)} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-book-open"></i>Books</li>}
            {category === 'school' && <li onClick={event => handleClick(event, "fifth", 65 - diff / 1.5 , 450 - diff * 2.65)} className={`${selected.fifth === true ? 'active' : ''}`}><i className="fa-solid fa-scroll"></i>Tests</li>}

            {category === 'high-income' && <li onClick={event => handleClick(event, "third", 65 - diff / 1.5, 230 - diff * 1.55)} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-envelope"></i>Email</li>}
            {category === 'high-income' && <li onClick={event => handleClick(event, "fourth", 95 - diff / 1.5, 335 - diff * 2.1)} className={`${selected.fourth === true ? 'active' : ''}`}><i className ="fa-solid fa-briefcase"></i>Business</li>}

            {category === 'cooking' && <li onClick={event => handleClick(event, "third", 85 - diff / 1.5, 230 - diff * 1.55)} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-bowl-food"></i>Recipes</li>}
            {category === 'cooking' && <li onClick={event => handleClick(event, "fourth", 65 - diff / 1.5, 350 - diff * 2.1)} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-kitchen-set"></i>Chef</li>}

            {category === 'gym' && <li onClick={event => handleClick(event, "third", 65 - diff / 1.5, 230 - diff * 1.55)} className={`${selected.third === true ? 'active' : ''}`}><i className ="fa-solid fa-calendar-days"></i>Split</li>}
            {category === 'gym' && <li onClick={event => handleClick(event, "fourth", 60 - diff / 1.5, 320 - diff * 2.1)} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-egg"></i>Diet</li>}
            {category === 'gym' && <li onClick={event => handleClick(event, "fifth", 90 - diff / 1.5, 420 - diff * 2.6)} className={`${selected.fifth === true ? 'active' : ''}`}><i className="fa-solid fa-user-injured"></i>Streching</li>}

            {category === 'coding' && <li onClick={event => handleClick(event, "third", 125 - diff / 1.5, 230 - diff * 1.55)} className={`${selected.third === true ? 'active' : ''}`}><i className ="fa-solid fa-code"></i>Completion</li>}
            {category === 'coding' && <li onClick={event => handleClick(event, "fourth", 95 - diff / 1.5, 380 - diff * 2.1)} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-laptop-code"></i>Revision</li>}

            {category === 'survival-skills' && <li onClick={event => handleClick(event, "third", 105 - diff / 1.5, 235 - diff * 1.55)} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-binoculars"></i>Equipment</li>}
            {category === 'survival-skills' && <li onClick={event => handleClick(event, "fourth", 85 - diff / 1.5, 370 - diff * 2.1)} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-mountain-sun"></i>Survive</li>}

            {category === 'video-games' && <li onClick={event => handleClick(event, "third", 65 - diff / 1.5, 230 - diff * 1.55)} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-headset"></i>Level</li>}
            {category === 'video-games' && <li onClick={event => handleClick(event, "fourth", 95 - diff / 1.5, 330 - diff * 2.1)} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-repeat"></i>Practice</li>}

            {category === 'social-media' && <li onClick={event => handleClick(event, "third", 105 - diff / 1.5, 235 - diff * 1.55)} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-hashtag"></i>Description</li>}
            {category === 'social-media' && <li onClick={event => handleClick(event, "fourth", 70 - diff / 1.5, 370 - diff * 2.1)} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-regular fa-calendar-days"></i>Posts</li>}

            {category === 'social-skills' && <li onClick={event => handleClick(event, "third", 105 - diff / 1.5, 235 - diff * 1.55)} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-icicles"></i>Icebreakers</li>}
            {category === 'social-skills' && <li onClick={event => handleClick(event, "fourth", 85 - diff / 1.5, 375 - diff * 2.1)} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-mobile-screen"></i>Message</li>}

            {category === 'self-improvement' && <li onClick={event => handleClick(event, "third", 65 - diff / 1.5, 230 - diff * 1.55)} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-book-bookmark"></i>Books</li>}
            {category === 'self-improvement' && <li onClick={event => handleClick(event, "fourth", 75 - diff / 1.5, 335 - diff * 2.1)} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-hand-holding-hand"></i>Habits</li>}

            {category === 'mindfulness' && <li onClick={event => handleClick(event, "third", 65 - diff / 1.5, 230 - diff * 1.55)} className={`${selected.third === true ? 'active' : ''}`}><i className = "fa-solid fa-seedling"></i>Yoga</li>}
            {category === 'mindfulness' && <li onClick={event => handleClick(event, "fourth", 110 - diff / 1.5, 330 - diff * 2.1)} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-hands-praying"></i>Meditation</li>}

            {category === 'fighting' && <li onClick={event => handleClick(event, "third", 75 - diff / 1.5, 230 - diff * 1.55)} className={`${selected.third === true ? 'active' : ''}`}><i className = "fa-solid fa-hand-fist"></i>Practice</li>}
            {category === 'fighting' && <li onClick={event => handleClick(event, "fourth", 95 - diff / 1.5, 355 - diff * 2.1)} className={`${selected.fourth === true ? 'active' : ''}`}><i className = "fa-solid fa-boxes-stacked"></i>Equipment</li>}
            
            {category === "summary" && <Link to = "/categories" style = {{color: 'white', marginLeft: 'auto'}}><li>Change category</li></Link>}
        </ul>}
        {width > 500 && <div style = {lineStyle} className='line-underneath'></div> }

     {width <= 500 && <i onClick = {!open ? handleOpen : handleClose} style = {{color: 'white', fontSize: '1.2rem'}} className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`}></i>}
     {width <= 500 && <p style = {{marginLeft: 'auto', color: 'white'}}className='credits-left'>Credits left: {credits}</p>}
     {width <= 500 && <p style = {{marginLeft: 'auto', color: 'white'}}className='credits-left'>{superCredits} <i className='fa-solid fa-rocket'></i></p>}
     {width <= 500 && open && <ClickAwayListener onClickAway={(event) => event.target.className === 'fa-solid fa-xmark' ? null : handleClose() }>
       <div className='hamburger-menu'>
          <ul>
            <li onClick={event => handleClick(event, "first")} className={`${selected.first === true ? 'active' : ''}`}><i className={`${category !== "summary" ? "fa-regular fa-message" : "fa-solid fa-file-pdf"}`}></i> {category !== "summary" ? "Chat" : "File"}</li>

            <li onClick={event => handleClick(event, "second")} className={`${selected.second === true ? 'active' : ''}`}><i className = {`${category !== "summary" ? "fa-solid fa-graduation-cap" : "fa-brands fa-youtube"}`}></i>{category !== "summary" ? "Lesson" : "Youtube"}</li>


              {category === 'sport' && <li onClick={event =>handleClick(event, "third")} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-volleyball"></i>Equipment</li>}
              {category === 'sport' && <li onClick={event =>handleClick(event, "fourth")} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-stopwatch-20"></i>Exercises</li>}

              {category === 'school' && <li onClick={event =>handleClick(event, "third")} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-pen-nib"></i>Essay</li>}
              {category === 'school' && <li onClick={event =>handleClick(event, "fourth")} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-book-open"></i>Books</li>}
              {category === 'school' && <li onClick={event =>handleClick(event, "fifth")} className={`${selected.fifth === true ? 'active' : ''}`}><i className="fa-solid fa-scroll"></i>Tests</li>}

              {category === 'high-income' && <li onClick={event =>handleClick(event, "third")} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-envelope"></i>Email</li>}
              {category === 'high-income' && <li onClick={event =>handleClick(event, "fourth")} className={`${selected.fourth === true ? 'active' : ''}`}><i className ="fa-solid fa-briefcase"></i>Business</li>}

              {category === 'cooking' && <li onClick={event =>handleClick(event, "third")} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-bowl-food"></i>Recipes</li>}
              {category === 'cooking' && <li onClick={event =>handleClick(event, "third")} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-kitchen-set"></i>Chef</li>}
            
              {category === 'gym' && <li onClick={event =>handleClick(event, "third")} className={`${selected.third === true ? 'active' : ''}`}><i className ="fa-solid fa-calendar-days"></i>Split</li>}
              {category === 'gym' && <li onClick={event =>handleClick(event, "fourth")} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-egg"></i>Diet</li>}
              {category === 'gym' && <li onClick={event =>handleClick(event, "fifth")} className={`${selected.fifth === true ? 'active' : ''}`}><i className="fa-solid fa-user-injured"></i>Streching</li>}

              {category === 'coding' && <li onClick={event =>handleClick(event, "third")} className={`${selected.third === true ? 'active' : ''}`}><i className ="fa-solid fa-code"></i>Completion</li>}
              {category === 'coding' && <li onClick={event =>handleClick(event, "fourth")} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-laptop-code"></i>Revision</li>}
              
              {category === 'survival-skills' && <li onClick={event =>handleClick(event, "third")} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-binoculars"></i>Equipment</li>}
              {category === 'survival-skills' && <li onClick={event =>handleClick(event, "fourth")} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-mountain-sun"></i>Survive</li>}

              {category === 'video-games' && <li onClick={event =>handleClick(event, "third")} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-computer"></i>Computer</li>}
              {category === 'video-games' && <li onClick={event =>handleClick(event, "fourth")} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-repeat"></i>Practice</li>}

              {category === 'social-media' && <li onClick={event =>handleClick(event, "third")} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-hashtag"></i>Description</li>}
              {category === 'social-media' && <li onClick={event =>handleClick(event, "fourth")} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-regular fa-calendar-days"></i>Posts</li>}

              {category === 'social-skills' && <li onClick={event =>handleClick(event, "third")} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-icicles"></i>Icebreakers</li>}
              {category === 'social-skills' && <li onClick={event =>handleClick(event, "fourth")} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-mobile-screen"></i>Message</li>}

              {category === 'self-improvement' && <li onClick={event =>handleClick(event, "third")} className={`${selected.third === true ? 'active' : ''}`}><i className="fa-solid fa-book-bookmark"></i>Books</li>}
              {category === 'self-improvement' && <li onClick={event =>handleClick(event, "fourth")} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-hand-holding-hand"></i>Habits</li>}

              {category === 'mindfulness' && <li onClick={event =>handleClick(event, "third")} className={`${selected.third === true ? 'active' : ''}`}><i className = "fa-solid fa-seedling"></i>Yoga</li>}
              {category === 'mindfulness' && <li onClick={event =>handleClick(event, "fourth")} className={`${selected.fourth === true ? 'active' : ''}`}><i className="fa-solid fa-hands-praying"></i>Meditation</li>}

              {category === 'fighting' && <li onClick={event => handleClick(event, "third")} className={`${selected.third === true ? 'active' : ''}`}><i className = "fa-solid fa-hand-fist"></i>Practice</li>}
              {category === 'fighting' && <li onClick={event => handleClick(event, "fourth")} className={`${selected.fourth === true ? 'active' : ''}`}><i className = "fa-solid fa-boxes-stacked"></i>Equipment</li>}

              {category === "summary" && <Link to = "/categories" style = {{marginLeft: 'auto'}}><li>Change category</li></Link>}
          </ul>
        </div>
        </ClickAwayListener>}
    </header>
  )
}
