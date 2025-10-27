import React, {useState} from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import { selectStyle, selectSkill} from '../../../home/data';
import Switch from '../Switch';

export default function Exercises({category, error, handleGenerate, width, planType}) {

    const [data, setData] = useState({
        sport: "",
        otherSport: "", 
        time: "",
        level: "",
        moreInfo: ""
    })
   

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
      const [switchOn, setSwitchOn] = useState(false)

      const toggleSwitch = () => setSwitchOn(prevState => !prevState)
  return (
    <section className='equipment-section'>
        <ThemeProvider theme={theme}>
            <h3 className='tool-description'>Practise makes perfect</h3>
            <FormControl className='select-container '>
                <InputLabel htmlFor="sport-equipment" sx={{
                    color: "white"
                  }}>Sport</InputLabel>
                <Select 
                  id='sport-equipment'
                  className='select'
                  sx={selectStyle}
                  placeholder='Sport'
                  label = "Sport"
                  name = "sport"
                  value={data.sport}
                  onChange={handleChange}
                  MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: 'var(--card-background)',
                      paddingInline: '15px'
                    },
                  }}}
                > 
                  {selectSkill
                    .filter(item => item.category === category)
                    .map(item => {
                      return item.skills.map((skill, index) => {
                        return <MenuItem className='mui-menu-item' key={index} value = {skill}>{skill}</MenuItem>
                      })
                    })
                    
                      
                    
                  }
                </Select>
              </FormControl>
            {data.sport === "Other" && <TextField
              name='otherSport'
              onChange={handleChange}
              value={data.otherSport}
              className='text-input'
              placeholder='What do you want to learn?' 
            />}
            <div className='secondary-section'>
            <TextField 
                placeholder = "Time duration (hours)"
                className='text-input'
                value={data.time}
                onChange={handleChange}
                name='time'

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
                placeholder='Additional information (preferences, equipment)'
            /> 
            <div className='generate-button-container'>
              <button onClick = {() => handleGenerate(data.sport, data.otherSport, data.level, data.time, data.moreInfo, switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Exercises<i className="fa-solid fa-circle-down"></i></button>
              {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
                <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
              </div>}
            </div>
            {error && <span className='error'>{error}</span>}
        </ThemeProvider>
    </section>
  )
}
