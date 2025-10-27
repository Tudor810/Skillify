import React, {useState} from 'react'
import { TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import Switch from '../Switch';

export default function Business({error, generateBusiness, width, planType}) {

  const [information, setInformaion] = useState("")


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

  return (
    <section className='business-section'>
      <ThemeProvider theme={theme}>

        <h3 className='tool-description'>The step by step plan for your succesful business</h3>
        <TextField 
          multiline
          rows={10}
          className='text-input'
          value={information}
          onChange={(event) => setInformaion(event.target.value)}
        />
        <div className='generate-button-container'>
          <button onClick = {() => generateBusiness(information, switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Steps<i className="fa-solid fa-circle-down"></i></button>
          {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
            <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
          </div>}
        </div>
        {error && <span className='error'>{error}</span>}
      </ThemeProvider>
    </section>
  )
}
