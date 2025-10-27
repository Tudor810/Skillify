import React,{useState} from 'react'

import ProfileMenu from './ProfileMenu';
import userBasic from '../../../images/userBasic.jpg'
import { Link, useLocation } from 'react-router-dom';
import MoreCreditsInfo from './MoreCreditsInfo';

export default function LearningHeader({toggleOpenPricing,width, userLanguage, changeLanguage, data, addCredits, openCreditDialog, handleCloseCredit, openTutorial}) {

    
    const location = useLocation()

    const [anchorEl,setAnchorEl] = useState(null);
    const [close, setClose] = useState(false)


    const toggleClose = () => setClose(prevState => !prevState)

    const toggleAnchor = (event) => setAnchorEl(event.currentTarget)

    const handleClose = () => {
        if(anchorEl)
        {
            setAnchorEl(null)
        }
           
    }
    const [openCredit, setOpenCredit] = useState(false)

    const handleCloseMoreCredit = () => setOpenCredit(prevState => !prevState)
   
  return (
    data &&
    <header className='learning-header'>
        <nav className='learning-nav'>
            <div className='left-side'>
                <div className="logo">
                    <Link to="/">
                    {/* <img src={DarkLogo} alt="Footer-Logo" /> */}
                    <p translate="no" className={`${location.pathname.split('/')[1] === "learn" || location.pathname === "/saved" ? "no-line" : ""}`}>Skillify<span>.</span></p>
                    </Link>
                </div>
            </div>
            <div className='right-side' >
                <div onClick={(event) => {
                    toggleAnchor(event)
                    if(close === true)
                    {   
                        toggleClose()
                    }
                        
                    }} id = "user-info-header"className='learning-user-info'>
                    <div className='user-info'>
                    {width > 500 && <div className='learning-text-info'>
                            <p translate="no" className='user-name'>{data.username}</p>
                            <p className='credits-left'>Credits left: {data.credits}</p>
                            {data.planType && data.planType.split(" ")[1] !== "Premium" && <p>{data.superCredits} <i className="fa-solid fa-rocket"></i></p>}
                        </div> }
                        <img className = 'profile-picture' src={data.image ? data.image : userBasic} alt='Profile'/>
                    </div>
                    
                    <ProfileMenu 
                        userLanguage = {userLanguage}
                        data = {data}
                        width={width}
                        toggleOpenPricing={toggleOpenPricing}
                        anchorEl = {anchorEl} 
                        toggleAnchor = {toggleAnchor} 
                        handleClose = {handleClose}
                        changeLanguage = {changeLanguage}
                        close={close}
                        toggleClose={toggleClose}
                        addCredits = {addCredits}
                        handleCloseCredit = {handleCloseMoreCredit}
                        openCreditDialog = {openCredit}  
                        openTutorial = {openTutorial} 
                    />
                    <MoreCreditsInfo 
                        open = {openCreditDialog}
                        handleClose = {handleCloseCredit}
                        extraCredits = {data.extraCredits}
                        addCredits2={addCredits}
                        openSuggestion = {openCredit}
                        handleCloseCredit = {handleCloseMoreCredit}
                    />
                </div>
            </div>
        </nav>
    </header> 
  )
}
