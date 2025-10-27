import React, {useState} from 'react'
import {FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import { selectStyle } from '../../../home/data';
import Switch from '../Switch';

export default function Meditation({error, handleGenerate, width, planType}) {

    const [data, setData] = useState({
        time: "",
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
      
      const handleChange = (e) => {
        const {name, value} = e.target

        setData(prevState => ({
            ...prevState, [name]:value
        }))
      }
     

  return (
    <section className='equipment-section'>
        <ThemeProvider theme={theme}>
        <h3 className='tool-description'>Reach your inner peace</h3>
            <div className='secondary-section'>
                <TextField 
                    placeholder = "Time period (minutes)"
                    className='text-input'
                    value={data.time}
                    onChange={handleChange}
                    name='time'
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
                    placeholder='Additional information (preferences, places)'
                />
            <div className='generate-button-container'>
              <button onClick = {() => handleGenerate(data.level, data.time, data.moreInfo, switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Meditation Plan<i className="fa-solid fa-circle-down"></i></button>
              {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
                <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
              </div>}
            </div>
            {error && <span className='error'>{error}</span>}

        </ThemeProvider>
    </section>
  )
}
