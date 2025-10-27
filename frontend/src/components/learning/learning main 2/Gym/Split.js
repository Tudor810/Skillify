import React, {useState} from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import { selectStyle } from '../../../home/data'
import Switch from '../Switch';

export default function Split({error, generateSplit, width, planType}) {

  const [data, setData] = useState({
    days: "",
    focus: "",
    moreInfo: "",
    type: "",
    number: "",
    muscle: ""
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
      ...prevState, [name]: value
    }))
  }

  
  return (
    <section className='split-section'>
      <h3 className='tool-description'>Optimize your workout routine with our Gym Split Configurator</h3>
      <ThemeProvider theme={theme}>
      <FormControl className='select-container '>
        <InputLabel htmlFor="select-day" sx={{
            color: "white"
          }}>Type</InputLabel>
        <Select 
          name='type'
          id='select-day'
          className='select'
          sx={selectStyle}
          placeholder='Type'
          label = "Type"
          value={data.type}
          onChange = {handleChange}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: 'var(--card-background)',
                paddingInline: '15px'
              },
            }}}
          > 
          <MenuItem className = "mui-menu-item" value = "daily">Exercises for a day</MenuItem>
          <MenuItem className = "mui-menu-item" value = "weekly">Gym split </MenuItem>
        </Select>
      </FormControl>
      {(data.type === "weekly" || data.type === "") && <div className='main-section'>
      <FormControl className='select-container '>
        <InputLabel htmlFor="select-day" sx={{
            color: "white"
          }}>Days</InputLabel>
        <Select 
          name='days'
          id='select-day'
          className='select'
          sx={selectStyle}
          placeholder='Days'
          label = "Days"
          value={data.days}
          onChange = {handleChange}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: 'var(--card-background)',
                paddingInline: '15px'
              },
            }}}
          > 
          <MenuItem className = "mui-menu-item" value = "3">3</MenuItem>
          <MenuItem className = "mui-menu-item" value = "4">4</MenuItem>
          <MenuItem className = "mui-menu-item" value = "5">5</MenuItem>
          <MenuItem className = "mui-menu-item" value = "6">6</MenuItem>
          <MenuItem className = "mui-menu-item" value = "7">7</MenuItem>
        </Select>
      </FormControl>

          <FormControl className='select-container '>
            <InputLabel htmlFor="select-focus" sx={{
                color: "white"
              }}>Focus</InputLabel>
            <Select 
            name = "focus"
            id='select-focus'
            className='select'
            sx={selectStyle}
            placeholder='Focus'
            label = "Focus"
            value={data.focus}
            onChange = {handleChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: 'var(--card-background)',
                  paddingInline: '15px'
                },
              }}}
            > 
            
              <MenuItem className = "mui-menu-item" value = "lower body">Lower Body</MenuItem>
              <MenuItem className = "mui-menu-item" value = "upper body">Upper Body</MenuItem>
            </Select>
          </FormControl>
        </div>}
      {data.type === "daily" && <div className='main-section'>
          <TextField 
              name='number'
              placeholder='Number of exercises'
              className='text-input'
              value={data.number}
              onChange = {handleChange}
              type='number'
          />
          <TextField 
              name='muscle'
              placeholder='Muscle group'
              className='text-input'
              value={data.muscle}
              onChange = {handleChange}
          />

        
        </div>}
        <TextField 
            name='moreInfo'
            multiline
            placeholder='Additional information (gender, specific day, goals)'
            className='text-input'
            rows={5}
            value={data.moreInfo}
            onChange = {handleChange}
          />
          <div className='generate-button-container'>
            <button onClick = {() => generateSplit(data.days, data.focus, data.moreInfo, data.number, data.muscle, data.type, switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Split<i className="fa-solid fa-circle-down"></i></button>
            {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
              <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
            </div>}
          </div>

          {error && <span className='error'>{error}</span>}
      </ThemeProvider>
    </section>
  )
}
