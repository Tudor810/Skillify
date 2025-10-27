import React from 'react'

export default function Item({image, text, title}) {
  return (
    <div className='item-container'>
        <div className='item-left'>
            <img alt = "Descriptive" src={image}/>
        </div>
        <div className='item-right'>
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
    </div>
  )
}
