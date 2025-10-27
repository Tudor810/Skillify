import React, {useEffect, useState} from 'react'
import LeftSection from './LeftSection'
import httpClient from '../../../httpClient'
import RightSection from './RightSection'
import RightSmallHeader from '../learning main 2/RightSmallHeader'
import Switch from '../learning main 2/Switch'

import '../../../css/saving.css'
import Succes from '../Succes'
import DeletPlan from '../../404page/DeletPlan'

export default function SavingSection({userLanguage, width, subtractCredits, categories, planType}) {

  const [selectCategory, setSelectCategory] = useState("")

  const [switchOn, setSwitchOn] = useState(false)

  const toggleSwitch = () => setSwitchOn(prevState => !prevState)

  
    const handleCategoryChange = (e) => {
        setSelectCategory(() => e.target.value.split(" ")[0] === "Videos" ? "summary" : e.target.value)
    }

  const [selected, setSelected] = useState({
    first: true,
    second: false,
    third: false,
    fourth: false
  })
  const [lineStyle, setLineStyle] = useState({
    width: 80,
    left: 0
  })
  const [openRight, setOpenRight] = useState(false)


const handleOpenRight = () => setOpenRight(prevState => !prevState)

const handleCloseRight = () => setOpenRight(false)

const handleRightClick = (item, width, left) => {
      
  setSelected(prevState => {
      const newState = {}
      newState[item] = true
      for (const key in prevState) {
          if (key !== item) {
            newState[key] = false;
          }
        }
        return newState;
  })

  handleCloseRight()
  setLineStyle(() => {
      return {
          width: width,
          left: left
      }
  })
}

  const [lessonTitles, setLessonTitles] = useState([])
  const [toolTitles, setToolTitles] = useState([])
  const [selectedTitle, setSelectedTitle] = useState("")

  const [lessonOpen, setLessonOpen] = useState([])
  const [lessonContent, setLessonContent] = useState([])
  const [lessonChapters, setLessonChapters] = useState("")
  const [secondaryLesson, setSecondaryLesson] = useState({})

  const [type, setType] = useState("")

  const [toolString, setToolString] = useState("")

  useEffect(() => {
    const getTitles = async () => {

      if(selectCategory) 
      {
        try {
          const resp = await httpClient.get(`https://api.skillify-ai.com/plans/lesson-titles?category=${selectCategory.toLowerCase().replace(" ", "-")}`)
          
          setLessonTitles(resp.data.lessons)
          
        } catch (err) {
          console.log(err);
        }
      }
    }

    getTitles()

  }, [ selectCategory])

  useEffect(() => {
    const getTitles = async () => {

      try {
        const resp = await httpClient.get(`https://api.skillify-ai.com/plans/tool-titles?category=${selectCategory.toLowerCase().replace(" ", "-")}`)
        
        const resp2 = await httpClient.get('https://api.skillify-ai.com/plans/plan-titles')

        setToolTitles([...resp.data.tools, ...resp2.data.plans])
      } catch (err) {
        console.log(err);
      }
      
    }

    getTitles()
  }, [ selectCategory])
 
 
 

 const handleLessonClick = async (event) => {

  const {innerText} = event.target
  setSelectedTitle(innerText)


  
  try {
    const resp = await httpClient.get(`https://api.skillify-ai.com/plans/lesson?title=${innerText}`)
    
  
    if(resp.data.type === "lesson" || resp.data.toolType === "Long")
    { 
      setLessonContent(resp.data.content)

      if(resp.data.content.length)
      { 
        
        const content = resp.data.content
        setLessonOpen(content.map((_) => {
          return false
      }))
      }
      setLessonChapters(resp.data.chapters)
    } else {
      setToolString(resp.data.chapters)
      setLessonChapters("")
    }
    

    if(resp.data.type === "lesson")
    {
      setSecondaryLesson(resp.data.secondaryLesson)
    }
    
    setType(resp.data.type)
    
  } catch (err) {
    setLessonContent("Something went wrong")
    console.log(err);
  }}
 


  

 const handleOpenLesson = (index) => {
  setLessonOpen(prevState => {
    const newState = [...prevState]
    
    if (!newState[index-1]) {
      newState[index-1]= true
    }
    
    return newState
  })
}

const handleLesson = (value, index) => {
  setLessonContent(prevState => {
    const newState = [...prevState]
    
    if (!newState[index-1]) {
      newState[index-1]= value
    } else {
      newState[index - 1] += value
    }
    
    return newState
})}

const open = (index) => {
  
  setLessonOpen(prevState => {
    const newState = prevState.map((item, index2) => index2 === index  ? true : item )
    return newState
  })  
}

const close = (index) => {

    setLessonOpen(prevState => {
      const newState = prevState.map((item, index2) => index2 === index  ? false : item )
      return newState
    })
 
}

const changeSecondary = (category, chunk) => {
  if(category === "homework")
  { 
    if(chunk === "")
      setSecondaryLesson(prevState => ({
        ...prevState,
        homework: ""
      }))
    else 
      setSecondaryLesson(prevState => ({
        ...prevState,
        homework: prevState.homework + chunk
      }))
  }
  else if(category === "test-lesson")
  {
    if(chunk === "")
      setSecondaryLesson(prevState => ({
        ...prevState,
        test: ""
      }))
    else 
      setSecondaryLesson(prevState => ({
        ...prevState,
        test: prevState.test + chunk
      }))
  } else if(category === "flashcards")
  {
    if(chunk === "")
      setSecondaryLesson(prevState => ({
        ...prevState,
        flashcards: ""
      }))
    else 
      setSecondaryLesson(prevState => ({
        ...prevState,
        flashcards: prevState.flashcards + chunk
      }))
  }
} 
  const [succes, setSucces] = useState(false)

  const toggleSucces = () => setSucces(prevState => !prevState)

  const [openDelete, setOpenDelete] = useState(false)
  const [error, setError] = useState("")

  const toggleOpenDelete = () => setOpenDelete(prevState => !prevState)

  const handleDelete = async () => {

    try {
      await httpClient.delete(`https://api.skillify-ai.com/plans/delete/?category=${selectCategory.toLowerCase().replace(" ", "-")}&title=${selectedTitle}`)
      setSelectedTitle("")
    } catch (err) {
      console.log(err);
      setError("Something went wrong, if the problem persists try to contact us")
    }
    toggleSucces()
  }

  
  return (
    <main className='learning-section-container'>
       <div className='left-learning-section left-save-section'>
          <LeftSection 
            selectCategory={selectCategory} 
            handleChange={handleCategoryChange} 
            lessonTitles = {lessonTitles}
            toolTitles = {toolTitles} 
            handleLessonClick={handleLessonClick}  
            selectedTitle = {selectedTitle}
           />
       </div>
       
       <div className='right-learning-section'>
       {type === "lesson" && <RightSmallHeader 
            width={width}
            selected={selected}
            handleClick={handleRightClick}
            lineStyle={lineStyle}
            open={openRight}
            handleOpen={handleOpenRight}
            handleClose={handleCloseRight}
          /> }
          <div className='save-super'>
          {selectCategory && selectedTitle && <button onClick = {toggleOpenDelete} className='delete-lesson save-button'>Delete Lesson</button>}
            <div className='rocket-container'>
              <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
            </div>
          </div>
          
          <DeletPlan error = {error} open={openDelete} handleClose={toggleOpenDelete} handleDelete = {handleDelete} />
          <Succes open={succes} handleClose={toggleSucces} text="Lesson deleted succesfully"/>

          <RightSection 
            switchOn = {switchOn}
            lessonChapters = {lessonChapters}
            lessonContent = {lessonContent}
            lessonOpen = {lessonOpen}
            handleLesson={handleLesson}
            handleOpenLesson={handleOpenLesson}
            userLanguage = {userLanguage}
            category = {selectCategory.toLowerCase().replace(" ", "-")}
            open = {open}
            close = {close}
            selectedTitle = {selectedTitle}
            selected = {selected}
            secondaryLesson = {secondaryLesson}
            changeSecondary = {changeSecondary}
            type = {type}
            toolString = {toolString}
            subtractCredits={subtractCredits}
            categories={categories}
            planType={planType}
          />
        </div>
    </main>
  )
}
