import React, { useState } from 'react'
import { Button, ClickAwayListener, IconButton, Popover } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import ProfileDialog from './ProfileDialog'
import ContactPopover from '../../header/ContactPopover'
import httpClient from '../../../httpClient'
import MoreCredits from './MoreCredits'
import AddSugestion from './AddSugestion'

export default function ProfileMenu({anchorEl,handleClose,width, data, userLanguage, changeLanguage, close, toggleClose, addCredits, handleCloseCredit, openCreditDialog, openTutorial}) {

    const open = Boolean(anchorEl)

    const [openDialog,setOpenDialog] = useState(false)
    const [anchorElContact,setAnchorElContact] = useState(null)
    const [openSuggestion, setOpenSuggestion] = useState(false)

    const handleCloseSuggestion = () => setOpenSuggestion(prevState => !prevState)

    const toggleAnchorElContact = (event) => setAnchorElContact(event.currentTarget)

    const handleCloseContact = () => setAnchorElContact(null)
    const toggleDialog = () => setOpenDialog(prevState => !prevState)

    
    const navigate = useNavigate()
    const handleLogOut = async () => {
        try {
            const resp = await httpClient.get('https://api.skillify-ai.com/users/logout')
            if(resp.data.succes === true)
                navigate('/')
        } catch (err) {
            alert("Something went wrong with the server")
        }   
    }
    
    return (
        
            <Popover
                classes={{ paper: "custom-paper" }}
                container={() => document.getElementById('user-info-header')}
                open = {!close ? open : false}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            
            >
                <ClickAwayListener onClickAway={!openDialog ? handleClose : () => null}>
                    <div className='popover-content'>
                        <div className='top-section'>
                            <h4 className='plan-type'>{data.planType} plan</h4>
                            <p className='popover-email'>{data.email}</p>
                            <div className='upgrade-container'><Link to = "/pricing"><Button className = "upgrade-button">Upgrade</Button></Link></div>
                            <IconButton onClick = {() => {
                                handleClose()
                                toggleClose()
                            }} className='icon-profile'>
                                <i className="fa-solid fa-xmark"></i>
                            </IconButton>
                        </div>
                        <div className='bottom-section'>
                            <ul className='menu'>
                                <li className='menu-action'><Button  className = "menu-button" onClick={toggleDialog}>Account settings</Button></li>
                                <li className='menu-action' onClick={() => {
                                    handleClose()
                                    toggleClose()
                                }}><Link to = "/categories"><Button className='menu-button'>Categories</Button></Link></li>
                                <li className='menu-action' onClick={() => {
                                    handleClose()
                                    toggleClose()
                                }}><Link to = "/saved"><Button className = "menu-button" >My Library</Button></Link></li>
                                 <li className='menu-action' onClick={() => {
                                    handleClose()
                                    toggleClose()
                                }}><Link to = "/learning-techniques"><Button className = "menu-button" >Learning Techniques</Button></Link></li>
                                <li className='menu-action'><MoreCredits openSuggestion = {handleCloseSuggestion} addCredits2 = {addCredits} extraCredits={data.extraCredits} open = {openCreditDialog} handleClose = {handleCloseCredit} /></li>
                                <li className='menu-action'><AddSugestion addCredits = {addCredits} open = {openSuggestion} handleClose = {handleCloseSuggestion} email = {data.email} extraCredits={data.extraCredits}/></li>
                                <li className='menu-action' onClick={() => {
                                    handleClose()
                                    toggleClose()
                                }}><Button className = "menu-button" onClick={openTutorial}>Tutorial</Button></li>
                                <li className='menu-action' id = "contact-profile">
                                    <Button className = "menu-button"  onClick={toggleAnchorElContact}>Contact us</Button>
                                    <ContactPopover anchorEl = {anchorElContact} containerId={'contact-profile'} handleClose = {handleCloseContact} />
                                </li>
                                
                            </ul>
                            <div className='log-out-container'>
                                <Button onClick = {handleLogOut} className = "menu-button" id = 'log-out'>Log out</Button>
                            </div>
                        </div>
                    </div>
                </ClickAwayListener>
                <ProfileDialog 
                    userLanguage = {userLanguage} 
                    open = {openDialog} 
                    handleClose = {toggleDialog} 
                    width = {width} 
                    data = {data}
                    changeLanguage={changeLanguage}
                />
               
            </Popover>
   
  ) 
}
