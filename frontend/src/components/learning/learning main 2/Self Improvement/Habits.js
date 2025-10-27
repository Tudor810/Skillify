import React, {useState} from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import { selectStyle} from '../../../home/data';
import Switch from '../Switch';

export default function Habits({error, handleGenerate, width, planType}) {

    const [data, setData] = useState({
        intention: "",
        habit: "",
        age: "",
        period: "",
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
          <h3 className='tool-description'>Get rid of bad habits and pick up good ones. All in one tool!</h3>
                <FormControl className='select-container '>
                    <InputLabel htmlFor="your-intention" sx={{
                        color: "white"
                        }}>Intention</InputLabel>
                    <Select 
                        name='intention'
                        id='your-intention'
                        className='select'
                        sx={selectStyle}
                        placeholder='Intention'
                        label = "Intention"
                        value={data.intention}
                        onChange={handleChange}
                        MenuProps={{
                        PaperProps: {
                        sx: {
                            backgroundColor: 'var(--card-background)',
                            paddingInline: '15px'
                        },
                        }}}
                    > 
                        <MenuItem className = "mui-menu-item" value = "Obtain good habit">Obtain good habit</MenuItem>
                        <MenuItem className = "mui-menu-item" value = "Get rid of bad habit">Get rid of bad habit</MenuItem>    
                    </Select>
                    </FormControl> 
                <TextField
                    name='habit'
                    onChange={handleChange}
                    value={data.habit}
                    className='text-input'
                    placeholder='Describe your habit'
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
                    name='period'
                    onChange={handleChange}
                    value={data.period}
                    className='text-input'
                    placeholder='Time period (days)'
                    type='number'
                />
            </div>
                        
            <TextField  
                name='moreInfo'
                onChange={handleChange}
                value={data.moreInfo}
                className='text-input'
                placeholder='Additional information (specific actions, possible drawbacks)'
            />
            <div className='generate-button-container'>
              <button onClick = {() => handleGenerate(data.intention, data.habit, data.age, data.period, data.moreInfo, switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Plan<i className="fa-solid fa-circle-down"></i></button>
              {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
                <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
              </div>}
            </div>
            {error && <span className='error'>{error}</span>}

        </ThemeProvider>
    </section>
  )
}
