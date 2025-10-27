import React from 'react'

import {useTrail, useInView, animated} from '@react-spring/web'
import {cardsData} from './data'
import Card from './Card'
import AboutUsContent from './AboutUsContent'
import Faq from './Faq'


export default function Cards({width, isAuthentificated}) {

  const [ref, inView] = useInView({
    once: true,
    threshold: 0.2,
  });


  const trail = useTrail(cardsData.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    delay: 200,
    config: {mass: 1, tension: 20, friction: 20}

  });

  return (
    <>
    <div className='cards-container' >
      <h1>Some categories that Skillify can teach you</h1>
      <div className = "cards" ref={ref}>
      {trail.map((props, index) => (
        <animated.div key = {index}  style={props} className='card-container'>
           <Card data={cardsData[index]} isAuthentificated = {isAuthentificated}/>
        </animated.div> 
      ))}
      </div>
    </div>
    <div className='about-us-container'>
      <AboutUsContent />
    </div>
    <div className = 'faq-container'>
      <Faq />
    </div>
    {/* <Footer /> */}
    </>
  )
}
