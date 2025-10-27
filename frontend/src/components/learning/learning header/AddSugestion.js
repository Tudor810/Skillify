import React, { useState } from 'react'
import {Button, Dialog, DialogContent, IconButton} from '@mui/material'
import httpClient from '../../../httpClient'


export default function AddSugestion({extraCredits, email, open, handleClose, addCredits}) {

    
    const [suggestion, setSuggestion] = useState("")
    const [succes, setSucces] = useState("")
    const [error, setError] = useState("")

    const handleChange = (e) => setSuggestion(e.target.value)


    

    const submitSuggestion = async () => {

        try {
            
            setError("")
            if(suggestion.trim() === "") 
            {
                setError("Suggestion can't be empty")
                return
            }

            httpClient.post("https://api.skillify-ai.com/suggestion",{
                content: suggestion,
                email: email
            })

            setSucces("Suggestion sent successfully")

            setSuggestion("")
            setTimeout(() => {
                handleClose()
            }, 1000)
           
            if(extraCredits["suggestion"] === true) return

            extraCredits["suggestion"] = true

            await httpClient.patch("https://api.skillify-ai.com/users/credits", {
                type: "suggestion"
            }) 

            addCredits()

        } catch (err) {
            console.log(err);
            setError("Something went wrong, please contact us if the problem persists")
        }
        
    }
  return (
    <>
        <Button onClick = {handleClose} className = "menu-button" >Write your Suggestions</Button>
        <Dialog
            open = {open}
            onClose={handleClose}
            PaperProps={{sx: {
                width:"70%",
            }}}
        >
            <DialogContent className='more-credits suggestion'>

                <IconButton style = {{color: "#aaa"}} className = "icon-profile" onClick = {handleClose} >
                    <i className="fa-solid fa-xmark"></i>
                </IconButton>
                <div>
                    <p className='main-text'>Write your suggestions to improve our website!</p>
                    <p className='secondary-text'>We take every suggestion into consideration!</p>
                </div>
               
               <textarea 
                    value={suggestion}
                    onChange={handleChange}
                    placeholder="Your suggestions here..."
                    className='suggestion-textarea'
               />

               <button className='submit-suggestion' onClick={submitSuggestion}>Submit</button>
               {error && <span className='error'>{error}</span>}
               {succes && <span className='succes'>{succes}</span>}
            </DialogContent>
        </Dialog>
    </>
  )
}
