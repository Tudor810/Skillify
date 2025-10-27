import React, { useState, useEffect} from 'react'
import { Select, TextField, FormControl, InputLabel, MenuItem } from '@mui/material'
import { createTheme, ThemeProvider} from '@mui/material' 
import { selectStyle } from '../../../home/data'
import TextArea from '../TextArea'
import Switch from '../Switch';

export default function Essay({selected, lesson, handleOutlineChange, outline, category, changeValue, subtractCredits, userLanguage, handleGenerateEssay, essayError, categories, planType, toggleSaved, width}) {

    const [number, setNumber] = useState("")
    const [visibleLetters, setVisibleLetters] = useState("")
    const [essayPrompt, setEssayPrompt] = useState("")
    const [error, setError] = useState("")
    const [writing, setWriting] = useState(false)
    const [switchOn, setSwitchOn] = useState(false)

    const toggleSwitch = () => setSwitchOn(prevState => !prevState)
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
      
      
      useEffect(() => {
        setVisibleLetters("")
      },[selected])
    
      useEffect(() => {
        if(selected)
        {
            let timeout = null;
          let currentIndex = 0;
  
          const animateText = () => {
            if (currentIndex < lesson.length) {
              setVisibleLetters((prevVisibleLetters) => prevVisibleLetters + lesson[currentIndex]);
              currentIndex++;
              timeout = setTimeout(animateText, 20); // Adjust the delay between each letter appearance
            }
          };
  
          timeout = setTimeout(animateText, 200)
  
          return () => {
            clearTimeout(timeout);
          };
        }
        
      }, [lesson, selected]);

const handleGenerateOutline = async () => {  

    if(writing === true) return 

    setWriting(true)
    setError("")
    changeValue("")
    
    if(number === "") 
    { 
      setError("You need to choose a number")
      setWriting(false)
      return
    } else if(essayPrompt.trim() === "") {
      setError("You can't enter an empty prompt")
      setWriting(false)
      return
    }
  try {
    const resp = await fetch("https://api.skillify-ai.com/chatgpt/essay-outline", {
      credentials: "include",
        method: "POST",
      body: JSON.stringify({ category: category,
        number: number,
        skill: category,
        essayPrompt: essayPrompt,
        userLanguage: userLanguage
      }), 
      headers: {
        "Content-Type": "application/json"
      },
    }) 
    const reader = resp.body.getReader()


    const processStream = async () => {
      const { done, value } = await reader.read();
  
      if (done) {
        setWriting(false)
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
    <section className='essay-section'>
      <h3 className='tool-description'>Essay writer in under 2 minutes</h3>
      <ThemeProvider theme={theme}>
        <div className='input-section'>
            <FormControl className='select-container'>
                <InputLabel htmlFor="number" sx={{
                    color: "white"
                }}>Number of Paragraphs</InputLabel>
                <Select  
                    id="number"
                    label="Number of Paragraphs"
                    className='select'
                    sx={selectStyle}
                    value={number}
                    onChange={(event) => setNumber(event.target.value)}
                    MenuProps={{
                    PaperProps: {
                        sx: {
                        backgroundColor: 'var(--card-background)',
                        paddingInline: '15px'
                        },
                    }}}
                >
                    <MenuItem className = "mui-menu-item" value = {3}>3</MenuItem>
                    <MenuItem className = "mui-menu-item" value = {4}>4</MenuItem>
                    <MenuItem className = "mui-menu-item" value = {5}>5</MenuItem>
                </Select>
                </FormControl>
            <TextField 
                className='text-input'
                multiline
                placeholder='Enter your essay prompt'
                rows={5}
                value={essayPrompt}
                onChange={(event) => setEssayPrompt(event.target.value)}
            />
        
        </div>
        <button onClick = {handleGenerateOutline} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Outline<i className="fa-solid fa-circle-down"></i></button>
        {error && <span className='error'>{error}</span>}
        <TextArea
          value={outline}
          handleChange = {handleOutlineChange}
          placeholder={visibleLetters}
        />

        <div className='generate-button-container'>
          <button onClick = {() => handleGenerateEssay(number, essayPrompt, switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Essay<i className="fa-solid fa-circle-down"></i></button>
          {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
            <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
          </div>}
        </div>
        <span className='error'>{essayError}</span>      
        </ThemeProvider>
    </section>
  )
}
