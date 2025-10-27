import { Dialog, DialogContent, IconButton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';


export default function MoreCreditsInfo({open, handleClose, handleCloseCredit}) {


  return (
    <Dialog 
        open = {open}
        onClose={handleClose}
    >
        <DialogContent className='more-credits'>
            <div>
                <p className='main-text'><span> UPS!</span> It seems you have no more credits.</p>
                <p className = "secondary-text" >You can get new ones in one of the following way:</p>
            </div>
            <IconButton style = {{color: "#aaa"}} className = "icon-profile" onClick = {handleClose} >
                <i className="fa-solid fa-xmark"></i>
            </IconButton>
            <div className='buttons'>
            
            <Link to = "/pricing"><button className='upgrade-premium'><i className="fa-solid fa-graduation-cap"></i>Upgrade your Subscription</button></Link>
                <div className='or-section'>
                    <span></span>
                        <p>OR</p>
                    <span></span> 
                </div>
                <button onClick = {() => {
                    handleClose()
                    handleCloseCredit()
                }}><i className="fa-solid fa-gift"></i>Get free credits</button>
            </div>
        </DialogContent>
    </Dialog>
  )
}
