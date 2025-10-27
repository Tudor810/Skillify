import React, {useState} from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import { selectStyle} from '../../../home/data';
import TextArea from '../TextArea';

export default function Icebreakers({icebreakers, handleIcebreakersChange, changeValue, userLanguage, subtractCredits, category, categories, planType, toggleSaved, setCookie}) {

    const [data, setData] = useState({
        situation: "",
        age: "",
        gender: "",
        otherGender: "",
        intention: "",
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
    
    const {situation, age, gender, otherGender, intention, moreInfo} = data

    if(writing === true) return 

    setWriting(true)
    setError("")
    changeValue("")
    
    if(situation.trim() === "")
    {
        setWriting(false)
        setError("You need to provide information about your situation")
        return
    } else if(age.trim() === "") 
    {
        setWriting(false)
        setError("You need to provide an age")
        return
    } else if(intention.trim() === "")
    {
        setWriting(false)
        setError("You need to provide your intention")
        return
    } else if(gender.trim() === "")
    {
        setWriting(false)
        setError("You need to provide your gender")
        return
    } else if(otherGender === "") 
    {
        setWriting(false)
        setError("You need to provide the other people gender")
        return
    }
    
    try {
        const resp = await fetch("https://api.skillify-ai.com/chatgpt/all-icebreakers", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ category: category,
            situation: situation,
            age: age,
            intention: intention,
            gender: gender,
            otherGender: otherGender,
            moreInfo: moreInfo,
            userLanguage: userLanguage
        }), 
        headers: {
            "Content-Type": "application/json"
        },
        }) 
        const reader = resp.body.getReader()

        let icebreakersTitles = ""

        const processStream = async () => {
        const { done, value } = await reader.read();
    
        if (done) {
            setWriting(false)
            setCookie("icebreakers", JSON.stringify({titles: icebreakersTitles, content: [], open: []}))
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
        icebreakersTitles += chunk
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
        <h3 className='tool-description'>Start a conversaton with anyone</h3>
            <TextField
                name='situation'
                onChange={handleChange}
                value={data.situation}
                className='text-input'
                placeholder='Describe your situation'
            />
            
            <div className='secondary-section'>
                <TextField
                    name='age'
                    onChange={handleChange}
                    value={data.age}
                    className='text-input'
                    placeholder='Age'
                    type='number'
                />
                <TextField
                    name='intention'
                    onChange={handleChange}
                    value={data.intention}
                    className='text-input'
                    placeholder='Your intention'
                />
            </div>
            <div className='secondary-section'>
                <FormControl className='select-container '>
                    <InputLabel htmlFor="your-gender" sx={{
                        color: "white"
                        }}>Your gender</InputLabel>
                    <Select 
                        name='gender'
                        id='your-gender'
                        className='select'
                        sx={selectStyle}
                        placeholder='Your gender'
                        label = "Your gender"
                        value={data.gender}
                        onChange={handleChange}
                        MenuProps={{
                        PaperProps: {
                        sx: {
                            backgroundColor: 'var(--card-background)',
                            paddingInline: '15px'
                        },
                        }}}
                    > 
                        <MenuItem className = "mui-menu-item" value = "Man">Man</MenuItem>
                        <MenuItem className = "mui-menu-item" value = "Woman">Woman</MenuItem>    
                    </Select>
                </FormControl> 
                <FormControl className='select-container '>
                    <InputLabel htmlFor="their-gender" sx={{
                        color: "white"
                        }}>Other people</InputLabel>
                    <Select 
                        name='otherGender'
                        id='their-gender'
                        className='select'
                        sx={selectStyle}
                        placeholder='Other people'
                        label = "Other people"
                        value={data.otherGender}
                        onChange={handleChange}
                        MenuProps={{
                        PaperProps: {
                        sx: {
                            backgroundColor: 'var(--card-background)',
                            paddingInline: '15px'
                        },
                        }}}
                    > 
                        <MenuItem className = "mui-menu-item" value = "Man">Man</MenuItem>
                        <MenuItem className = "mui-menu-item" value = "Woman">Woman</MenuItem>
                        <MenuItem className = "mui-menu-item" value = "Man group">Man group</MenuItem>
                        <MenuItem className = "mui-menu-item" value = "Woman group">Woman group</MenuItem>
                        <MenuItem className = "mui-menu-item" value = "Mix group">Mix group</MenuItem>
                    </Select>
                </FormControl> 
            </div>
            <TextField  
                name='moreInfo'
                onChange={handleChange}
                value={data.moreInfo}
                className='text-input'
                placeholder='Additional information (place, current skills)'
            />
            <button onClick = {handleGenerate} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Icebreakers<i className="fa-solid fa-circle-down"></i></button>
            {error && <span className='error'>{error}</span>}


            <TextArea
                value={icebreakers}
                handleChange = {handleIcebreakersChange}
            />

        </ThemeProvider>
    </section>
  )
}
