import { Dialog, DialogContent, TextField } from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import React, { useState } from 'react'
import httpClient from '../../httpClient';

export default function AddThread({open, handleClose}) {

    const [data, setData] = useState({
        title: "",
        content: ""
    })  
    const [error, setError] = useState("")
    const [succes, setSucces] = useState("")

    const handleChange = (e) => {
        const {value, name} = e.target

        setData(prevState => ({
            ...prevState, 
            [name]: value
        }))
    }
    const theme = createTheme({
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)', // Customize the border color
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-color)', // Customize the active border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor:'var(--primary-color)' // Customize the active border color
                  },
                },
              },
            },
          },
        },
      });

      const handleAddThread = async () => {

        setError("")
        
        if(succes) return 

        setSucces("")

        if(data.title.trim() === "")
        {
            setError("The title can't be empty")
            return 
        } else if(data.content.trim() === "")
        {
            setError("The content can't be empty")
            return 
        }

        try {
            await httpClient.post("https://api.skillify-ai.com/chat", {
                title: data.title,
                content: data.content
            })

            setSucces("Thread added successfully")
            setTimeout(() => {
              setData({
                title: "",
                content: ""
              })
              handleClose()
            }, (400))
        } catch (err) {
            console.log(err);
            setError("Something went wrong, please try again later")
        }
   
      }

  return (
    <Dialog
        open = {open}
        onClose={handleClose}
        PaperProps={{
            sx: {
                width: '90%',
                maxWidth: '600px'
            }
        }}
    >
        <DialogContent className='add-thread-container'>
            <div className='text-container'>
                <h2 className='main-text'>Add your own thread</h2>
                <p className='secondary-text'>Everybody can see it</p>
            </div>
            <ThemeProvider theme={theme}>
                <TextField 
                    className='text-input'
                    label = "Title"
                    placeholder='I learned how to cook'
                    InputLabelProps={{sx: {
                        color: "white"
                    }}}
                    name='title'
                    value={data.title}
                    onChange={handleChange}
                />
                <TextField 
                    className='text-input'
                    label = "Content"
                    placeholder='I was struggling eating healthy food. Skillify helped me learn how to cook real food and now I feel better than ever!'
                    InputLabelProps={{sx: {
                        color: "white"
                    }}}
                    multiline
                    rows={5}
                    name='content'
                    value={data.content}
                    onChange={handleChange}
                />
            </ThemeProvider>
            <button className='add-thread-button' onClick={handleAddThread}>Add Thread</button>
            {error && <span className='error'>{error}</span>}
            {succes && <span className='succes'>{succes}</span>}
        </DialogContent>
    </Dialog>
  )
}
