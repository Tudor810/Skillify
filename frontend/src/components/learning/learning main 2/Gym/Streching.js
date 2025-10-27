import React, {useState} from 'react'
import {TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 

import TextArea from '../TextArea';

export default function Streching({ streching, handleStrechingChange, userLanguage, changeValue, data, handleChange, subtractCredits, category, categories, planType, toggleSaved, setCookie}) {

    
    const [error, setError] = useState("")
    const [writing, setWriting] = useState("")

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
    
      

      const handleGenerate = async () => {
    
        const {muscle, period, number} = data
    
        if(writing === true) return 
    
        setWriting(true)
        setError("")
        changeValue("")
        
        if(muscle.trim() === "")
        {
            setWriting(false)
            setError("You need to specify a muscle")
            return
        } else if(period.trim() === "")
        {
          setWriting(false)
          setError("You need to specify a time period")
          return
        } else if(number.trim() === "")
        {
          setWriting(false)
          setError("You need to specify a number of exercises")
          return
        }

          try {
            const resp = await fetch("https://api.skillify-ai.com/chatgpt/all-streching", {
            credentials: "include",
        method: "POST",
            body: JSON.stringify({ category: category,
                muscle: muscle,
                number: number,
                userLanguage: userLanguage
            }), 
            headers: {
                "Content-Type": "application/json"
            },
            }) 
            const reader = resp.body.getReader()
    
            let strechingTitles = ""
            const processStream = async () => {
            const { done, value } = await reader.read();
        
            if (done) {
            setWriting(false)
            setCookie("streching", JSON.stringify({titles: strechingTitles, content: [], open: []}))
            toggleSaved()
              if(categories.includes(category))
                return
              else if(planType === "Tool" || planType === "Full")
                return
              else
                subtractCredits(50)
              
                return;
            }
    
            const chunk = new TextDecoder().decode(value);
            strechingTitles += chunk
            changeValue(chunk)
            return processStream();
            };
    
            processStream();
            
            } catch (err) {
            setWriting(false)
            setError("Something went wrong")
            console.log(err);
        }
      }

  return (
    <section className='equipment-section'>
        <ThemeProvider theme={theme}>
        <h3 className='tool-description'>Sore muscles? Try this!</h3>
                  <TextField
                    name='muscle'
                    onChange={handleChange}
                    value={data.muscle}
                    className='text-input'
                    placeholder='What muscle is sore?'
                />
                 
            <div className='secondary-section'>
                <TextField
                    name='number'
                    onChange={handleChange}
                    value={data.number}
                    className='text-input'
                    placeholder='Exercise number'
                    type='number'
                />
                <TextField
                    name='period'
                    onChange={handleChange}
                    value={data.period}
                    className='text-input'
                    placeholder='Time period (hours)'
                    type='number' 
                />
            </div>
                        
            <TextField  
                name='moreInfo'
                onChange={handleChange}
                value={data.moreInfo}
                className='text-input'
                placeholder='Additional information (specific exercise, equipment)'
            />
            <button onClick = {handleGenerate} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Exercises<i className="fa-solid fa-circle-down"></i></button>
            {error && <span className='error'>{error}</span>}
            
            <TextArea 
                value={streching}
                handleChange={handleStrechingChange}
            />
        </ThemeProvider>
    </section>
  )
}
