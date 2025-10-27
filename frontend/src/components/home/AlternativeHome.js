import React, {useState, useEffect} from 'react'
import {useSpring, animated} from '@react-spring/web'


import background from '../../images/background-mobile.webp'
import background2 from '../../images/background2.webp'

export default function AlternativeHome({width}) {

    const [appear, setAppear] = useState(false)
    

    useEffect(() => {
         setAppear(true)
    },[])
    
    const appearProps = useSpring({

        opacity: !appear ? '0' : '1',
        config:{mass:1 ,tension:30,friction:20}
      })
  return (
    <>
    {width >= 1000 && <animated.div
      className= "background"
        style={{
            ...appearProps,
            width: '100%',
            background: `url(${background2})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '100vh'
        }}
    >
    </animated.div>}
    {width < 1000 && <animated.div
      className= "background"
        style={{
            ...appearProps,
            width: '100%',
            background: `url(${background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            opacity: 0.4
        }}
    >
    </animated.div>}
    
    </>
  )
}
