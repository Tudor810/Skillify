import React, {useState} from 'react'
import {TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import Switch from '../Switch';


export default function Level({ error, handleGenerate, width, planType}) {

    const [data, setData] = useState({
        videoGame: "",
        difficulty: "",
        level: "",
        moreInfo: ""
    })
   
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
    
      const handleChange = (event) => {
        const {name, value} = event.target
        
        setData(prevState => ({
            ...prevState,
            [name]:value
        }))

      }
  return (
    <section className='equipment-section'>
        <ThemeProvider theme={theme}>
        <h3 className='tool-description'>Guides you through a though level</h3>
            <TextField
              name='videoGame'
              onChange={handleChange}
              value={data.videoGame}
              className='text-input'
              placeholder='Video game' 
            />
            
            <div className='secondary-section'>
                <TextField  
                    name='level'
                    onChange={handleChange}
                    value={data.level}
                    className='text-input'
                    placeholder='What level do you want to pass?'
                />
                
                <TextField  
                    name='difficulty'
                    onChange={handleChange}
                    value={data.difficulty}
                    className='text-input'
                    placeholder='Difficulty'
                />
            </div>
                <TextField  
                    name='moreInfo'
                    onChange={handleChange}
                    value={data.moreInfo}
                    className='text-input'
                    placeholder='Additional information'
                />
            <div className='generate-button-container'>
              <button onClick = {() => handleGenerate(data.videoGame, data.difficulty, data.level, data.moreInfo, switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Level Pass<i className="fa-solid fa-circle-down"></i></button>
              {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
                <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
              </div>}
            </div>

            {error && <span className='error'>{error}</span>}
        </ThemeProvider>
    </section>
  )
}
