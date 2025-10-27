import { IconButton, Tooltip} from '@mui/material'
import React, { useState } from 'react'
import {animated, useSpring} from '@react-spring/web'
import Flashcards from './Flashcards'
import WordDefinition from './WordDefinition'
import MyCodeBlock from './MyCodeBlock'
import Cookies from 'js-cookie'


export function Appear({open, content}) {

  const appearProps = useSpring({
    opacity: !open ? '0' : '1',
    transform: !open ? 'translateY(200px)' : 'translateY(0)',
    display: !open ? 'none' : 'block',
    config: {mass: 1, tension: 200, friction: 20}
  })

  return (
    <animated.div className = "content-container" style={appearProps}>{content}
    </animated.div>
  )
}

export default function Content({documentSummary, switchOn, lesson, selected, bookSummary, category, 
recipes, userLanguage, essay, foodOrDrink, test, completion, revision, email, business, split, diet,
equipmentSport, exercise, equipmentSurvival, survive, chef, practice, level, description, posts, message, habits, icebreakers, 
books, streching, content, open, testContent, testOpen, recipeContent, recipeOpen,
handleOpenLesson, handleLesson, handleOpenTest, handleTest, handleOpenRecipe, width, 
handleRecipe, close, openAll, meditation, yoga, selectedRight, generateHomework, generateFlashcards, generateTests, toggleSaved,
homework, homeworkError, flashcards, flashcardsError, testLesson, testLessonError, strechingData, subtractCredits, categories, planType, practiceFight, equipmentFight, setCookie}) {


  // School
  
  const lessons = lesson.split('\n').filter(line => line.trim() !== "" && /\d+:/g.test(line))


  const testLines = test.split('\n').filter(line => line.trim() !== "" && /\d+:/g.test(line))
   
  // Recipe

  const recipesLines = recipes.split('\n').filter(line => line.trim() !== "" && /\d+:/g.test(line))

  // Icebreakers
  
  const icebreakerLines = icebreakers.split('\n').filter(line => line.trim() !== "" && /\d+:/g.test(line))

  // Books 

  const bookLines = books.split('\n').filter(line => line.trim() !== "" && /\d+:/g.test(line))

  // Gym

  const strechingLines = streching.split('\n').filter(line => line.trim() !== "" && /\d+:/g.test(line))

  // Yoga 

  const yogaLines = yoga.split('\n').filter(line => line.trim() !== "" && /\d+:/g.test(line))

  const generateLesson = async (index) => {
    
     const title = lessons.find((line) => line.includes(`${index}:`))

      let data;

      if(Cookies.get(category + "-info"))
        data = JSON.parse(Cookies.get(category + "-info"))

      
     handleOpenLesson(index)
     try {
        const response = await fetch("https://api.skillify-ai.com/chatgpt/lesson-content", {
          credentials: "include",
        method: "POST",
          body: JSON.stringify({ 
            category: category,
            switchOn: switchOn,
            title: title,
            skill: data ? data.skill === "Other" || category === "anything-else" ? data.otherSkill : data.skill : category,
            specification: data ? data.specification : "",
            level: data ? data.level : "",
            userLanguage: userLanguage
          }), 
          headers: {
            "Content-Type": "application/json"
          }}) 

        const reader = response.body.getReader()
        
        const lessonContent = content
        const lessonOpen = open
      const processStream = async () => {
        const { done, value } = await reader.read();

        if (done) { 

            setCookie(category, JSON.stringify({titles: lesson, content: lessonContent, open: lessonOpen}))
              toggleSaved()
           if(categories.includes(category))
              return
            else if(planType === "Lesson" || planType === "Full")
              return
            else 
               subtractCredits(100, switchOn)
          return;
        }

        const chunk = new TextDecoder().decode(value);

        handleLesson(chunk, index)
        if (!lessonContent[index-1]) {
          lessonContent[index-1] = chunk
        } else {
          lessonContent[index - 1] += chunk
        }

      if (!lessonOpen[index-1]) {
        lessonOpen[index-1]= true
      }
        processStream()
     }   
     processStream()
  } catch(err) {
    console.log(err);
  }
} 




const handleGenerateTest = async (index) => {
  const title = testLines.find((line) => line.includes(`${index}:`))

  handleOpenTest(index)

  try {
      const response = await fetch("https://api.skillify-ai.com/chatgpt/answear", {
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

      const content = testContent
      const open = testOpen
      const processStream = async () => {
        const { done, value } = await reader.read();

      if (done) {
              toggleSaved()
              setCookie("school-test", JSON.stringify({titles: test, content: content, open: open}))
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
        return;
      }

      const chunk = new TextDecoder().decode(value);
      
      if (!content[index-1]) {
        content[index-1] = chunk
      } else {
        content[index - 1] += chunk
      }

      if (!open[index-1]) {
        open[index-1]= true
      }
      handleTest(chunk, index)
      processStream()
  }   
  processStream()
  } catch(err) {
    console.log(err);
  }

}

const generateRecipe = async (index) => {
  const title = recipesLines.find((line) => line.includes(`${index}:`))
  handleOpenRecipe(index)

  try {
      const response = await fetch("https://api.skillify-ai.com/chatgpt/recipe", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ category: category,
          switchOn: switchOn,
          title: title,
          foodOrDrink: foodOrDrink,
          userLanguage: userLanguage
        }), 
        headers: {
          "Content-Type": "application/json"
        }}) 

      const reader = response.body.getReader()

      const content = recipeContent
      const open = recipeOpen

      const processStream = async () => {
        const { done, value } = await reader.read();

      if (done) {
              toggleSaved()
              setCookie("recipes", JSON.stringify({titles: recipes, content: content, open: open}))
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
        return;
      }

      const chunk = new TextDecoder().decode(value);
      handleRecipe(chunk, index)
      if (!content[index-1]) {
        content[index-1] = chunk
      } else {
        content[index - 1] += chunk
      }

      if (!open[index-1]) {
        open[index-1]= true
      }
      processStream()
  }   
  processStream()
  } catch(err) {
    console.log(err);
  }
}

const generateIcebreakers = async (index) => {

  const title = icebreakerLines.find((line) => line.includes(`${index}:`))
  handleOpenRecipe(index)
  try {
      const response = await fetch("https://api.skillify-ai.com/chatgpt/icebreaker", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ category: category,
          switchOn: switchOn,
          title: title,
          userLanguage: userLanguage
        }), 
        headers: {
          "Content-Type": "application/json"
        }}) 

      const reader = response.body.getReader()

      const content = recipeContent
      const open = recipeOpen
      const processStream = async () => {
        const { done, value } = await reader.read();

      if (done) {
              toggleSaved()
              setCookie("icebreakers", JSON.stringify({titles: icebreakers, content: content, open: open}))
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
        return;
      }

      const chunk = new TextDecoder().decode(value);
      handleRecipe(chunk, index)
      if (!content[index-1]) {
        content[index-1] = chunk
      } else {
        content[index - 1] += chunk
      }

      if (!open[index-1]) {
        open[index-1]= true
      }

      processStream()
  }   
  processStream()
  } catch(err) {
    console.log(err);
  }
}

const generateBooks = async (index) => {
  const title = bookLines.find((line) => line.includes(`${index}:`))
  handleOpenRecipe(index)

  try {
      const response = await fetch("https://api.skillify-ai.com/chatgpt/book-improvement", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ category: category,
          switchOn: switchOn,
          title: title,
          userLanguage: userLanguage
        }), 
        headers: {
          "Content-Type": "application/json"
        }}) 

      const reader = response.body.getReader()

      const content = recipeContent
      const open = recipeOpen
      const processStream = async () => {
        const { done, value } = await reader.read();

      if (done) {
              toggleSaved()
              setCookie("books", JSON.stringify({titles: books, content: content, open: open}))
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
        return;
      }

      const chunk = new TextDecoder().decode(value);
      handleRecipe(chunk, index)
      if (!content[index-1]) {
        content[index-1] = chunk
      } else {
        content[index - 1] += chunk
      }

      if (!open[index-1]) {
        open[index-1]= true
      }
      processStream()
  }   
  processStream()
  } catch(err) {
    console.log(err);
  }
}

const generateStreching = async (index) => {
  const title = strechingLines.find((line) => line.includes(`${index}:`))
  handleOpenRecipe(index)

  try {
      const response = await fetch("https://api.skillify-ai.com/chatgpt/streching", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ category: category,
          title: title,
          switchOn: switchOn,
          period: strechingData.period,
          moreInfo: strechingData.moreInfo,
          userLanguage: userLanguage
        }), 
        headers: {
          "Content-Type": "application/json"
        }}) 

      const reader = response.body.getReader()

      const content = recipeContent
      const open = recipeOpen
      const processStream = async () => {
        const { done, value } = await reader.read();

      if (done) {
              toggleSaved()
          setCookie("streching", JSON.stringify({titles: streching, content: content, open: open}))
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
        return;
      }

      const chunk = new TextDecoder().decode(value);
      handleRecipe(chunk, index)
      if (!content[index-1]) {
        content[index-1] = chunk
      } else {
        content[index - 1] += chunk
      }

      if (!open[index-1]) {
        open[index-1]= true
      }
      processStream()
  }   
  processStream()
  } catch(err) {
    console.log(err);
  }
}

const generateYoga = async (index) => {
  const title = yogaLines.find((line) => line.includes(`${index}:`))
  handleOpenRecipe(index)

  try {
      const response = await fetch("https://api.skillify-ai.com/chatgpt/yoga", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ category: category,
          switchOn: switchOn,
          title: title,
          userLanguage: userLanguage
        }), 
        headers: {
          "Content-Type": "application/json"
        }}) 

      const reader = response.body.getReader()
      const content = recipeContent
      const open = recipeOpen
      const processStream = async () => {
        const { done, value } = await reader.read();

      if (done) {
              toggleSaved()
              setCookie("yoga", JSON.stringify({titles: yoga, content: content, open: open}))
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
        return;
      }

      const chunk = new TextDecoder().decode(value);
      handleRecipe(chunk, index)
      if (!content[index-1]) {
        content[index-1] = chunk
      } else {
        content[index - 1] += chunk
      }

      if (!open[index-1]) {
        open[index-1]= true
      }
      processStream()
  }   
  processStream()
  } catch(err) {
    console.log(err);
  }
}

  const [openDefinition, setOpenDefinition] = useState(false)
  const [wordDefinition, setWordDefinition] = useState("")
  const [defintion, setDefinition] = useState("")
  const [writingDefinition, setWritingDefinition] = useState(false)

  const handleCloseDefinition = () => {
    setOpenDefinition(false)
  }

const getDefinition = async (e) => {
    setOpenDefinition(prevState => !prevState)
    setWordDefinition(e.target.innerText)
    setDefinition("")
    
    try{

      if(writingDefinition === true) return 

      setWritingDefinition(true)

      const resp = await fetch("https://api.skillify-ai.com/chatgpt/definition", {
          credentials: "include",
          method: "POST",
          body: JSON.stringify({
          word: e.target.innerText,
          lesson: lesson,
          category: category,
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
            setWritingDefinition(false)
          return;
          }
  
          const chunk = new TextDecoder().decode(value);
          
          setDefinition(prevState => prevState + chunk)
          return processStream();
      };
  
      processStream();
      
  } catch (err) {

      console.log(err);
  }
}


  const downloadLesson = () => {
    const link = document.createElement("a")

    let textContent = "";
    if(selected.second && category !== "summary" && selectedRight.first)
        lessons.forEach((item, index) => {
          const contentItem = content[index] ? content[index] : ""
          textContent += item[index] + '\n' + contentItem + '\n\n\n'
        })
    else if(category === 'school' && selected.fifth)
    {
      testLines.forEach((item, index) => {
        const contentItem = testContent[index] ? testContent[index] : ""
        textContent += item[index] + '\n' + contentItem + '\n\n\n'
      })
    } else if(category === 'cooking' && selected.third)
    {
      recipesLines.forEach((item, index) => {
        const contentItem = recipeContent[index] ? recipeContent[index] : ""
        textContent += item[index] + '\n' + contentItem + '\n\n\n'
      })
    } else if(category === 'social-skills' && selected.third)
    {
      icebreakerLines.forEach((item, index) => {
        const contentItem = recipeContent[index] ? recipeContent[index] : ""
        textContent += item[index] + '\n' + contentItem + '\n\n\n'
      })
    } else if(category === 'gym' && selected.fifth)
    {
      strechingLines.forEach((item, index) => {
        const contentItem = recipeContent[index] ? recipeContent[index] : ""
        textContent += item[index] + '\n' + contentItem + '\n\n\n'
      })
    } else if(category === 'mindfulness' && selected.third)
    {
      yogaLines.forEach((item, index) => {
        const contentItem = recipeContent[index] ? recipeContent[index] : ""
        textContent += item[index] + '\n' + contentItem + '\n\n\n'
      })
    } else if(category === 'school' && selected.fourth)
    {
      textContent += bookSummary
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    } else if(category === 'coding' && selected.third)
    {
      textContent += completion
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    } else if(category === 'coding' && selected.fourth)
    {
      textContent += revision
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    } else if(category === 'high-income' && selected.third)
    {
      textContent += email
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    } else if(category === 'high-income' && selected.fourth)
    {
      textContent += business
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    } else if(category === "gym" && selected.third)
    {
      textContent += split
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    } else if(category === "gym" && selected.fourth) 
    {
      textContent += diet
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    } else if(category === "sport" && selected.third) {
      textContent += equipmentSport
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    } else if(category === "sport" && selected.fourth)
    {
      textContent += exercise
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    }  
    else if(category === "survival-skills" && selected.third)
    {
      textContent += equipmentSurvival
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    }
      
    else if(category === "survival-skills" && selected.fourth)
    {
      textContent += survive
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    } 
    else if(category === "cooking" && selected.fourth)
    {
      textContent += chef
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    } 
    else if(category === "video-games" && selected.fourth)
    {
      textContent += practice
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    }  
    else if(category === "video-games" && selected.third)
    {
      textContent += level
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    }  
    else if(category === "social-media" && selected.third)
    {
      textContent += description
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    }  
    else if(category === "social-media" && selected.fourth)
    {
      textContent += posts
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    } 
    else if(category === "social-skills" && selected.fourth)
    {
       textContent += message
       textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    }   
    else if(category === "self-improvement" && selected.fourth)
    {
      textContent += habits
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    }
    else if(category === "mindfulness" && selected.fourth)
    {
      textContent += meditation
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    }  
    else if(category === "fighting" && selected.third)
    {
      textContent += practiceFight
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    } 
    else if(category === "fighting" && selected.third)
    {
      textContent += equipmentFight
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    } 
    else if(category === "summary" && selected.second)
    {
      textContent += documentSummary
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    }
    else if(category !== "summary" && selectedRight.second && selected.second)
    {
      textContent += homework
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    }
      
    else if(category !== "summary" && selectedRight.fourth && selected.second)
    {
      textContent += testLesson
      textContent = textContent.split(" ").map((item, index) => index % 15 === 0 && index !== 0 ? '\n' + item : item).join(" ")
    }
      

    const file = new Blob([textContent], {type: 'text/plain'})

    link.href = URL.createObjectURL(file)

    link.download = "lesson.txt"

    link.click()

    URL.revokeObjectURL(link.href)
  }

  return (
    <section className='right-section'>
      
      {(selectedRight.first || !selected.second) && <div className='result-text' >
            {selected.second && lessons.length !== 0 && <p className='step'>Click on the bolded words for an extra explanaition!</p>}
            {selected.second && lessons.map((item, index) => {
              // console.log(index, open[index]);
              return item.trim() !== "" && <div key = {index} className='lesson'> 
                        <div translate = "no" className='lesson-title-container'>
                          <h3 className = "lesson-title" >{item}</h3>
                          <Tooltip title = "Generate content">
                            <IconButton onClick = {!content[index] ? generateLesson.bind(null, index + 1) : open[index] ? close.bind(null, index, "lesson") : openAll.bind(null, index, "lesson")} className='angle-container'><i className={`fa-solid ${!open[index] ? 'fa-angles-down' : 'fa-angles-up'}`}></i></IconButton>
                          </Tooltip>
                        </div>
                        <Appear open={open[index]} content={<span className='lesson-content'>{
                          content[index] ? content[index].split(/```([\s\S]*?)```/g).map((block, index) => {
                            if (index % 2 === 1) {
                              return <MyCodeBlock key = {index} block = {block} />
                            }
                            return block
                          }).map(item => typeof item === "string" ? item.split(/\*\*(.*?)\*\*/).map((part, index) => {
                            if (index % 2 === 1) {
                              return <span onClick = {getDefinition} key = {index} style={{ fontWeight: 'bold', cursor: 'pointer'}}>{part}</span>;
                            }
                            return part;
                          }) : item) : content[index]} </span>} />
                        {open[index] && openDefinition && <WordDefinition width = {width} defintion = {defintion} open={openDefinition} handleClose={handleCloseDefinition} word={wordDefinition}/>}
                    </div>
            })}
            
            {category === 'school' && selected.third && essay.trim() !== "" &&
              <div translate = "no" className='lesson'>
                <span className='lesson-content'>{essay}</span>
              </div>
            }
            

            {category === 'school' && selected.fifth && testLines.map((item, index) => {
              // console.log(index, open[index]);
              return <div translate = "no" key = {index} className='lesson'> 
                        <div className='lesson-title-container'>
                          <h3 className = "lesson-title" >{item}</h3>
                          <Tooltip title = "Generate content">
                            <IconButton onClick = {!testContent[index] ? handleGenerateTest.bind(null, index + 1) : testOpen[index] ? close.bind(null, index, "test") : openAll.bind(null, index, "test")} className='angle-container'><i className={`fa-solid ${!testOpen[index] ? 'fa-angles-down' : 'fa-angles-up'}`}></i></IconButton>
                          </Tooltip>
                        </div>
                        <Appear open={testOpen[index]} content={<span className='lesson-content'>{testContent[index]}</span>} />
                    </div>
            })}
            
            {category === 'cooking' && selected.third && 
              recipesLines.map((item, index) => {
                return <div translate = "no" key = {index} className='lesson'> 
                <div className='lesson-title-container'>
                    <h3 className = "lesson-title" >{item}</h3>
                    <Tooltip title = "Generate content">
                      <IconButton onClick = {!recipeContent[index] ? generateRecipe.bind(null, index + 1) : recipeOpen[index] ? close.bind(null, index, "recipe") : openAll.bind(null, index, "recipe")} className='angle-container'><i className={`fa-solid ${!recipeOpen[index] ? 'fa-angles-down' : 'fa-angles-up'}`}></i></IconButton>
                    </Tooltip>
                  </div>
                  <Appear open={recipeOpen[index]} content={<span className='lesson-content'>{recipeContent[index]}</span>} />
               </div>
              })
            }

          {category === 'social-skills' && selected.third && icebreakerLines.map((item, index) => {
              // console.log(index, open[index]);
              return <div translate = "no" key = {index} className='lesson'> 
                        <div className='lesson-title-container'>
                          <h3 className = "lesson-title" >{item}</h3>
                          <Tooltip title = "Generate content">
                            <IconButton onClick = {!recipeContent[index] ? generateIcebreakers.bind(null, index + 1) : recipeOpen[index] ? close.bind(null, index, "recipe") : openAll.bind(null, index, "recipe")} className='angle-container'><i className={`fa-solid ${!recipeOpen[index] ? 'fa-angles-down' : 'fa-angles-up'}`}></i></IconButton>
                          </Tooltip>
                        </div>
                        <Appear open={recipeOpen[index]} content={<span className='lesson-content'>{recipeContent[index]}</span>} />

                    </div>
            })}

            {category === 'self-improvement' && selected.third && 
              bookLines.map((item, index) => {
                return <div translate = "no" key = {index} className='lesson'> 
                <div className='lesson-title-container'>
                    <h3 className = "lesson-title" >{item}</h3>
                    <Tooltip title = "Generate content">
                      <IconButton onClick = {!recipeContent[index] ? generateBooks.bind(null, index + 1) : recipeOpen[index] ? close.bind(null, index, "recipe") : openAll.bind(null, index, "recipe")} className='angle-container'><i className={`fa-solid ${!recipeOpen[index] ? 'fa-angles-down' : 'fa-angles-up'}`}></i></IconButton>
                    </Tooltip>
                  </div>
                  <Appear open={recipeOpen[index]} content={<span className='lesson-content'>{recipeContent[index]}</span>} />
               </div>
              })
            }

            {category === 'gym' && selected.fifth && 
              strechingLines.map((item, index) => {
                return <div translate = "no" key = {index} className='lesson'> 
                <div className='lesson-title-container'>
                    <h3 className = "lesson-title" >{item}</h3>
                    <Tooltip title = "Generate content">
                      <IconButton onClick = {!recipeContent[index] ? generateStreching.bind(null, index + 1) : recipeOpen[index] ? close.bind(null, index, "recipe") : openAll.bind(null, index, "recipe")} className='angle-container'><i className={`fa-solid ${!recipeOpen[index] ? 'fa-angles-down' : 'fa-angles-up'}`}></i></IconButton>
                    </Tooltip>
                  </div>
                  <Appear open={recipeOpen[index]} content={<span className='lesson-content'>{recipeContent[index]}</span>} />
               </div>
              })
            }

            {category === 'mindfulness' && selected.third && 
              yogaLines.map((item, index) => {
                return <div translate = "no" key = {index} className='lesson'> 
                <div className='lesson-title-container'>
                    <h3 className = "lesson-title" >{item}</h3>
                    <Tooltip title = "Generate content">
                      <IconButton onClick = {!recipeContent[index] ? generateYoga.bind(null, index + 1) : recipeOpen[index] ? close.bind(null, index, "recipe") : openAll.bind(null, index, "recipe")} className='angle-container'><i className={`fa-solid ${!recipeOpen[index] ? 'fa-angles-down' : 'fa-angles-up'}`}></i></IconButton>
                    </Tooltip>
                  </div>
                  <Appear open={recipeOpen[index]} content={<span className='lesson-content'>{recipeContent[index]}</span>} />
               </div>
              })
            }

           {category === 'school' && selected.fourth && bookSummary.trim() !== "" &&
              <div translate = "no" className='lesson'>
                <span className='lesson-content'>{bookSummary}</span>
              </div>
            }

            {category === 'coding' && selected.third && completion.trim() !== "" &&
              <div translate = "no" className='lesson'>
                <span className='lesson-content'>{completion.split(/```([\s\S]*?)```/g).map((block, index) => {
                  if (index % 2 === 1) {
                    return <MyCodeBlock key = {index} block = {block} />
                  }
                  return block
                })}</span>
                            </div>
            }

            {category === 'coding' && selected.fourth && revision.trim() !== "" &&
              <div translate = "no" className='lesson'>
                <span className='lesson-content'>{revision.split(/```([\s\S]*?)```/g).map((block, index) => {
                  if (index % 2 === 1) {
                    return <MyCodeBlock key = {index} block = {block} />
                  }
                  return block
                })}</span>
              </div>
            }

            {category === 'high-income' && selected.third && email.trim() !== "" &&
              <div translate = "no" className='lesson'>
                <span className='lesson-content'>{email}</span>
              </div>
            }

            {category === 'high-income' && selected.fourth && business.trim() !== "" &&
              <div translate = "no" className='lesson'>
                <span className='lesson-content'>{business}</span>
              </div>
            }

            {category === "gym" && selected.third && split.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{split}</span>
              </div>
            }

            {category === "gym" && selected.fourth && diet.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{diet}</span>
              </div>
            }

            {category === "sport" && selected.third && equipmentSport.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{equipmentSport}</span>
              </div>
            }

            {category === "sport" && selected.fourth && exercise.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{exercise}</span>
              </div>
            }
               
            {category === "survival-skills" && selected.third && equipmentSurvival.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{equipmentSurvival}</span>
              </div>
            }

            {category === "survival-skills" && selected.fourth && survive.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{survive}</span>
              </div>
            }

            {category === "cooking" && selected.fourth && chef.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{chef}</span>
              </div>
            }

            {category === "video-games" && selected.fourth && practice.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{practice}</span>
              </div>
            }   

            {category === "video-games" && selected.third && level.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{level}</span>
              </div>
            }   

            {category === "social-media" && selected.third && description.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{description}</span>
              </div>
            }   

            {category === "social-media" && selected.fourth && posts.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{posts}</span>
              </div>
            }   

            {category === "social-skills" && selected.fourth && message.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{message}</span>
              </div>
            } 
            
            {category === "self-improvement" && selected.fourth && habits.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{habits}</span>
              </div>
            } 

            {category === "mindfulness" && selected.fourth && meditation.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{meditation}</span>
              </div>
            } 

            {category === "fighting" && selected.third && practiceFight.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{practiceFight}</span>
              </div>
            } 

            {category === "fighting" && selected.fourth && equipmentFight.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{equipmentFight}</span>
              </div>
            } 
            {category === "summary" && selected.second && documentSummary.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{documentSummary}</span>
              </div>
            } 


            
        </div>}
        {category !== "summary" && selectedRight.second && selected.second && <div className='result-text'>

            <button className = "generate-button" onClick={generateHomework}>Generate Homework</button>
            <span style = {{marginTop: '-15px'}}className='error'>{homeworkError}</span>

           {homework.trim() !== "" && 
              <div translate = "no" className='lesson'>
               <span className='lesson-content'>{homework}</span>
              </div>
            } 
        </div>}
        
        {category !== "summary" && selectedRight.third && selected.second && <div className='result-text'>

            <button className = "generate-button" onClick={generateFlashcards}>Generate Flashcards</button>
            <span style = {{marginTop: '-15px'}}className='error'>{flashcardsError}</span>
            
            <div translate = "no" className='swiper-container'>
              <Flashcards userLanguage = {userLanguage} flashcards = {flashcards}/>
            </div>
            
            </div>}

            {category !== "summary" && selectedRight.fourth && selected.second && <div className='result-text'>

            <button className = "generate-button" onClick={generateTests}>Generate Test</button>
            <span style = {{marginTop: '-15px'}}className='error'>{testLessonError}</span>

            {testLesson.trim() !== "" && 
              <div translate = "no" className='lesson'>
                <span className='lesson-content'>
                  {testLesson}
                </span>
              </div>
            } 
            </div>}
            
            {!(category !== "summary" && selectedRight.third && selected.second) && <button onClick={downloadLesson} className='download-lesson'>Download Lesson</button>}
    </section>
  )
}
