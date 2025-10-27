import { TextField, Select, FormControl, InputLabel, MenuItem } from '@mui/material' 
import { createTheme, ThemeProvider, InputAdornment, IconButton} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import React, { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import {categories, selectStyle} from '../../home/data'
import { useNavigate } from 'react-router-dom'


export default function Chat({category, messages, setUserMessage, setTeacherMessage, handleClear, userLanguage, subtractCredits, categoriesVar, planType, emptyLesson, close}) {

    const location = useLocation()
    const [error, setError] = useState("")
    const [value, setValue] = useState("")
    
    const [writing, setWriting] = useState(false)

   
    const navigate = useNavigate()
    
    const theme = createTheme({
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: error === "" ? 'rgba(255, 255, 255, 0.3)' : 'var(--error-color)', // Customize the border color
                  },
                  '&:hover fieldset': {
                    borderColor:  error === "" ? 'var(--primary-color)' : 'var(--error-color)', // Customize the active border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: error === "" ?  'var(--primary-color)' : 'var(--error-color)', // Customize the active border color
                  },
                },
              },
            },
          },
        },
      });

     
    
        const [visibleLetters, setVisibleLetters] = useState('');
        const [selectCategory, setSelectCategory] = useState("")
  
        const handleCategoryChoice = (event) => {
          const {value} = event.target
          setSelectCategory(value)
          emptyLesson()
          for(let i = 1;i < 15;i++)
            close(i, "lesson")
          
          if(value.split(' ').length > 2)
            navigate("/learn/summary")
          else
            navigate(`/learn/${value.toLowerCase().replaceAll(' ', '-')}`)
        }
      
        const text = `Welcome! Ask me anything related to ${location.pathname.split("/")[2].replace("-", " ")}, and I'll do my best to help you out.`

        useEffect(() => {
          setVisibleLetters("")
        },[navigate])

      useEffect(() => {
        
        const timeout = setTimeout(() => {
          setVisibleLetters(text.slice(0, visibleLetters.length + 1));
        }, 25);
        
        return () => {
          clearTimeout(timeout);
        };
      }, [visibleLetters, text]);
      

  
      const handleChange = (event) => {
        setValue(event.target.value)

      }

      const sendMessage = async () => {
        
        if(writing === true) return 

        setWriting(true)
        setError("")
        setValue("")
        
        if(value.trim() === "")
        { 
          setError("Message is required")
          setWriting(false)
          return 
        }
          
        setUserMessage(value)

       
        try {
          const response = await fetch("https://api.skillify-ai.com/chatgpt/chat", {
            credentials: "include",
        method: "POST",
            body: JSON.stringify({
              category: category,
              message: value,
              prevMessages: messages,
              skill: category,
              userLanguage: userLanguage
            }), 
            headers: {
              "Content-Type": "application/json"
            },
          }) 
          const reader = response.body.getReader()
          const index = messages.length


          const processStream = async () => {
            const { done, value } = await reader.read();
      
            if (done) {
              setWriting(false)
              if(categoriesVar.includes(category))
                return
              else if(planType === "Lesson" || planType === "Full")
                return
              else
                subtractCredits(10)
              
              return;
            }
      
            const chunk = new TextDecoder().decode(value);
            
            
            setTeacherMessage(chunk, index)
           
      
            return processStream();
          };
      
          processStream();
          
        } catch (err) {
           console.log(err);
           setWriting(false)
            setError("Something went wrong")
        }
      }

      console.log();
  return (
    <section className='chat-section'>
        <div className='upper-section'>
        {messages[0] && <div className='buttons'>
            <button onClick={handleClear} >Clear chat</button>
           </div>}
           {document.querySelector("html").classList && document.querySelector("html").classList[0] !== "translated-ltr" && !messages[0] && <div className='writing'>
                <p>{visibleLetters}</p>
            </div> }
            {document.querySelector("html").classList && document.querySelector("html").classList[0]=== "translated-ltr" && !messages[0] && <div className='writing'>
                <p>Welcome! Ask me anything related to {location.pathname.split("/")[2].replace("-", " ")}, and I'll do my best to help you out.</p>
            </div> }

            {!messages[0] && <div className='new-category'>
            <p>Do you want to learn something else? </p>
            <FormControl className='select-container'>
              <InputLabel htmlFor="my-select" sx={{
                color: "white"
              }}>Category</InputLabel>
                <Select  
                  id="my-select"
                  label="Category"
                  className='select'
                  sx={selectStyle}
                  value={selectCategory}
                  onChange={handleCategoryChoice}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: 'var(--card-background)',
                        paddingInline: '15px'
                      },
                    }}}
                >
                  {categories.map((item, index) => {
                  return <MenuItem key = {index} className = "mui-menu-item" value = {item.title}><i className={`fa-solid ${item.icon}`}></i>   {item.title}</MenuItem>
                })}
              </Select>  
            </FormControl>
            
            </div>}
            {!messages[0] && <div className='writing'>
              <p style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><i style = {{marginRight: '5px', fontSize: '1.5rem', color: 'var(--primary-color)'}} className="fa-solid fa-circle-exclamation"></i>You can change the language you get the response in if you click on your profile photo and acces Account Settings</p>
            </div> }
           

           {messages[0] && <div className='messages' translate='no'>
                {messages.map((item, index) => {
                    return <div key = {index} className='container'> 
                      <h4 style={{
                        color: `${item.role === 'User' ? 'var(--primary-color)' : 'var(--succes-color)'}`
                      }}>{item.role}:</h4>
                      <p>{item.message}</p>
                    </div>
                })}
            </div>}
        </div>
        <ThemeProvider theme={theme}> 
        <TextField 
          onKeyDown = {(event) => event.key === 'Enter' && !event.shiftKey ? sendMessage() : null}
            multiline
            placeholder='Enter your message'
            className = 'chat-input'
            InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton className='send-outline' onClick={sendMessage}>
                      <SendIcon sx={{
                        color: 'white'
                      }}/>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
              value={value}
        />
        {error && <span className='error'>{error}</span>}
        </ThemeProvider>
    </section>
  )
}
