import React from 'react'
import {useInView, animated} from '@react-spring/web'

import books2 from '../../images/books2.webp'
import books from '../../images/books-mobile.webp'
export default function AboutUs({width, height}) {

    const [ref, springs] = useInView(
        () => ({
          from: {
            opacity: 0,
          },
          to: {
            opacity: 0.7,
          },
        }),
        {
          rootMargin: '-40% -40%',
          once: true,
        },
        
    
      )
    

  return (
    <>
    {width >= 1000 && <animated.div
            ref = {ref}
            style={{
                ...springs,
                width: '100%',
                background: `url(${books2})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: `calc(175vh * 969 / ${height}`,
            }}
        >
        </animated.div>}
        {width < 1000 && 
            <animated.div

            ref = {ref}
            style={{
                ...springs,
                width: '100%',
                background: `url(${books})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: `calc(170vh * 969 / ${height}`
            }}
        >
        </animated.div>
        }
    </>
  )
}
