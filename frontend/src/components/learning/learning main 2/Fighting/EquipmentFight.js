import React, {useState} from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import { selectStyle, selectSkill} from '../../../home/data';
import Switch from '../Switch';


export default function EquipmentFight({category, error, handleGenerate, width, planType}) {

    const [data, setData] = useState({
        sport: "",
        otherSport: "", 
        age: "",
        size: "",
        level: "",
        budget: "",
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
            <h3 className='tool-description'>Everything you need to practise the sport you desire</h3>
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
                    })}
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
                    name='age'
                    onChange={handleChange}
                    value={data.age}
                    className='text-input'
                    placeholder='Age'
                    type='number'
                />
                <TextField
                    name='size'
                    onChange={handleChange}
                    value={data.size}
                    className='text-input'
                    placeholder='Size'
                />
            </div>
            <div className='secondary-section'>
                <TextField
                    name='budget'
                    onChange={handleChange}
                    value={data.budget}
                    className='text-input'
                    placeholder='Budget (include currency)'
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
                placeholder='Additional information (brand, material, features)'
            />
            <div className='generate-button-container'>
              <button onClick = {() => handleGenerate(data.sport, data.otherSport, data.age, data.size, data.level, data.budget, data.moreInfo, switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Equipment<i className="fa-solid fa-circle-down"></i></button>    
              {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
                <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
              </div>}
            </div>
            {error && <span className='error'>{error}</span>}
        </ThemeProvider>
    </section>
  )
}
