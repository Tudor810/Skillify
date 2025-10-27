import React,{useState} from 'react'
import { Menu, MenuItem} from '@mui/material';
import GetStarted from '../sign in/GetStarted';
import { Link } from 'react-router-dom';

import ContactPopover from './ContactPopover';

export default function ProfileMenu() {

  const [anchorEl,setAnchorEl] = useState(null);
  const [openLogin,setOpenLogin] = useState(false)

  const [anchorElContact,setAnchorElContact] = useState(null)
  const toggleAnchorElContact = (event) => setAnchorElContact(event.currentTarget)
  const handleCloseContact = () => setAnchorElContact(null)

  const open = Boolean(anchorEl)

  const togglePopover = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLoginClose = () => {
    setOpenLogin(prevState => !prevState)
  }
  
  return (
      <>
        <div className="user-icon" onClick={togglePopover} id = "user">
                <i className ="fa-solid fa-user"></i>
        </div>
        <Menu
          container={() => document.getElementById('nav-menu-container')}
          open= {open}
          onClose={handleClose}
          anchorEl={anchorEl}
          MenuListProps={{
            'aria-labelledby': 'user',
          }}
        >
        <MenuItem onClick={() => setOpenLogin(true)}>Log in</MenuItem>
        <MenuItem><Link to = "/sign-up">Sign up</Link></MenuItem>
        <MenuItem id = "contact-support">
          <Link onClick={toggleAnchorElContact}>Support</Link>
          <ContactPopover anchorEl = {anchorElContact} containerId={'contact-support'} handleClose = {handleCloseContact}/>
        </MenuItem>
         
        </Menu>
        <GetStarted
          open = {openLogin}
          handleClose={handleLoginClose} 
        />
    </>
  )
}
