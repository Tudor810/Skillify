import React, { useEffect, useState } from 'react'
import { Appear } from '../learning main 2/Content'
import { IconButton, Tooltip} from '@mui/material'
import httpClient from '../../../httpClient'
import Flashcards from '../learning main 2/Flashcards'

export default function RightSection({lessonContent, lessonChapters, lessonOpen, handleOpenLesson, handleLesson, 
  userLanguage, category, open, close, selectedTitle, selected, secondaryLesson, changeSecondary, type, toolString, switchOn, 
  subtractCredits, categories, planType}) {


    const [editLessonState, setEditLessonState]= useState(false)

    
    const lessons = lessonChapters.split('\n').filter(line => line.trim() !== "" && /\d+:/g.test(line))

const generateLesson = async (index, url, type) => {
    
      const title = lessons.find((line) => line.includes(`${index}:`))
      
      

      handleOpenLesson(index)
      try {
         const response = await fetch(`https://api.skillify-ai.com/chatgpt/${url}`, {
           credentials: "include",
        method: "POST",
           body: JSON.stringify({ category: category,
             switchOn: switchOn,
             title: title,
             skill: category,
             userLanguage: userLanguage
           }), 
           headers: {
             "Content-Type": "application/json"
           }}) 
 
         const reader = response.body.getReader()
 
       const processStream = async () => {
         const { done, value } = await reader.read();
 
         if (done) {
          setEditLessonState(true)
            if(categories.includes(category))
              return
            else if(planType === type || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
           
           return;
         }
 
         const chunk = new TextDecoder().decode(value);
 
         handleLesson(chunk, index)
         processStream()
      }   
      await processStream()

      
      

   } catch(err) {
     console.log(err);
   }
 } 

 const [homeworkWriting, setHomeworkWriting] = useState(false)

 const generateHomework = async (category) => {

  const {level} = secondaryLesson
  
  if(homeworkWriting === true) return 

  changeSecondary(category, "")
  setHomeworkWriting(true)
  
  
  try {
    const resp = await fetch(`https://api.skillify-ai.com/chatgpt/${category}`, {
      credentials: "include",
        method: "POST",
      body: JSON.stringify({ 
        level: level,
        switchOn: switchOn,
        category: category,
        skill: selectedTitle.split(" ")[0],
        specification: selectedTitle.split(" ")[1],
        userLanguage: userLanguage
      }), 
      headers: {
        "Content-Type": "application/json"
      },
    }) 
    const reader = resp.body.getReader()


    const processStream = async () => {
      const { done, value } = await reader.read();
  
      if (done) {
        setHomeworkWriting(false)
        setEditLessonState(true)
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
       
        return;
      }

      const chunk = new TextDecoder().decode(value);
      
      changeSecondary(category, chunk)
      return processStream();
    };

    processStream();
      
    } catch (err) {
      setHomeworkWriting(false)
      console.log(err);
  }
}


 useEffect(() => {
    const editLesson = async () => {
      if(selectedTitle && editLessonState && type === "lesson")
      {
        try {

          await httpClient.patch("https://api.skillify-ai.com/plans/edit-lesson", {
            title: selectedTitle,
            content: lessonContent,
            homework: secondaryLesson.homework,
            test: secondaryLesson.test,
            flashcards: secondaryLesson.flashcards
          })

          setEditLessonState(false)
        } catch (err) {
          console.log(err);
        }
      } else if(type === "tool") 
      {
        try {
          await httpClient.patch("https://api.skillify-ai.com/plans/edit-tool", {
            title: selectedTitle,
            content: lessonContent
          })
        } catch (err) {
          console.log(err);
        }
      }
        
      } 

      editLesson()
 },[editLessonState, selectedTitle, lessonContent, secondaryLesson, type])
 

  return (
    <section className='right-section'>
      
      {type === "lesson" && selected.first && <div className='result-text'>
         {lessons.map((item, index) => {
              // console.log(index, open[index]);
              return item.trim() !== "" && <div key = {index} className='lesson'> 
                        <div className='lesson-title-container'>
                          <h3 className = "lesson-title" >{item}</h3>
                          <Tooltip title = "Generate content">
                            <IconButton onClick = {!lessonContent[index] ? generateLesson.bind(null, index + 1, "lesson-content", "Lesson") : lessonOpen[index] ? close.bind(null, index, "lesson") : open.bind(null, index, "lesson")} className='angle-container'><i className={`fa-solid ${!lessonOpen[index] ? 'fa-angles-down' : 'fa-angles-up'}`}></i></IconButton>
                          </Tooltip>
                        </div>
                        <Appear open={lessonOpen[index]} content={<span className='lesson-content'>{lessonContent[index]}</span>} />
                    </div>
            })} 
        </div>}

        {selected.second && <div className='result-text'>

              <button className = "generate-button" onClick={() => generateHomework("homework")}>Generate Homework</button>
            
              {secondaryLesson.homework && secondaryLesson.homework.trim() !== "" && 
                <div className='lesson'>
                  <span className='lesson-content'>{secondaryLesson.homework}</span>
                </div>
              } 
              </div>
        }

          {selected.third && <div className='result-text'>

          <button className = "generate-button" onClick={() => generateHomework("flashcards")}>Generate Flashcards</button>
          {secondaryLesson.flashcards && 
            <div className='swiper-container'>
                  <Flashcards flashcards = {secondaryLesson.flashcards}/>
              </div>
              }
          </div> }

        {selected.fourth && <div className='result-text'>
          <button className = "generate-button" onClick={() => generateHomework("test-lesson")}>Generate Test</button>
            {secondaryLesson.test && secondaryLesson.test.trim() !== "" && 
              <div className='lesson'>
                <span className='lesson-content'>{secondaryLesson.test}</span>
              </div>
            } 
          </div>
        }

        {type === "tool" && !lessonChapters && <div className='result-text'>
          <div className='lesson'>
              <span className='lesson-content'>{toolString}</span>
          </div>  
        </div>}

        {type === "tool" && category === "cooking" && lessonChapters &&  <div className='result-text'>
         {lessons.map((item, index) => {
              // console.log(index, open[index]);
              return item.trim() !== "" && <div key = {index} className='lesson'> 
                        <div className='lesson-title-container'>
                          <h3 className = "lesson-title" >{item}</h3>
                          <Tooltip title = "Generate content">
                            <IconButton onClick = {!lessonContent[index] ? generateLesson.bind(null, index + 1, "recipe", "Tool") : lessonOpen[index] ? close.bind(null, index, "lesson") : open.bind(null, index, "lesson")} className='angle-container'><i className={`fa-solid ${!lessonOpen[index] ? 'fa-angles-down' : 'fa-angles-up'}`}></i></IconButton>
                          </Tooltip>
                        </div>
                        <Appear open={lessonOpen[index]} content={<span className='lesson-content'>{lessonContent[index]}</span>} />
                        <p>{lessonContent[index] ? "(content is already generated)" : ""}</p>
                    </div>
            })} 
        </div>}
        {type === "tool" && category === "school" && lessonChapters &&  <div className='result-text'>
         {lessons.map((item, index) => {
              // console.log(index, open[index]);
              return item.trim() !== "" && <div key = {index} className='lesson'> 
                        <div className='lesson-title-container'>
                          <h3 className = "lesson-title" >{item}</h3>
                          <Tooltip title = "Generate content">
                            <IconButton onClick = {!lessonContent[index] ? generateLesson.bind(null, index + 1, "answear", "Tool") : lessonOpen[index] ? close.bind(null, index, "lesson") : open.bind(null, index, "lesson")} className='angle-container'><i className={`fa-solid ${!lessonOpen[index] ? 'fa-angles-down' : 'fa-angles-up'}`}></i></IconButton>
                          </Tooltip>
                        </div>
                        <Appear open={lessonOpen[index]} content={<span className='lesson-content'>{lessonContent[index]}</span>} />
                        <p>{lessonContent[index] ? "(content is already generated)" : ""}</p>
                    </div>
            })} 
        </div>}
        {type === "tool" && category === "social-skills" && lessonChapters &&  <div className='result-text'>
         {lessons.map((item, index) => {
              // console.log(index, open[index]);
              return item.trim() !== "" && <div key = {index} className='lesson'> 
                        <div className='lesson-title-container'>
                          <h3 className = "lesson-title" >{item}</h3>
                          <Tooltip title = "Generate content">
                            <IconButton onClick = {!lessonContent[index] ? generateLesson.bind(null, index + 1, "icebreaker", "Tool") : lessonOpen[index] ? close.bind(null, index, "lesson") : open.bind(null, index, "lesson")} className='angle-container'><i className={`fa-solid ${!lessonOpen[index] ? 'fa-angles-down' : 'fa-angles-up'}`}></i></IconButton>
                          </Tooltip>
                        </div>
                        <Appear open={lessonOpen[index]} content={<span className='lesson-content'>{lessonContent[index]}</span>} />
                        <p>{lessonContent[index] ? "(content is already generated)" : ""}</p>
                    </div>
            })} 
        </div>}
        {type === "tool" && category === "self-improvement" && lessonChapters &&  <div className='result-text'>
         {lessons.map((item, index) => {
              // console.log(index, open[index]);
              return item.trim() !== "" && <div key = {index} className='lesson'> 
                        <div className='lesson-title-container'>
                          <h3 className = "lesson-title" >{item}</h3>
                          <Tooltip title = "Generate content">
                            <IconButton onClick = {!lessonContent[index] ? generateLesson.bind(null, index + 1, "book-improvement", "Tool") : lessonOpen[index] ? close.bind(null, index, "lesson") : open.bind(null, index, "lesson")} className='angle-container'><i className={`fa-solid ${!lessonOpen[index] ? 'fa-angles-down' : 'fa-angles-up'}`}></i></IconButton>
                          </Tooltip>
                        </div>
                        <Appear open={lessonOpen[index]} content={<span className='lesson-content'>{lessonContent[index]}</span>} />
                        <p>{lessonContent[index] ? "(content is already generated)" : ""}</p>
                    </div>
            })} 
        </div>}
        {type === "tool" && category === "gym" && lessonChapters &&  <div className='result-text'>
         {lessons.map((item, index) => {
              // console.log(index, open[index]);
              return item.trim() !== "" && <div key = {index} className='lesson'> 
                        <div className='lesson-title-container'>
                          <h3 className = "lesson-title" >{item}</h3>
                          <Tooltip title = "Generate content">
                            <IconButton onClick = {!lessonContent[index] ? generateLesson.bind(null, index + 1, "streching", "Tool") : lessonOpen[index] ? close.bind(null, index, "lesson") : open.bind(null, index, "lesson")} className='angle-container'><i className={`fa-solid ${!lessonOpen[index] ? 'fa-angles-down' : 'fa-angles-up'}`}></i></IconButton>
                          </Tooltip>
                        </div>
                        <Appear open={lessonOpen[index]} content={<span className='lesson-content'>{lessonContent[index]}</span>} />
                        <p>{lessonContent[index] ? "(content is already generated)" : ""}</p>
                    </div>
            })} 
        </div>}
        {type === "tool" && category === "mindfulness" && lessonChapters &&  <div className='result-text'>
         {lessons.map((item, index) => {
              // console.log(index, open[index]);
              return item.trim() !== "" && <div key = {index} className='lesson'> 
                        <div className='lesson-title-container'>
                          <h3 className = "lesson-title" >{item}</h3>
                          <Tooltip title = "Generate content">
                            <IconButton onClick = {!lessonContent[index] ? generateLesson.bind(null, index + 1, "yoga", "Tool") : lessonOpen[index] ? close.bind(null, index, "lesson") : open.bind(null, index, "lesson")} className='angle-container'><i className={`fa-solid ${!lessonOpen[index] ? 'fa-angles-down' : 'fa-angles-up'}`}></i></IconButton>
                          </Tooltip>
                        </div>
                        <Appear open={lessonOpen[index]} content={<span className='lesson-content'>{lessonContent[index]}</span>} />
                        <p>{lessonContent[index] ? "(content is already generated)" : ""}</p>
                    </div>
            })} 
        </div>}
        

    </section>
  )
}
