
import React, {useEffect, useState} from 'react'
import { FormControl, Select, InputLabel, MenuItem, Dialog, IconButton} from '@mui/material';
import Cookies from 'js-cookie'
import { selectStyle, languagesArray } from './components/home/data';
import {useSpring, animated} from '@react-spring/web'

export default function GoogleTranslate() {

    const [selected, setSelected] = useState(Cookies.get("googtrans") ? Cookies.get("googtrans") : "/auto/en")
    const [confirmChange, setConfirmChange] = useState(false)
    const [appear, setAppear] = useState(false)


    useEffect(() => {
        if(!Cookies.get("show-translate"))
        {
          setAppear(true)
          Cookies.set("show-translate", true)
        }
        else 
        {
          const translate = document.querySelector('.translate-page')

          translate.style.display = 'none'
        }
    }, [])

    const props = useSpring({
      opacity: appear ? 1 : 0,
      height: appear ? '175px' : '0px', 
      config: { mass: 1, tension: 200, friction: 30 },
    })

    const toggleConfirmChange = () => setConfirmChange(prevState => !prevState)

    const handleChangeLanguage = (event) => {

        const {value} = event.target
        setSelected(value)
        
        toggleConfirmChange() 
       
    }

    const handleChangeCookie = () => {
        if(Cookies.get("googtrans"))
        { 
            Cookies.remove("googtrans")
            Cookies.set('googtrans', selected)
        }
        else {
            Cookies.set('googtrans', selected)    
        }
          
        window.location.reload()
    }
    const handleClose = () => {
      setAppear(false)
      setTimeout(() => {
        const translate = document.querySelector('.translate-page')

        translate.style.display = 'none'
      }, 500)
    }
  return (
    <animated.div style = {props} className='translate-page'>
        <IconButton style = {{color: "#aaa"}} className = "icon-profile" onClick = {handleClose} >
           <i className="fa-solid fa-xmark"></i>
        </IconButton>
        <p translate='no'>Change the language of the website</p>

        <FormControl className='select-container '>
                <InputLabel translate = "no" htmlFor="language" sx={{
                    color: "white"
                  }}>Language</InputLabel>
                <Select 
                  translate='no'
                  id='food-or-drink'
                  className='select'
                  sx={selectStyle}
                  placeholder='Language'
                  label = "Language"
                  name = "language"
                  value={selected}
                  onChange={handleChangeLanguage}
                  MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: 'var(--card-background)',
                      paddingInline: '15px'
                    },
                  }}}
                > 
                  {languagesArray.map((item, index) => (<MenuItem translate = "no" key = {index} className='mui-menu-item' value = {item.value}>{item.label}</MenuItem>))}
                </Select>
              </FormControl>
              <Dialog 
                open = {confirmChange}
                onClose={toggleConfirmChange}
              >
                <div className='confirm-language'>
                  <div>
                    <h2>Confirm the new language</h2>
                    <p>Once you choose a new language you can change it in account settings</p>
                  </div>
                  <button onClick = {handleChangeCookie} className='language-button confirm-language-button'>Confirm</button>
                  <button onClick = {toggleConfirmChange} className='language-button cancel-language-button'>Cancel</button>
                  
                </div>
              </Dialog>
    </animated.div>
    
  )
}
