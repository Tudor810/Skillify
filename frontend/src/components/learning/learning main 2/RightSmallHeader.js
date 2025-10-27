import { ClickAwayListener } from '@mui/material';
import React, {useEffect, useState} from 'react'

export default function SmallHeader({selected, lineStyle, handleClick, width, open, handleClose, handleOpen}) {

 
  const [diff, setDiff] = useState(0)
  useEffect(() => {
    
     if(width > 1800)
      setDiff(0)
    else if(width > 1600) {
      setDiff(10)
    }
    else if(width > 1000)
      setDiff(25)
    else setDiff(55)
  }, [width]);

  
 
  return (
    <header className='small-header small-header-right'>
      {width > 500 &&  <ul className='type-list'>
            <li onClick={handleClick.bind(null, "first", 80, 0)} className={`${selected.first === true ? 'active' : ''}`}><i className="fa-solid fa-graduation-cap"></i>Lesson</li>
            <li onClick={handleClick.bind(null, "second", 105 - diff / 1.5, 130 - diff )} className={`${selected.second === true ? 'active' : ''}`}><i className = "fa-solid fa-pen-nib"></i>Homework</li>
            <li onClick={handleClick.bind(null, "third", 100 - diff / 1.5, 270 - diff * 1.6)} className={`${selected.third === true ? 'active' : ''}`}><i className = "fa-solid fa-bolt"></i>Flashcards</li>
            <li onClick={handleClick.bind(null, "fourth", 75 - diff / 1.5, 405 - diff * 2.1)} className={`${selected.fourth === true ? 'active' : ''}`}><i className = "fa-solid fa-brain"></i>Tests</li>

      
        </ul>}
        {width > 500 && <div style = {lineStyle} className='line-underneath'></div> }

     {width <= 500 && <i onClick = {!open ? handleOpen : handleClose} style = {{color: 'white', fontSize: '1.2rem'}} className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`}></i>}
     {width <= 500 && open && <ClickAwayListener onClickAway={(event) => event.target.className === 'fa-solid fa-xmark' ? null : handleClose() }>
       <div className='hamburger-menu right-small-header'>
          <ul>
            <li onClick={handleClick.bind(null, "first")} className={`${selected.first === true ? 'active' : ''}`}><i className="fa-solid fa-graduation-cap"></i> Lesson</li>
            <li onClick={handleClick.bind(null, "second")} className={`${selected.second === true ? 'active' : ''}`}><i className = "fa-solid fa-pen-nib"></i>Homework</li>  
            <li onClick={handleClick.bind(null, "third")} className={`${selected.third === true ? 'active' : ''}`}><i className = "fa-solid fa-bolt"></i>Flashcards</li>
            <li onClick={handleClick.bind(null, "fourth")} className={`${selected.fourth === true ? 'active' : ''}`}><i className = "fa-solid fa-brain"></i>Tests</li>

          </ul>
        </div>
        </ClickAwayListener>}
    </header>
  )
}
