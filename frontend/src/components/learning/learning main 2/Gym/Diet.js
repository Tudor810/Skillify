import React, {useState} from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import { selectStyle } from '../../../home/data'
import Switch from '../Switch';

export default function Diet({error, generateDiet, width, planType}) {

  const [data, setData] = useState({
    weight: "",
    height: "",
    reason: "",
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
    const {value, name} = event.target

    setData(prevState => ({
      ...prevState, [name]: value,
    }))
  }

  return (
    <section className='diet-section'>
      <h3 className='tool-description'>Want to lose weight? Generate a personalized diet plan!</h3>
       <ThemeProvider theme={theme}>
        <div className='main-section'>
          <TextField
            name='weight'
            placeholder='Weight (kg)'
            className='text-input' 
            value={data.weight}
            onChange = {handleChange}
            type='number'
          />
           <TextField
           type='number'
            name='height'
            placeholder='Height (m)'
            className='text-input' 
            value={data.height}
            onChange = {handleChange}
          />
        </div>

        <FormControl className='select-container '>
            <InputLabel htmlFor="reason-select" sx={{
                color: "white"
              }}>Goals</InputLabel>
            <Select 
              name = "reason"
              id='reason-select'
              className='select'
              sx={selectStyle}
              placeholder='Goals'
              label = "Goals"
              value={data.reason}
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'var(--card-background)',
                    paddingInline: '15px'
                  },
                }}}
            > 
              <MenuItem className = "mui-menu-item" value = "lose weight">Lose weight</MenuItem>
              <MenuItem className = "mui-menu-item" value = "mantain weight">Mantain weight</MenuItem>
              <MenuItem className = "mui-menu-item" value = "gain weight">Gain weight</MenuItem>
            </Select>

          </FormControl>
          <TextField 
              name='moreInfo'
              placeholder='Additional information (gender, time period, some specific food, kilogram goals, allergies)'
              className='text-input'
              multiline
              rows={4}
              value={data.moreInfo}
              onChange={handleChange}
            />
            <div className='generate-button-container'>
              <button onClick = {() => generateDiet(data.weight, data.height, data.reason, data.moreInfo, switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Diet Plan<i className="fa-solid fa-circle-down"></i></button>
              {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
                <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
              </div>}
            </div>
            {error && <span className='error'>{error}</span>}
       </ThemeProvider>

    </section>
  )
}
