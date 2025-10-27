import React,{useContext} from 'react'
import { GetStartedContext } from '../../App'
import { useNavigate } from 'react-router-dom'

export default function Card({data, isAuthentificated}) {

  const navigate = useNavigate()
  
  const { toggleGetStarted } = useContext(GetStartedContext)
  const {title,image,description} = data
  return (
    <div className='card'>
        <img alt = "Some skill" src = {image}/>
        <div className='text-area'>
            <h2 className='title'>{title}</h2>
            <p className='description'>{description}</p>
        </div>
        
        <button className='card-button' onClick={!isAuthentificated ? toggleGetStarted : () => navigate('/dashboard')}>Get started</button>
    </div>
  )
}
