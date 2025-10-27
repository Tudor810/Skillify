import React, {useState} from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import { selectStyle} from '../../../home/data';
import Switch from '../Switch';

export default function Message({category, error, handleGenerate, width, planType}) {

    const [data, setData] = useState({
        situation: "",
        age: "",
        gender: "",
        otherGender: "",
        intention: "",
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
        <h3 className='tool-description'>Social media DMs for every situation</h3>
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
            <div className='generate-button-container'>
              <button onClick = {() => handleGenerate(data.situation, data.age, data.intention, data.gender, data.otherGender, data.moreInfo, switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Message<i className="fa-solid fa-circle-down"></i></button>
              {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
                <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
              </div>}
            </div>

            {error && <span className='error'>{error}</span>}

        </ThemeProvider>
    </section>
  )
}
