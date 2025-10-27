import React, {useState} from 'react'
import {FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import TextArea from '../TextArea';
import { selectStyle } from '../../../home/data';
 
export default function Yoga({yoga, handleYogaChange, changeValue, userLanguage, subtractCredits, category, categories, planType, toggleSaved, setCookie}) {

    const [error, setError] = useState("")
    const [writing, setWriting] = useState(false)
    const [data, setData] = useState({
        number: "",
        level: "",
        moreInfo: ""
    })

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
      
      const handleChange = (e) => {
        const {name, value} = e.target

        setData(prevState => ({
            ...prevState, [name]:value
        }))
      }
      const handleGenerate = async () => {
        const {number, level, moreInfo} = data
    
        if(writing === true) return 
    
        setWriting(true)
        setError("")
        changeValue("")
        
        if(number.trim() === "")
        {
            setWriting(false)
            setError("You need to provide how many exercises you want")
            return
        } else if(level === "") 
        {
            setWriting(false)
            setError("You need to provide a level")
            return  
        }
          try {
            const resp = await fetch("https://api.skillify-ai.com/chatgpt/all-yoga", {
            credentials: "include",
        method: "POST",
            body: JSON.stringify({ category: category,
                number: number,
                level: level,
                moreInfo: moreInfo,
                userLanguage: userLanguage
            }), 
            headers: {
                "Content-Type": "application/json"
            },
            }) 
            const reader = resp.body.getReader()
    
            let yogaTitles = ""
            const processStream = async () => {
            const { done, value } = await reader.read();
            
           
            if (done) {
              setWriting(false)
              setCookie("yoga", JSON.stringify({titles: yogaTitles, content: [], open: []}))
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
            yogaTitles += chunk
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
        <h3 className='tool-description'>Have you ever tried yoga?</h3>
            <div className='secondary-section'>
                <TextField 
                    placeholder = "Number of exercises"
                    className='text-input'
                    value={data.number}
                    onChange={handleChange}
                    name='number'
                    type='number'
                />
                <FormControl className='select-container '>
                    <InputLabel htmlFor="level-equipment" sx={{
                        color: "white"
                        }}>Level</InputLabel>
                    <Select 
                        name='level'
                        id='my-select2'
                        className='select'
                        sx={selectStyle}
                        placeholder='Level'
                        label = "Level"
                        value={data.level}
                        onChange={handleChange}
                        MenuProps={{
                        PaperProps: {
                        sx: {
                            backgroundColor: 'var(--card-background)',
                            paddingInline: '15px'
                        },
                        }}}
                    > 
                        <MenuItem className = "mui-menu-item" value = "Begginer">Begginer</MenuItem>
                        <MenuItem className = "mui-menu-item" value = "Intermediate">Intermediate</MenuItem>
                        <MenuItem className = "mui-menu-item" value = "Advanced">Advanced</MenuItem>
                    </Select>
                    </FormControl> 
                </div>
                <TextField  
                    name='moreInfo'
                    onChange={handleChange}
                    value={data.moreInfo}
                    className='text-input'
                    placeholder='Additional information (preferences, equipment)'
                />
            <button onClick = {handleGenerate} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Yoga Exercises <i className="fa-solid fa-circle-down"></i></button>
            {error && <span className='error'>{error}</span>}
            <TextArea 
                value={yoga}
                handleChange={handleYogaChange}
            />
        </ThemeProvider>
    </section>
  )
}
