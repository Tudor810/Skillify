import React from 'react'
import { Popover} from '@mui/material'
export default function ContactPopover({anchorEl,handleClose,containerId}) {

    const open = Boolean(anchorEl)

  return (
    <Popover
        open = {open}
        anchorEl={anchorEl}
        onClose={handleClose}
        container={() => document.getElementById(containerId)}
        // transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
            // position: 'absolute',
            top: containerId === 'contact-profile' ? '50px' : '30px',
            left: containerId === 'contact-profile' || containerId === 'contact-support' ? '-10px' : '20px',
        }} 
        classes={{paper: 'contact-us'}}
        disableScrollLock
    >
        <p className='contact-par'>Contact us at <a className='gmail' target = "_blank" rel="noreferrer" href='https://mail.google.com/mail/u/0/#sent?compose=new'> skillify.ai7@gmail.com</a></p>
    </Popover>
  )
}
