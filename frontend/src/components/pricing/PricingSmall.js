import React, { useState } from 'react'
import {Button, Dialog, DialogContent, DialogTitle} from '@mui/material'
import {useSpring,animated} from '@react-spring/web'
import classNames from 'classnames'
import {Link} from 'react-router-dom'

import {smallPricingData} from '../home/data'
import PricingSmallCard from './PricingSmallCard'

export default function PricingSmall({open,handleClose}) {

    const [switchOn,setSwitchOn] = useState(false)

    const switchProps = useSpring({
        transform: switchOn ? `translateX(40px)` : 'translateX(1px)',
        config: {
            mass: 1,
            tension: 500,
            friction: 30
          }
    })


    const smallPricingElements = smallPricingData.map((element,index) => {
        return <PricingSmallCard  key={index} {...element} switchOn = {switchOn}/>
    })

  return (
    <Dialog
        open = {open}
        onClose={handleClose}
        PaperProps={{
            style: {
                borderRadius: 'var(--border-radius)',
                minWidth: '30%'
            }
        }}
    >
        <DialogTitle sx={{
            fontSize: '1.6rem',
            
        }}>Upgrade your plan</DialogTitle>
        <DialogContent>
            <div className='pricing-small'>
                <div className='pricing-small-top'>
                    <h4>Subscriptions</h4> 
                    <div className='pricing-select'>
                        <span className={classNames('month',{'month-inactive': switchOn})}>Mth</span>
                        <div className='switch' style = {{backgroundColor: "rgb(220,220,220)"}} onClick={() => setSwitchOn(prevState => !prevState)}>
                            <animated.div style={switchProps} className='handle'>

                            </animated.div>
                        </div>
                        <span className={classNames('month',{'year-inactive': !switchOn})}>Yr</span>
                    </div>
                </div>
                <div className='pricing-small-elements'>
                    {smallPricingElements}
                </div>
                <div>
                    <Link className = "link-container"to = "/pricing">                   
                        <p>See payment plans in more detail!</p>
                        <h4>Pricing</h4>
                    </Link>
                </div>
                <div className='cancel-button-container'>
                    <Button className='cancel-button' onClick={handleClose}>Cancel</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}
