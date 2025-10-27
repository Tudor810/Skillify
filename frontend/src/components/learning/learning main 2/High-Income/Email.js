import React, {useState} from 'react'
import { TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import Switch from '../Switch';

export default function Email({error, generateEmail, width, planType}) {

    const [data, setData] = useState({
      from: '',
      to: '',
      value: "",
      help: "",
      words: ""
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
        ...prevState, [name]:value
      }))
    }
  return (
    <section className='email-section'>
        <ThemeProvider theme={theme}>
        <h3 className='tool-description'>Email writer for whenever you need to reach out to someone</h3>
          <div className='info-input'>
          <TextField 
            className='text-input'
            placeholder='From'
            name='from'
            value={data.from}
            onChange = {handleChange}
          />
          <TextField 
            className='text-input'
            placeholder='To'
            name='to'
            value={data.to}    
            onChange = {handleChange}
          />
          </div>
          <TextField 
            className='text-input'
            placeholder='What you offer'
            name='value'
            value={data.value}
            onChange = {handleChange}
          />

          <TextField 
            className='text-input'
            placeholder='Describe how can your offer help him'
            name='help'
            value={data.help}
            onChange = {handleChange}
          />

          <TextField 
            className='text-input'
            placeholder='Length in words'
            name='words'
            value={data.words}
            onChange={handleChange}
            type='number'
          />
          <div className='generate-button-container'>
            <button onClick = {() => generateEmail(data.from, data.to, data.value, data.help, data.words, switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Template<i className="fa-solid fa-circle-down"></i></button>
            {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
              <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
            </div>}
          </div>

        {error && <span className='error'>{error}</span>}
        </ThemeProvider>
    </section>
  )
}
