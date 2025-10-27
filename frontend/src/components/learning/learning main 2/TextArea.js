import React, {useState} from 'react'
import { ClickAwayListener } from '@mui/material'

export default function TextArea({value, handleChange, placeholder, type, addComment, error, succes, level}) {

    const [active, setActive] = useState(false)

  const toggleActive = () => setActive(true)

  const toggleInactive = () => setActive(false)

  return (
    <ClickAwayListener onClickAway={toggleInactive}>
    <div style={{marginLeft: `-${(level - 1) * 50}px`}} className = 'lessons-section'>
      <div onClick = {toggleActive} className={`lessons-textarea ${active ? 'textarea-active' : ""} ${type === "comment" ? 'comments-textarea' : ""}`}>
        <div className={`${type === "comment" ? "comment-textarea" : ""} `}>
          {type === "comment" && <div className='textarea-container'>
                <textarea
                  placeholder={placeholder}
                  value={value}
                  onChange={handleChange}
                  style={{
                    height: '100px'
                  }}
                />
            </div>}

            {type !== "comment" && 
             <textarea
             placeholder={placeholder}
             value={value}
             onChange={handleChange}
           />}
         
          {type === "comment" && <div className='comment-button'>
            {error && <span className='error'>{error}</span>}
            {succes && <span className='succes'>{succes}</span>}
            <button onClick={addComment}>Comment</button>
          </div>}
        </div>
      </div>
    </div>
  </ClickAwayListener>
  )
}
