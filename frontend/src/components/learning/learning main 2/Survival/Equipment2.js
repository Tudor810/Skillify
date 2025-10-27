import React, {useState} from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import { selectStyle} from '../../../home/data';
import Switch from '../Switch';

export default function Equipment2({error, handleGenerate, width, planType}) {

    const [data, setData] = useState({
        trip: "",
        otherTrip: "", 
        age: "",
        size: "",
        period: "",
        budget: "",
        moreInfo: ""
    })
   
    const [switchOn, setSwitchOn] = useState(false)

    const toggleSwitch = () => setSwitchOn(prevState => !prevState)

    const trips = 
      [
        "Mountain Summit Trek",
        "Wildlife Safari Adventure",
        "Kayaking in a Scenic Lake",
        "Camping by the River",
        "Birdwatching Expedition",
        "Canyoning and Waterfall Exploration",
        "Snorkeling in Coral Reefs",
        "Horseback Riding through Forest Trails",
        "Photography Expedition in a Nature Reserve",
        "Rock Climbing in a National Park",
        "Rafting in White-Water Rapids",
        "Guided Nature Walk in a Botanical Garden",
        "Whale Watching Excursion",
        "Overnight Backpacking Trip",
        "Stand-Up Paddleboarding on a River or Lake",
        "Stargazing and Astronomy Night",
        "Caving and Spelunking Adventure",
        "Tree-Top Canopy Walkway Experience",
        "Off-Roading and ATV Trail Riding",
        "Geocaching Expedition in a Wilderness Area",
        "Other"
      ]

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
        <h3 className='tool-description'>Everything you need to survive in the wild</h3>
            <FormControl className='select-container '>
                <InputLabel htmlFor="survival-equipment" sx={{
                    color: "white"
                  }}>Trip</InputLabel>
                <Select 
                  id='survival-equipment'
                  className='select'
                  sx={selectStyle}
                  placeholder='Trip'
                  label = "Trip"
                  name = "trip"
                  value={data.trip}
                  onChange={handleChange}
                  MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: 'var(--card-background)',
                      paddingInline: '15px'
                    },
                  }}}
                > 
                {trips.map((item, index) => {
                  return <MenuItem className='mui-menu-item' key={index} value = {item}>{item}</MenuItem>
                })}
                </Select>
              </FormControl>
            {data.trip === "Other" && <TextField
              name='otherTrip'
              onChange={handleChange}
              value={data.otherTrip}
              className='text-input'
              placeholder='What do you want to go?' 
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
                placeholder='Additional information (brand, material, features)'
            />
            <div className='generate-button-container'>
              <button onClick = {() => handleGenerate(data.trip, data.otherTrip, data.age, data.size, data.budget, data.period, data.moreInfo, switchOn)} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Equipment<i className="fa-solid fa-circle-down"></i></button>
              {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
                <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
              </div>}
            </div>
            {error && <span className='error'>{error}</span>}
        </ThemeProvider>
    </section>
  )
}
