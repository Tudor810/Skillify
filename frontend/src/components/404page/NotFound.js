import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/not-found.css'

export default function NotFound() {
  return (
    <div className='not-found'>
      <div className='not-found-card'>
        <h1>Uh oh, something went wrong</h1>
        <p className='error-404'>Error 404 - page not found</p>
        <span>
        Oops! Looks like we couldn't find what you were looking for.
        Don't worry, our AI is working hard to create a personalized plan for you to learn any skill you want. 
        In the meantime, why not try some of our most popular skills:
        <ul>
            <li>Cooking up a storm in the kitchen</li>
            <li>Mastering the art of public speaking</li>
            <li>Perfecting your poker face</li>
            <li>Becoming a pro at coding</li>
        </ul>
        Or, if you're feeling adventurous, why not suggest a new skill for our AI to add to its repertoire?

        Either way, we've got you covered. Happy learning!
        </span>
        <Link to="/"><Button variant = "contained" className='not-found-button'>Return to Home</Button></Link>
      </div>
    </div>
  )
}
