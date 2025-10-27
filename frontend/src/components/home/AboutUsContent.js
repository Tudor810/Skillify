import React from 'react'
import { useInView, animated } from '@react-spring/web'
import { Link } from 'react-router-dom'
export default function AboutUsContent() {

  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        transform: 'translateX(-40px)'
      },
      to: {
        opacity: 1,
        transform: 'translateX(0)'
      },
    }),
    {
      rootMargin: '-10% -10%',
      once: true,
    }
  )
  return (
    <animated.div ref = {ref} style = {springs} className='about-us-content'>
        <h1 className='title'>About us</h1>
        <p className='description'>Skillify emerged during nationwide teacher protests in Romania, demanding fair wages. Empty classrooms spurred us to create a comprehensive AI-powered learning app. After six months of dedicated work, we launched a cutting-edge platform empowering individuals to acquire any desired skill.</p>
        <Link to = "/about-us"><button className='home-button'>Learn more</button></Link>
    </animated.div>
  )
}
