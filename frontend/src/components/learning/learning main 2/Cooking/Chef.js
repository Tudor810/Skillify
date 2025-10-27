import React, {useState} from 'react'
import {FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import { selectStyle} from '../../../home/data';
import Switch from '../Switch';

export default function Chef({ error, handleGenerate, foodOrDrink, handleFoodOrDrinkChange, width, planType}) {

    const [data, setData] = useState({
        recipeName: "",
        restrictions: "",
        preferences: ""
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
        <h3 className='tool-description'>Craving for something you don't know how to cook or how to prepare? You are in the right place</h3>
        <FormControl className='select-container '>
                <InputLabel htmlFor="food-or-drink2" sx={{
                    color: "white"
                  }}>Food or drink</InputLabel>
                <Select 
                  id='food-or-drink2'
                  className='select'
                  sx={selectStyle}
                  placeholder='Food or drink'
                  label = "Food or drink"
                  name = "foodOrDrink"
                  value={foodOrDrink}
                  onChange={handleFoodOrDrinkChange}
                  MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: 'var(--card-background)',
                      paddingInline: '15px'
                    },
                  }}}
                > 
                  <MenuItem className='mui-menu-item' value = "Food">Food <i className="fa-solid fa-burger"></i></MenuItem>
                  <MenuItem className='mui-menu-item' value = "Drink">Drink <i className="fa-solid fa-wine-bottle"></i></MenuItem>
                </Select>
              </FormControl>
            <TextField
              name='recipeName'
              onChange={handleChange}
              value={data.recipeName}
              className='text-input'
              placeholder={foodOrDrink === "Food" ? 'What do you want to cook?' : 'What do you want to drink?'} 
            />
            
            <TextField  
                name='restrictions'
                onChange={handleChange}
                value={data.restrictions}
                className='text-input'
                placeholder={foodOrDrink === "Food" ? 'Dietary Restrictions' : 'Drinking Restrictions'} 
            />
            <TextField  
                name='preferences'
                onChange={handleChange}
                value={data.preferences}
                className='text-input'
                placeholder={foodOrDrink === "Food" ? 'Dietary Preferences' : 'Drinking Preferences'}
            />
            
            <div className='generate-button-container'>
              <button onClick = {() => handleGenerate(data.recipeName, data.restrictions, data.preferences, switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>{foodOrDrink === "Food" ? 'Generate Cooking Plan' : 'Generate Drink'}<i className="fa-solid fa-circle-down"></i></button>
              {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
                <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
              </div>}
            </div>
            {error && <span className='error'>{error}</span>}
        </ThemeProvider>
    </section>
  )
}
