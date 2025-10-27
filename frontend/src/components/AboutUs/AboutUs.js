import React, { useEffect, useState } from "react";
import "../../css/AboutUs.css";

import { useSpring, animated } from "@react-spring/web";
import {Helmet} from 'react-helmet'
import Item from "./Item";
import { communityData, moreData, skillifyData, solutionsData } from "../home/data";


export default function AboutUs({width}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 500);
  }, []);
  const props = useSpring({
    opacity: !loading ? "0" : "1",
  });

  const [selected, setSelected] = useState({
    first: true,
    second: false,
    third: false,
    fourth: false
  })

  const props1 = useSpring({
    delay: 100,
    opacity: selected.first ? 1 : 0,
    display: selected.first ? 'flex' : "none",
    config: { mass: 1, tension: 150, friction: 20 },
  })

  const props2 = useSpring({
    delay: 100,
    opacity: selected.second ? 1 : 0,
    display: selected.second ? 'flex' : "none",
    config: { mass: 1, tension: 150, friction: 20 },
  })

  const props3 = useSpring({
    delay: 100,
    opacity: selected.third ? 1 : 0,
    display: selected.third ? 'flex' : "none",
    config: { mass: 1, tension: 150, friction: 20 },
  })

  const props4 = useSpring({
    delay: 100,
    opacity: selected.fourth ? 1 : 0,
    display: selected.fourth ? 'flex' : "none",
    config: { mass: 1, tension: 150, friction: 20 },
  })

 
  
const handleChangeContent = (number) => {

    switch(number)
    {
      case 1:
        setSelected({
          first: true,
          second: false,
          third: false,
          fourth: false
        })
        break;
      case 2: 
        setSelected({
          first: false,
          second: true,
          third: false,
          fourth: false
        })
        break;
      case 3: 
        setSelected({
          first: false,
          second: false,
          third: true,
          fourth: false
        })
        break;
      case 4: 
        setSelected({
          first: false,
          second: false,
          third: false,
          fourth: true
        })
        break;
      

      default: 
        break


    }
  }
  return (
    <>
    
      <animated.div className="about-us" style={props}>

        <Helmet>
            <title> Master any skill you desire with Skillify AI Courses</title>
            <meta name = "description" content='Skillify is your go-to AI platform for learning exceptional skills. Know more about us and our AI courses today. We can help unlock your potential.' />
            <link rel="canonical" href="https://skillify-ai.com/about-us" />
        </Helmet>
      
         <div className="big-text-bg">
            <p translate="no">Skillify</p>
          </div>
        <div className="skillify">
          <h1>Who are we?</h1>
          <p>
            <strong>Welcome to Skillify</strong>,
            where we believe in breaking free from the shackles of endless hours spent learning. 
            We understand the frustration of traditional education and the challenges that arise when trying to acquire new skills. 
            That's why we've created an innovative solution to revolutionize the learning experience.
          </p>
          <p>
          Our journey began as a response to the challenges faced by the education system, particularly in Europe,
           where teacher protests over salaries disrupted traditional learning environments. 
           Witnessing the impact of these protests and the refusal of teachers to attend classes,
            we saw an opportunity to reimagine education. This led to the birth of Skillify, 
            the ultimate learning platform designed to empower individuals to take control of their learning journey. 
          </p>
        </div>

      
        <div className="tabs-container">
          <h1>How are we doing it?</h1>
          {width > 1000 && <div className="tabs">
            <ul className="tabs-navbar">
              <li className = {`${selected.first ? "tab-active" : ""}`} onClick={() => handleChangeContent(1)}><p className="tab-text" ><i className="fa-solid fa-graduation-cap"></i>Skillify</p></li>
              <li className = {`${selected.second ? "tab-active" : ""}`} onClick={() => handleChangeContent(2)}><p className="tab-text" ><i className="fa-solid fa-toolbox"></i>Skillify's solutions</p></li>
              <li className = {`${selected.third ? "tab-active" : ""}`} onClick={() => handleChangeContent(3)}><p className="tab-text" ><i className="fa-solid fa-user-group"></i>Growing community</p></li>
              <li className = {`${selected.fourth ? "tab-active" : ""}`} onClick={() => handleChangeContent(4)}><p className="tab-text" ><i className="fa-solid fa-wand-magic-sparkles"></i>More are on the way</p></li>
            </ul>
            <div className="tabs-content">
              <animated.div style = {props1} className="personalized-lessons">
                  {skillifyData.map((item, index) => (<Item key = {index} {...item} />))}
              </animated.div>
              <animated.div style = {props2} className="specialized-tools">
                {solutionsData.map((item, index) => (<Item key = {index} {...item} />))}
              </animated.div>
              <animated.div style = {props3} className="growing-community">
                {communityData.map((item, index) => (<Item key = {index} {...item} />))}
              </animated.div>
              <animated.div style = {props4} className="more-are-on-the-way">
                {moreData.map((item, index) => (<Item key = {index} {...item} />))}
              </animated.div>
            </div>
          </div> 
          }

          {width <= 1000 && <div className="tabs tabs-mobile">
            <ul className="tabs-navbar">
              <li className = {`${selected.first ? "tab-active" : ""}`} onClick={() => handleChangeContent(1)}>
                <p className="tab-text"><i className="fa-solid fa-graduation-cap"></i>Personalized lessons </p>
                <animated.div style = {props1} className="tabs-content">
                  <div className="personalized-lessons">
                    {skillifyData.map((item, index) => (<Item key = {index} {...item} />))}
                  </div>
                </animated.div>
              </li>
              <li className = {`${selected.second ? "tab-active" : ""}`} onClick={() => handleChangeContent(2)}>
                <p className="tab-text"><i className="fa-solid fa-toolbox"></i>Specialized tools</p>
                <animated.div style = {props2} className="tabs-content">
                  <div className="specialized-tools">
                    {solutionsData.map((item, index) => (<Item key = {index} {...item} />))}
                  </div>
                </animated.div>
              </li>
              <li className = {`${selected.third ? "tab-active" : ""}`} onClick={() => handleChangeContent(3)}>
                <p className="tab-text"><i className="fa-solid fa-user-group"></i>Growing community</p>
                <animated.div style = {props3} className="tabs-content">
                <div className="growing-community">
                  {communityData.map((item, index) => (<Item key = {index} {...item} />))}
                </div>
                </animated.div>
              </li>
              <li className = {`${selected.fourth ? "tab-active" : ""}`} onClick={() => handleChangeContent(4)}>
                <p className="tab-text"><i className="fa-solid fa-wand-magic-sparkles"></i>More are on the way</p>
                <animated.div  style = {props4} className="tabs-content">
                  <div className="more-are-on-the-way">
                    {moreData.map((item, index) => (<Item key = {index} {...item} />))}
                  </div>
                </animated.div>
              </li>
            </ul>
          </div>}
        </div>

        {/* <Footer /> */}
      </animated.div>
    </>
  );
}
