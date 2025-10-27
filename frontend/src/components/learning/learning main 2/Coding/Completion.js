import React, {useState} from 'react'
import {TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import Switch from '../Switch';

export default function Completion({generateCompletion, error, width, planType}) {

  const [data, setData] = useState({
    language: "",
    description:""
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
    <section className='completion-section'>
      <h3 className='tool-description'>Complets you code with just one click</h3>
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
          placeholder='What do you want your code to do?'
          className='text-input'
          multiline
          rows={5}
        />
        <div className='generate-button-container'>
          <button onClick = {() => generateCompletion(data.language, data.description, switchOn)}className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Code<i className="fa-solid fa-circle-down"></i></button>
          {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
            <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
          </div>}
        </div>

        {error && <span className='error'>{error}</span>}
      </ThemeProvider>

    </section>
  )
}
