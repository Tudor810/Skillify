import React from 'react'
import {categories} from '../../home/data'
import Category from './Category'


import '../../../css/AboutUs.css'

export default function Main({width}) {

 
  const categoryComponents = categories.map((item, index) => {
    return <Category key={index} {...item} width={width}/>
  })
  return (
    <main className='main-learning'>
        <h1>Explore our categories</h1>
        <div className='categories'>
          {categoryComponents}
        </div>
    </main>
  )
}
