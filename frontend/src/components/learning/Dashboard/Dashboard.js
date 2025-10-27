import React from 'react'
import '../../../css/dashboard.css'

import Categories from './Categories'
import { dashboardData } from '../../home/data'



export default function Dashboard() {
  return (
    <div className='dashboard'>
      <div className='text-container'>
        <h1 className='main-text'>Explore, Learn, and Connect: Your AI Learning Hub</h1>
        <p className='secondary-text'>Choose between chat, learning, or an AI friend for personalized learning support. Your gateway to knowledge and connection.</p>
      </div>
    <div className='dashboard-categories'>
    {dashboardData.map((item, index) => {
      return <Categories key={index} {...item} />
    })}
    </div>
    </div>
  )
}
