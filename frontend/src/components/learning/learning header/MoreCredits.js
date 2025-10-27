import React from 'react'
import {Button, Dialog, DialogContent, IconButton} from '@mui/material'
import httpClient from '../../../httpClient'

export default function MoreCredits({extraCredits, addCredits2, openSuggestion, open, handleClose}) {

   

    const addCredits = async (type) => {

        try {

            console.log(extraCredits);
            if(extraCredits[type] === true) return

            extraCredits[type] = true
            await httpClient.patch("https://api.skillify-ai.com/users/credits", {
                type: type
            })
            addCredits2()
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <>
        <Button onClick = {handleClose} className = "menu-button" >Get more free credits</Button>
        <Dialog
            open = {open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    maxWidth: '600px',
                    width: "95%"
                }
            }}
        >
            <DialogContent className='more-credits'>
                <div>
                    <p className='main-text'>You get <span className='color'>500 credits</span> everyday!</p>
                    <p className='secondary-text'>Complete more tasks & offers to get more credits for free!</p>
                </div>
                <IconButton style = {{color: "#aaa"}} className = "icon-profile" onClick = {handleClose} >
                    <i className="fa-solid fa-xmark"></i>
                </IconButton>
                <div className='buttons'>
                    <button onClick = {() => {
                        handleClose()
                        openSuggestion()
                    }} ><i className="fa-solid fa-comment"></i>Write your suggestions <span className='credits'>+200 credits</span></button>
                    <a onClick = {() => addCredits("discord")} target ="_blank" rel = "noreferrer" href = "https://discord.gg/KZeXgW3ZXB"><button><i className="fa-brands fa-discord"></i>Join our Discord server  <span className='credits'>+200 credits</span></button></a>
                    <a onClick = {() => addCredits("instagram")} target ="_blank" rel = "noreferrer" href='https://www.instagram.com/skillify_ai/'><button><i className="fa-brands fa-instagram"></i>Follow us on Instagram <span className='credits'>+200 credits</span></button></a>
                    <a onClick = {() => addCredits("tiktok")} target ="_blank" rel = "noreferrer" href='https://www.tiktok.com/@skillify_ai'><button><i className="fa-brands fa-tiktok"></i>Follow us on Tiktok <span className='credits'>+200 credits</span></button></a>
                </div>
            </DialogContent>
        </Dialog>
    </>
  )
}
