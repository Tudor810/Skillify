import React, {useState} from 'react'
import { createTheme, Select, TextField, ThemeProvider, FormControl, InputLabel, MenuItem} from '@mui/material' 
import { selectStyle } from '../../../home/data'
import Switch from '../Switch';

export default function Books({data, handleChange, handleGenerate, error, width, planType}) {

 
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
 

  
  return (
    <section className='books-section'>
      <ThemeProvider theme={theme}>
      <h3 className='tool-description'>Can summarize any book very detailed</h3>
        <div className='book-info'>
          <TextField 
            className='text-input'
            placeholder='Book title'
            value={data.bookTitle}
            onChange={handleChange}
            name='bookTitle'
          />
          
          <TextField 
            className='text-input'
            placeholder='Author name'
            value={data.authorName}
            onChange={handleChange}
            name='authorName'
          />
        </div>
        <FormControl className='select-container '>
           
             <InputLabel htmlFor="length" sx={{
                  color: "white"
                }}>Summary Length Preference</InputLabel>
            <Select 
              id='length'
              className='select'
              sx={selectStyle}
              label = "Summary Length Preference"
              value={data.length}
              name='length'
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'var(--card-background)',
                    paddingInline: '15px'
                  },
                }}}
            > 
              <MenuItem className = "mui-menu-item" value = "Very Short">Very Short</MenuItem>
              <MenuItem className = "mui-menu-item" value = "Short">Short</MenuItem>
              <MenuItem className = "mui-menu-item" value = "Medium">Medium</MenuItem>
              <MenuItem className = "mui-menu-item" value = "Long">Long</MenuItem>
              <MenuItem className = "mui-menu-item" value = "Very Long">Very Long</MenuItem>
            </Select>
            </FormControl>
            
            <div className='generate-button-container'>
              <button onClick = {() => handleGenerate(switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Summary<i className="fa-solid fa-circle-down"></i></button>
              {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
                <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
              </div>}
            </div>
            {error && <span className='error'>{error}</span>} 
           
          </ThemeProvider>
    </section>
  )
}
