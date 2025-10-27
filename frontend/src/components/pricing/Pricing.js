import React, { useState} from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import {Helmet} from 'react-helmet'

import '../../css/pricing.css'
import PricingCard from '../home/PricingCard'
import {lessonPlan, fullPlan, freePlan} from '../home/data'
import {toolPlan} from '../home/data'
import {useSpring,animated} from '@react-spring/web'
import Question from './Question'
import {questions} from '../home/data'
import ContactPopover from '../header/ContactPopover'

export default function Pricing({isAuthentificated}) {

    const [switchOn,setSwitchOn] = useState(true)

    
    const switchProps = useSpring({
        transform: switchOn ? `translateX(40px)` : 'translateX(1px)',
        config: {
            mass: 1,
            tension: 500,
            friction: 30
          }
    })

    const [anchorEl,setAnchorEl] = useState(null)

    const toggleAnchorEl = (event) => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null)

  return (
    <div className='pricing-page'>
        <Helmet>
            <title>Get access to AI Courses on Skillify at reasonable pricing</title>
            <meta name = "description" content='Ask AI questions and learn potential skills 3x faster through AI courses available on Skillify. Our pricing is reasonably low for your convenience.' />
            <link rel="canonical" href="https://skillify-ai.com/pricing" />
        </Helmet>
        <div className='pricing-text'>
            <h1 className='pricing-page-title'>Learn new skills AFFORDABLY with our expert plans.</h1>
            <p>Learning new skills doesn't have to cost a fortune. With our affordable learning plans, you can acquire valuable knowledge and expertise at an affordable price. </p>
        </div>
        <div className='pricing-select'>
            <span className={classNames('month',{'month-inactive': switchOn})}>Standard</span>
            <div className='switch' onClick={() => setSwitchOn(prevState => !prevState)}>
                <animated.div style={switchProps} className='handle'>

                </animated.div>
            </div>
            <span className={classNames('month',{'year-inactive': !switchOn})}>Premium</span>
         </div>
         <div className='pricing-cards'>
            <PricingCard isAuthentificated={isAuthentificated} timePrice={switchOn} data={freePlan} />
            {/* <PricingCard isAuthentificated = {isAuthentificated} timePrice = {switchOn} data = {categoryPlan}/> */}
            <PricingCard isAuthentificated = {isAuthentificated} timePrice = {switchOn} data={toolPlan} />
            <PricingCard isAuthentificated = {isAuthentificated} timePrice={switchOn} data = {lessonPlan} />
            <PricingCard isAuthentificated = {isAuthentificated} timePrice={switchOn} data = {fullPlan} />
         </div>  
         <div className='FAQ-pricing'>
            <div className='FAQ-title' id = "contact-pricing">
                <h2>Frequently Asked Questions</h2>
                <h4>Have questions? Reach via <a target = "_blank"  rel="noreferrer" href = "https://discord.gg/KZeXgW3ZXB">Discord</a> or <p onClick={toggleAnchorEl}>mail</p></h4>
                <ContactPopover  anchorEl = {anchorEl} containerId={'contact-pricing'} handleClose = {handleClose}/>
            </div>
            <div className='all-questions'>
                <Question question = {questions[0].question} answear={questions[0].answear}/>
                <Question question = {questions[1].question} answear={questions[1].answear}/>
                <Question question = {questions[2].question} answear={questions[2].answear}/>
            </div>
            <span><Link to = "/faq">See more questions</Link></span>
         </div>
    </div>
  )
}
