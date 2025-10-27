import React, {useState} from 'react'
import { TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import Switch from '../Switch';


export default function Posts({error, handleGenerate, width, planType}) {

    const [data, setData] = useState({
        content: "",
        postsDay: "",
        followers: "",
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
        <h3 className='tool-description'>Generates personalized posting plans on social media</h3>
            <TextField
              name='content'
              onChange={handleChange}
              value={data.content}
              className='text-input'
              placeholder='What is your account about?' 
            />
            
            <div className='secondary-section'>
                <TextField  
                    name='postsDay'
                    onChange={handleChange}
                    value={data.postsDay}
                    className='text-input'
                    placeholder = 'Posts per day'
                    type='number'
                />
                
                <TextField  
                    name='followers'
                    onChange={handleChange}
                    value={data.followers}
                    className='text-input'
                    placeholder='Followers number'
                    type='number'
                />
            </div>
                <TextField  
                    name='moreInfo'
                    onChange={handleChange}
                    value={data.moreInfo}
                    className='text-input'
                    placeholder='Additional information (goals, preferences)'
                />
            <div className='generate-button-container'>
              <button onClick = {() => handleGenerate(data.content, data.followers, data.postsDay, data.moreInfo, switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Posting Plan<i className="fa-solid fa-circle-down"></i></button>
              {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
                <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
              </div>}
            </div>
            {error && <span className='error'>{error}</span>}
        </ThemeProvider>
    </section>
  )
}
