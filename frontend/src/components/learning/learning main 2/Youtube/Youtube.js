import React, { useState } from 'react'
import { TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import TextArea from '../TextArea';
import Switch from '../Switch';
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material'
import httpClient from '../../../../httpClient'
import { selectStyle } from '../../../home/data';

export default function Youtube({handleGenerate, summaryError, width, planType}) {


    const [wordCount, setWordCount] = useState(0)

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
      const [data, setData] = useState({
        link: ""
      })
      const [error, setError] = useState("")
      const [transcript, setTranscript] = useState("")

      const handleChange = (e) => {

        const {name, value} = e.target
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
      }

      const getTranscript = async () => {
          try {
            
            setWordCount(0)
            setError("")
            setTranscript("")
            if(data.link.trim() === "")
              setError("You need to provide a link")
            
            const resp = await httpClient.get(`https://api.skillify-ai.com/chatgpt/video?link=${data.link}`)

            console.log(resp.data);
            setTranscript(() => {
              let trans = "";
              resp.data.forEach((item) => {
                trans += item.text
              })

              return trans
            })
            setWordCount(() => {
              let count = 0
              let trans = ""
              resp.data.forEach((item) => {
                trans += item.text
              })
              const split = trans.split(" ")
  
              split.forEach(item => {
                if(item !== "")
                  count += 1
              })
              return count
          })
          } catch (err) {
            setTranscript("The video you provided has no transcript")
            
          }
      }

      const [type, setType] = useState("")

      const handleChangeType = (e) => {
        setType(e.target.value)
      }

      const handleChangeTranscript = (e) => {

        const {value} = e.target
        setTranscript(value)
        if(value)
          setWordCount(() => {
            let count = 0
            const split = value.split(" ")

            split.forEach(item => {
              if(item !== "")
                count += 1
            })
            return count
      })
        else 
          setWordCount(0)
      }
  return (
    <div className='youtube-section'>
         <ThemeProvider theme={theme}>
        <h3 className='tool-description'>Youtube vidoes summary tool</h3>
        
            <TextField 
                placeholder = "Video link"
                className='text-input'
                value={data.link}
                onChange={handleChange}
                name='link'
            />
             <FormControl className='select-container '>
                <InputLabel htmlFor="level-equipment" sx={{
                    color: "white"
                    }}>Type</InputLabel>
                <Select 
                    name='type'
                    id='my-select2'
                    className='select'
                    sx={selectStyle}
                    placeholder='Type'
                    label = "Type"
                    value={type}
                    onChange={handleChangeType}
                    MenuProps={{
                    PaperProps: {
                    sx: {
                        backgroundColor: 'var(--card-background)',
                        paddingInline: '15px'
                    },
                    }}}
                > 
                    <MenuItem className = "mui-menu-item" value = "Lesson">Lesson (long for learning)</MenuItem>
                    <MenuItem className = "mui-menu-item" value = "Summary">Summary (short)</MenuItem>
                </Select>
                </FormControl> 
            <button  className='generate-button' onClick={getTranscript}><i className="fa-solid fa-circle-down"></i>Generate Transcript<i className="fa-solid fa-circle-down"></i></button>
            {error && <span className='error'>{error}</span>}
            <div className='word-container'>
              <TextArea
                  value={transcript}
                  handleChange = {handleChangeTranscript}
                  // placeholder={visibleLetters}
              />
              <p className='word-count'>Words: {wordCount}/3500</p>
            </div>
            
            <div className='generate-button-container'>
              <button className='generate-button' onClick={() => handleGenerate(transcript.replace(/\s/g, " "), switchOn, wordCount, "video", type)}><i className="fa-solid fa-circle-down"></i>{type === "Lesson" ? "Generate Lesson" : "Generate Key Points"}<i className="fa-solid fa-circle-down"></i></button>
              {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
                <Switch rocket = {true} width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
              </div>}
            </div>
            {summaryError && <span className='error'>{summaryError}</span>}
        </ThemeProvider>
    </div>

  )
}
