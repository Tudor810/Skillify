import React, {useState} from 'react'
import {  TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import TextArea from '../TextArea';

export default function Books2({userLanguage, changeValue, books, handleBooksChange, subtractCredits, category, categories, planType, toggleSaved, setCookie}) {

    const [data, setData] = useState({
        learn: "",
        moreInfo: ""
    }) 
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
    
      const handleChange = (event) => {
        const {name, value} = event.target
        
        setData(prevState => ({
            ...prevState,
            [name]:value
        }))

      }
      
      const handleGenerate = async () => {
    
        const {learn, moreInfo} = data
    
        if(writing === true) return 
    
        setWriting(true)
        setError("")
        changeValue("")
        
        if(learn.trim() === "")
        {
            setWriting(false)
            setError("You need to provide what you want to learn")
            return
        } 
          try {
            const resp = await fetch("https://api.skillify-ai.com/chatgpt/all-books", {
            credentials: "include",
        method: "POST",
            body: JSON.stringify({ category: category,
                learn: learn,
                moreInfo: moreInfo,
                userLanguage: userLanguage
            }), 
            headers: {
                "Content-Type": "application/json"
            },
            }) 
            const reader = resp.body.getReader()
    
            let booksTitles = ""
            const processStream = async () => {
            const { done, value } = await reader.read();
        
            if (done) {
              setWriting(false)
              setCookie("books", JSON.stringify({titles: booksTitles, content: [], open: []}))
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
            booksTitles += chunk
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
        <h3 className='tool-description'>Book recommendation for everything you want to improve</h3>
            <TextField
                name='learn'
                onChange={handleChange}
                value={data.learn}
                className='text-input'
                placeholder='What do you want to improve?'
            />
            
            <TextField  
                name='moreInfo'
                onChange={handleChange}
                value={data.moreInfo}
                className='text-input'
                placeholder='Additional information (specific author, book length, your level)'
            />
            <button onClick = {handleGenerate} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Book Titles<i className="fa-solid fa-circle-down"></i></button>
            {error && <span className='error'>{error}</span>}


            <TextArea
                value={books}
                handleChange = {handleBooksChange}
            />

        </ThemeProvider>
    </section>
  )
}
