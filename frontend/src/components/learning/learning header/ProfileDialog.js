import React, { useEffect, useState } from 'react'
import {  Avatar, Button, Dialog, IconButton, MenuItem, Select} from '@mui/material'
import {ContentCopy} from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom'
import {useSpring,animated} from '@react-spring/web'
import userBasic from '../../../images/userBasic.jpg'
import Succes from '../Succes';
import httpClient from '../../../httpClient';
import { selectStyle, languagesArray, learningTechniques } from '../../home/data';
import DeletPlan from '../../404page/DeletPlan';
import ConfigurePayment from '../../pricing/ConfigurePayment'
import Cookies from 'js-cookie';

export default function ProfileDialog({open,handleClose,width, data, userLanguage, changeLanguage}) {

    const [copyEmail,setCopyEmail] = useState(false)
    const [hoverEmail,setHoverEmail] = useState(false)
    const [emailCopied,setEmailCopied] = useState(false)

    const [openDelete, setOpenDelete] = useState(false)

    const [learningTechnique, setLearningTechnique] = useState("Exam Past Paper Technique")

    const changeLearningTechnique = (e) => {
        setLearningTechnique(e.target.value)
    }
    const toggleOpenDelete = () => setOpenDelete(prevState => !prevState)
 
    const [error, setError] = useState("")
    const [succes, setSucces] = useState("")

    const [websiteLanguage, setWebsiteLanguage] = useState(Cookies.get("googtrans") ? Cookies.get("googtrans") : "/auto/en")


    
    useEffect(() => {
        const getTechnique = async () => {

            try {
                const resp = await httpClient.get("https://api.skillify-ai.com/users/technique")
                
                setLearningTechnique(resp.data.technique)
            } catch (err) {
                console.log(err);
            }

        }

        getTechnique()

    },[])
    /// Change language in database
    
    const handleCloseSnackbar = (_, reason) => {
        if(reason === 'clickaway')
            return

        setEmailCopied(false)
    }
    const props = useSpring({
        transform: !copyEmail ? hoverEmail ? 'scale(105%)' : 'scale(100%)' : 'scale(90%)',
        config: {duration: 100}
    })

    const handleHover = () => {
        setHoverEmail(true)
    }
    const handleClick = () => {
        setCopyEmail(true)
        setEmailCopied(true)
        const textToCopy = data.email
        navigator.clipboard.writeText(textToCopy);
    }
    const handleMouseLeave = () => {
        setHoverEmail(false)
        setCopyEmail(false)
    }
    const navigate = useNavigate()

    const handleDeleteAccount = async () => {
        try {
            await httpClient.delete('https://api.skillify-ai.com/users/delete')

            navigate('/')
        }
        catch(err) {
            console.log(err);
            setError("Something went wrong, if the problem persists please contact us")
        }
      
    }

    const saveLanguage = async () => {
        try {
            await httpClient.post('https://api.skillify-ai.com/users/language', {
                language: userLanguage,
                technique: learningTechnique   
            })
            setSucces("Language changed successfully, you need to refresh the page before you generate anything!")
        } catch (err) {
            console.log(err);
        }
    }

    const handleChangeWebsiteLanguage = (event) => {

        const {value} = event.target
        setWebsiteLanguage(value)

        if(Cookies.get("googtrans"))
        { 
            Cookies.remove("googtrans")
            Cookies.set('googtrans', value)
        }
        else {
            Cookies.set('googtrans', value)    
        }
          
        window.location.reload()
    }
  return (
    <Dialog
        open = {open}
        onClose={handleClose}
        PaperProps={{sx : { 
           borderRadius: '0.75rem',
           width: width > 1200 ? '25%' : width > 576 ? '50%' : '75%',
           backgroundColor: 'var(--card-background)'
        }}}

    >
        {width > 500 && <div className='profile-top'>
                <Avatar sx={{
                    height: '130px',
                    width: '130px',
                    border: ' 1.5px solid #fff',
                    position: 'absolute',
                    bottom: '-50px'
            }}><img alt = "Profile" className = 'profile-photo' src= {data.image ? data.image : userBasic} />
                </Avatar>
           
        </div>}
        <div className='profile-bottom' style={{marginTop: width <= 500 ? '20px' : '80px'}}>
            <h2 className='username' translate= "no">{data.username}</h2>
            <IconButton style = {{color: "white"}} className = "icon-profile" onClick = {handleClose} >
                <i className="fa-solid fa-xmark"></i>
            </IconButton>
            <div className='email-container'>
                <span className='label'>Email</span>
                <animated.div 
                    translate= "no"
                    onMouseDown = {handleClick} 
                    onMouseEnter={handleHover} 
                    onMouseLeave={handleMouseLeave}
                    onMouseUp = {() => setCopyEmail(false)}
                    style = {props} className='email-information'
                >
                    {data.email}
                    <IconButton sx = {{
                        color: 'white'
                    }}>
                        <ContentCopy /> 
                    </IconButton>
                </animated.div>
                <Succes
                    open = {emailCopied}
                    handleClose={handleCloseSnackbar}
                    text = "Email copied to clipboard"
                />

            </div>
            <div className='membership'>
                <p>Memebership</p>
                <ConfigurePayment data={data} />
            </div>
            <div className='credit'>
                <div>
                    <p>Currently used learning technique</p>
                </div>
                {data.planType !== "Free" && <Select
                    value={learningTechnique}
                    onChange={changeLearningTechnique}
                    className='select'
                    sx={selectStyle}
                    MenuProps={{
                        PaperProps: {
                          sx: {
                            backgroundColor: 'var(--card-background)',
                            paddingInline: '15px',
                            height: '400px',
                          },
                          
                    }}}
                >
                    {learningTechniques.map((item, index) => {
                        return <MenuItem className = "mui-menu-item" key={index} sx={{
                            backgroundColor: 'var(--card-background)'
                        }} value = {item.title}>{item.title}</MenuItem>
                    })}
                </Select>}
                {data.planType === "Free" && 
                    <Button className='no-acces'><i className="fa-solid fa-lock"></i> Premium only</Button>
                }
            </div>
            <div className='credit'>
                <div>
                    <p>Preferred languages</p>
                </div>
                <div className='secondary-section' style={{gap: '10px'}}>
                    <div className='language-container'>
                        <Select
                            translate='no'
                            value={userLanguage}
                            onChange={changeLanguage}
                            className='select'
                            sx={selectStyle}
                            MenuProps={{
                                PaperProps: {
                                sx: {
                                    backgroundColor: 'var(--card-background)',
                                    paddingInline: '15px',
                                    height: '400px',
                                },
                                
                            }}}
                        >
                            {languagesArray.map((item, index) =>
                            (<MenuItem 
                                translate = "no" key = {index}
                                className='mui-menu-item' 
                                value = {item.label}
                            >{item.label}
                            </MenuItem>))}
                        </Select>
                        <p className='description'>The Ai will respond in this language</p>
                    </div>
                    <div className='language-container'>
                        <Select
                            translate='no'
                            value={websiteLanguage}
                            onChange={handleChangeWebsiteLanguage}
                            className='select'
                            sx={selectStyle}
                            MenuProps={{
                                PaperProps: {
                                sx: {
                                    backgroundColor: 'var(--card-background)',
                                    paddingInline: '15px',
                                    height: '400px',
                                },
                                
                            }}}
                        >
                            {languagesArray.map((item, index) =>
                            (<MenuItem 
                                translate = "no" key = {index}
                                className='mui-menu-item' 
                                value = {item.value}
                            >{item.label}
                            </MenuItem>))}
                        </Select>
                        <p className='description'>The website will be in this language</p>
                    </div>
                </div>
                <button onClick = {saveLanguage} className = "save-language">Save Changes</button>
                {succes && <span className='succes'>{succes}</span>}
            </div>
            <Button onClick = {toggleOpenDelete} className='delete-button'>Delete account</Button>
            <DeletPlan open={openDelete} handleClose={toggleOpenDelete} handleDelete={handleDeleteAccount} error={error}/>
            <div className='profile-bottom-detail'>
                <Link to = "/privacy-policy">Privacy policy</Link>
                ·  
                <Link to = "/terms-of-service">Terms</Link> 
            </div>
        </div>

    </Dialog>
  )
}
