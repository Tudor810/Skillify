import React, {useState, useEffect} from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import { selectStyle, selectSkill, universitySubjects} from '../../home/data';
import TextArea from './TextArea';

export default function Ask({selected, lessonPlaceholder, lesson, handleLessonsChange, changeValue, category, userLanguage, emptyLesson, data, handleChange, subtractCredits, categories, planType, toggleSaved, setCookie}) {


  const [visibleLetters, setVisibleLetters] = useState('');
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
 

  const handleGenerate = async () => {
    
    const {numberOfLessons, level, skill, otherSkill, specification} = data

    if(writing === true) return 

    setWriting(true)
    
    setError("")
    emptyLesson()
    if(/^(0|[1-9]\d*)$/.test(numberOfLessons) === false)
    { 
      setWriting(false)
      setError("Number of lessons needs to be a positive number")
      return
    }
    else if(numberOfLessons > 15) /// TALK TO VLAD
    { 
      setWriting(false)
      setError("You can only generate 15 lessons at a time") 
      return
    }
    else if(level.trim() === "")
    {
      setWriting(false)
      setError("You need to select a level")
      return
    } else if(skill.trim() === "" && category !== "anything-else") 
    {
      setWriting(false)
      setError("The skill can't be empty")
      return
    } else if((skill === "Other" || category === "anything-else") && otherSkill.trim() === "")
    {
      setWriting(false)
      setError("The skill can't be empty")
      return
    }


    try {

      setCookie(category + "-info", JSON.stringify(skill === 'Other' || category === "anything-else" ? 
      {skill: skill, specification: specification, level: level, otherSkill: otherSkill} : {skill: skill, specification: specification, level: level}))


      const resp = await fetch("https://api.skillify-ai.com/chatgpt/lesson", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ 
          numberOfLessons: numberOfLessons,
          skill: skill === 'Other' || category === "anything-else" ? otherSkill : skill,
          level: level,
          category: category,
          userLanguage: userLanguage,
          specification: specification
        }), 
        headers: {
          "Content-Type": "application/json"
        },
      }) 
      const reader = resp.body.getReader()


      let lessonTitles = ""
      const processStream = async () => {
        const { done, value } = await reader.read();
   
        if (done) {
          
          setCookie(category, JSON.stringify({titles: lessonTitles, content: [], open: []}))
          setWriting(false)
          toggleSaved()
          if(categories.includes(category))
            return
          else if(planType === "Lesson" || planType === "Full")
            return
          else
            subtractCredits(50)
          
          

          return;
        }
  
        const chunk = new TextDecoder().decode(value);
      lessonTitles += chunk
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


    useEffect(() => {
      setVisibleLetters("")
    },[selected])
  
    useEffect(() => {
      if(selected)
      {
          let timeout = null;
        let currentIndex = 0;

        const animateText = () => {
          if (currentIndex < lessonPlaceholder.length) {
            setVisibleLetters((prevVisibleLetters) => prevVisibleLetters + lessonPlaceholder[currentIndex]);
            currentIndex++;
            timeout = setTimeout(animateText, 1); // Adjust the delay between each letter appearance
          }
        };

        timeout = setTimeout(animateText, 200)

        return () => {
          clearTimeout(timeout);
        };
      }
      
    }, [lessonPlaceholder, selected]);

   
  return (
    <section className='ask-section'>

      <ThemeProvider theme={theme}>
        <div className='input-section'>
          <div className='main-section'>
            
             
             
          </div>
          <p className='step'>Step 1: Generate the lessons</p>
          <div className='secondary-section'>
            <TextField
              onChange={handleChange}
              value={data.numberOfLessons}
              className='text-input'
              placeholder='Number of lessons'
              type='number'
              name='numberOfLessons'
            />
           {category !== "school" && <FormControl className='select-container '>
              <InputLabel htmlFor="my-select2" sx={{
                  color: "white"
                }}>Level</InputLabel>
              <Select 
                id='my-select2'
                className='select'
                sx={selectStyle}
                placeholder='Level'
                label = "Level"
                name = "level"
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
            </FormControl>} 
            {category === "school" && <FormControl className='select-container '>
              <InputLabel htmlFor="my-select2" sx={{
                  color: "white"
                }}>Level</InputLabel>
              <Select 
                id='my-select2'
                className='select'
                sx={selectStyle}
                placeholder='Level'
                label = "Level"
                name = "level"
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
                <MenuItem className = "mui-menu-item" value = "middle school">Middle School</MenuItem>
                <MenuItem className = "mui-menu-item" value = "high school">High School</MenuItem>
                <MenuItem className = "mui-menu-item" value = "university">University</MenuItem>
              </Select>
            </FormControl>} 
          </div>
           {category !== "anything-else" && <FormControl className='select-container '>
                <InputLabel htmlFor="learn" sx={{
                    color: "white"
                  }}>What do you want to learn?</InputLabel>
                <Select 
                  id='learn'
                  className='select'
                  sx={selectStyle}
                  placeholder='What do you want to learn?'
                  label = "What do you want to learn?"
                  value={data.skill}
                  name='skill'
                  onChange={handleChange}
                  MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: 'var(--card-background)',
                      paddingInline: '15px'
                    },
                  }}}
                > 
                  {data.level !== "university" && selectSkill
                    .filter(item => item.category === category)
                    .map(item => {
                      return item.skills.map((skill, index) => {
                        return <MenuItem className='mui-menu-item' key={index} value = {skill}>{skill}</MenuItem>
                      })
                    })}
                    {data.level === "university" && universitySubjects.map((item, index) => {
                      return <MenuItem key={index} className = "mui-menu-item" value = {item}>{item}</MenuItem>
                    })}
                </Select>
              </FormControl>}
            {(data.skill === "Other" || category === "anything-else") && <TextField
              onChange={handleChange}
              value={data.otherSkill}
              name='otherSkill'
              className='text-input'
              placeholder='What do you want to learn?' 
            />}
             {data.skill && <TextField
              onChange={handleChange}
              value={data.specification}
              className='text-input'
              placeholder='Subcategory/Chapter'
              name='specification'
            />}
        </div>
        <button onClick = {handleGenerate} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Lessons<i className="fa-solid fa-circle-down"></i></button>
        {error && <span className='error'>{error}</span>}
        <div className = "lessons-container">
          <p className='step'>Step 2: Generate content for each lesson</p>
          <TextArea
            value={lesson}
            handleChange = {handleLessonsChange}
            placeholder={visibleLetters}
          />

          {/* <div className='actions'>
            <button>Homework <i className='fa-solid fa-pen-nib'></i></button>
            <button>Flashcards<i className="fa-regular fa-clipboard"></i></button>
            <button>Test <i className="fa-solid fa-brain"></i></button>
          </div> */}
        </div>
        </ThemeProvider>
    </section>
  )
}

