import React, {useState} from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import { schoolSubject } from '../../../home/data';
import { selectStyle } from '../../../home/data'
import TextArea from '../TextArea';

export default function Tests({testPlaceholder, test, handleTestChange, category, userLanguage, changeValue, subtractCredits, categories, planType, toggleSaved, setCookie}) {

  

  const [data, setData] = useState({
    subject: "",
    level: "",
    moreInfo: ""
  })
  const [error, setError] = useState("")
  const [writing, setWriting] = useState(false)

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
  const generateTest = async () => {
    const {subject, level, moreInfo} = data
    
    if(writing === true) return

    setWriting(true)
    setError("")
    changeValue("")
    
    if(subject === "") {
      setWriting(false)
      setError("You need to pick a subject")
      return
    } else if(level === "") {
      setWriting(false)
      setError("You need to pick a subject")
      return
    } else if(moreInfo.trim() === "") {
      setWriting(false)
      setError("Please provide some additional information")
      return
    }

    try {
      const resp = await fetch("https://api.skillify-ai.com/chatgpt/tests", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ category: category,
          skill: category,
          subject: subject,
          level: level,
          moreInfo: moreInfo,
          userLanguage: userLanguage
        }), 
        headers: {
          "Content-Type": "application/json"
        },
      }) 
      const reader = resp.body.getReader()
  
      
      let testTitles = ""
      const processStream = async () => {
        const { done, value } = await reader.read();
    
        if (done) {
          setWriting(false)
          setCookie("school-test", JSON.stringify({titles: testTitles, content: [], open: []}))
          toggleSaved()
          if(categories.includes(category))
            return
          else if(planType === "Tool" || planType === "Full")
            return
          else
            subtractCredits(50)
        
          return;
        }
  
        const chunk = new TextDecoder().decode(value);
        testTitles += chunk
        changeValue(chunk)
        return processStream();
      };
  
      processStream();
      
    } catch (err) {
      setWriting(false)
      setError("Something went wrong")
      console.log(err);
    }
  }
  const handleChange = (event) => {

    const {value, name} = event.target

    setData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  return (
    <section className='tests-section'>
      <h3 className='tool-description'>Test your ability to learn</h3>
        <ThemeProvider theme={theme}>
        <div className='main-section'>
          <FormControl className='select-container'>
            <InputLabel htmlFor="subject" sx={{
              color: "white"
            }}>Subject</InputLabel>
            <Select  
              name='subject'
              id="subject"
              label="Subject"
              className='select'
              sx={selectStyle}
              value={data.subject}
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'var(--card-background)',
                    paddingInline: '15px'
                  },
                }}}
            >
              {schoolSubject.map((item, index) => {
                return <MenuItem key = {index} value = {item.subject} className='mui-menu-item'><i className={`fa-solid ${item.icon}`}></i>{item.subject}</MenuItem>
              })}
            </Select>
          </FormControl>

          <FormControl className='select-container '>
            <InputLabel 
            htmlFor="grade" 
            sx={{
                color: "white"
            }}>
            Level
            </InputLabel>
            <Select 
              name='level'
              id='grade'
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
              <MenuItem className = "mui-menu-item" value = "Begginer">1st-6th Grade</MenuItem>
              <MenuItem className = "mui-menu-item" value = "Intermediate">6th-9th Grade</MenuItem>
              <MenuItem className = "mui-menu-item" value = "Advanced">9th-12th Grade</MenuItem>
            </Select>
          </FormControl>
        </div>

            <TextField
              onChange={handleChange}
              value={data.moreInfo}
              multiline
              className='text-input'
              placeholder='What should the test be about?'
              name = "moreInfo"
            />
            <button onClick = {generateTest} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Questions<i className="fa-solid fa-circle-down"></i></button>
            {error && <span className='error'>{error}</span>}
                <TextArea 
                  value={test}
                  handleChange = {handleTestChange}
                  placeholder ={testPlaceholder}
                />
            </ThemeProvider>
    </section>
  )
}
