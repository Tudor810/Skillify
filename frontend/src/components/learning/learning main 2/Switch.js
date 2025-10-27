import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import {ClickAwayListener, Popover} from '@mui/material'
export default function Switch({width, switchOn, toggleSwitch, rocket}) {

    
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
      setAnchorEl(null);
    };

    const switchProps = useSpring({ 
        transform: switchOn ? `translateX(40px)` : 'translateX(1px)',
        config: {
            mass: 1,
            tension: 500,
            friction: 30
          }
    })

   
    const open = Boolean(anchorEl);

  return (
    <>
    
      <div onMouseEnter = {width > 1000 ? handlePopoverOpen : null} onMouseLeave={width > 1000 ? handlePopoverClose : null} className='switch' onClick={toggleSwitch}>
        {switchOn && <div className='info-left'>Off</div>}
        <animated.div style={switchProps} className='handle'>
          <i className={`${switchOn ? "change-rocket fa-solid fa-rocket" : "fa-solid fa-rocket" }`}></i>
          {switchOn && <i className="fa-solid fa-fire-flame-simple"></i>}
        </animated.div>
        {!switchOn && <div className='info-right'>On</div>}
      </div>
      {width < 1000 &&  <ClickAwayListener onClickAway={handlePopoverClose}>
        <i onClick = {!open ? handlePopoverOpen : handlePopoverClose} className="fa-solid fa-circle-question"></i>
      </ClickAwayListener>}
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
       <div className='super-popover-content'> 
        <h2>What is <i className='fa-solid fa-rocket'></i>?</h2>

        <p><i className='fa-solid fa-rocket'></i> is a special feature enabling acces to Skillfy Full Experience Premium for all users!</p>
       </div>
      </Popover>
    </>
  )
}
