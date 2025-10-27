import {useSpring,animated} from '@react-spring/web'
import React,{useState,useEffect,useRef} from 'react'

function Slide( {number,element,image,elementClass,width} ) {
    const [startAnimation, setStartAnimation] = useState(false);
    const ref = useRef();
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setStartAnimation(true);
            observer.unobserve(ref.current);
          }
        },
        {
          rootMargin: '-50px 0px -50px 0px', // adjust as needed
        }
      );
  
      observer.observe(ref.current);
      const current = ref.current

      return () => {
        if (observer.current && current) {
          observer.unobserve(current);
        }
      };
    }, []);

    const props = useSpring({
      delay: 100,
      opacity: startAnimation ? 1 : 0,
      position: startAnimation ? 'relative': 'absoulte',
      transform: number ===  1 ? 'translateX(0)' : startAnimation ? 'translateX(0)' : number === 2  ? 'translateX(30%)' : 'translateX(-30%)' ,
      config: {mass: 1,tension: 50, friction: 10},
    })

    const propsPhone = useSpring({
      delay:100,
      position: 'relative',
      opacity:startAnimation ? 1 : 0,
      transform: startAnimation ? 'translateX(0)' : number === 1  ? 'translateX(40%)' : 'translateX(-40% )',
      config: {mass: 1,tension: 50, friction: 10},
      
    })

    return (
        <animated.div ref = {ref} style = {width > 1000 ? props : propsPhone} css={{ willChange: 'opacity, transform'}} className={elementClass}>
          {element}
        </animated.div>
    )
  }

export default Slide