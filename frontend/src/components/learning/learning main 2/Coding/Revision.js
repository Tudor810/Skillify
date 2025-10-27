import React, {useState} from 'react'
import { TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import Switch from '../Switch';

export default function Revision({error, generateRevision, width, planType}) {

  const [data, setData] = useState({
    language: "",
    description: "",
    code: ""
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
    <section className='revision-section'>
      <h3 className='tool-description'>Any bugs in your code? Let Skillify fix it</h3>
      <ThemeProvider theme={theme}>
        <TextField
              onChange={handleChange}
              value={data.language}
              name='language'
              className='text-input'
              placeholder='Programming language'
        />
        <TextField 
          onChange={handleChange}
          value={data.description}
          name='description'
          placeholder='What is your code supposed to do?'
          className='text-input'
        />
        <TextField 
          onChange={handleChange}
          value={data.code}
          name='code'
          multiline
          placeholder='Current code'
          className='text-input'
          rows={7}

        />
        
      <div className='generate-button-container'>
        <button onClick = {() => generateRevision(data.language, data.description, data.code, switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>Revise Code<i className="fa-solid fa-circle-down"></i></button>
        {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
            <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
          </div>}
      </div>
        {error && <span className='error'>{error}</span>}
      </ThemeProvider>
    </section>
  )
}
