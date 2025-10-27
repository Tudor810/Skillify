import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import SmallHeader from './SmallHeader'
import Chat from './Chat'
import Lesson from './Lesson'
import Content from './Content'
import Essay from './School/Essay'
import Books from './School/Books'
import Tests from './School/Tests'
import Recipe from './Cooking/Recipe';
import Split from './Gym/Split';
import Diet from './Gym/Diet';
import Email from './High-Income/Email';
import Business from './High-Income/Business';
import Completion from './Coding/Completion'
import Revision from './Coding/Revision'
import Equipment from './Sport/Equipment';
import Equipment2 from './Survival/Equipment2';
import Exercises from './Sport/Exercises';
import Survive from './Survival/Survive';
import Chef from './Cooking/Chef'
import Practice from './Video Games/Practice'
import Description from './Social Media/Description'
import Posts from './Social Media/Posts';
import Icebreakers from './Social skills/Icebreakers';
import Message from './Social skills/Message';
import Books2 from './Self Improvement/Books2';
import Habits from './Self Improvement/Habits';
import Streching from './Gym/Streching';
import Meditation from './Mindfulness/Meditation';
import Yoga from './Mindfulness/Yoga';
import Level from './Video Games/Level';
import RightSmallHeader from './RightSmallHeader';
import Succes from '../Succes';
import httpClient from '../../../httpClient';
import Practice2 from './Fighting/Practice2';
import EquipmentFight from './Fighting/EquipmentFight';
import SavedDialog from './SavedDialog';
import Youtube from './Youtube/Youtube';
import Image from './Youtube/Image';
import ContentSecondary from './ContentSecondary';
import Switch from './Switch';
import Tutorial from './Tutorial';

export default function LearningSection({width, userLanguage, tutorial, openTutorial, closeTutorial, show, display, subtractCredits, planType, categories, credits, superCredits}) {

    const [switchOn, setSwitchOn] = useState(false)
    
    const toggleSwitch = () => setSwitchOn(prevState => !prevState)

    const [toolName, setToolName] = useState("")
    const [messages, setMessages] = useState([])

    const setUserMessage = (value) => {
      setMessages(prevState => ([
        ...prevState, 
        {
          role: 'User',
          message: value
        }
      ]))
    }

    const handleClear = () => {
      setMessages([])
    }
    const setTeacherMessage = (value, index) => {
      setMessages(prevState => {
        const newState = [...prevState]


        if(newState.length <= index + 1)

          newState.push(
          {
            role: "Teacher",
            message: value
          }) 
        else 
          newState[index + 1].message += value

        return newState
      })
    }
    const [lineStyle, setLineStyle] = useState({
      width: 80,
      left: 0 
    })

    const [lineRightStyle, setLineRightStyle] = useState({
      width: 80,
      left: 0
    })

    const [lesson, setLesson] = useState("")

    const [lessonData, setLessonData] = useState({
      numberOfLessons: "",
      level: "",
      skill: "",
      otherSkill: "",
      specification: ""
    })

    const setCookie = (name, data) => {
      if(Cookies.get(name))
        Cookies.remove(name)
      if(data !== "Insufficient credits, come back tommorow to continue learning" 
      && data !== "Something went wrong, if the problem persists please contact us"
      && data !== "Insufficient super credits, upgrade your plan to get unlimited")
        Cookies.set(name, data, {expires: 7, path: '/learn'})
    }

    const handleLessonDataChange = (e) => {

      const {value, name} = e.target

      setLessonData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
    const handleLessonsChange = (event) => setLesson(event.target.value)

    const changeLessonValue = (value) => {
      setLesson(prevState => prevState + value)
    }
    
    const [homework, setHomework] = useState("")
    const [homeworkError, setHomeworkError] = useState("")
    const [homeworkWriting, setHomeworkWriting] = useState(false)

const generateHomework = async () => {

      const {level, skill, otherSkill, specification} = lessonData
      if(homeworkWriting === true) return 

      setHomeworkWriting(true)
      setHomeworkError("")
      setHomework("")

      if(level.trim() === "")
      {
        setHomeworkWriting(false)
        setHomeworkError("You need to provide a level")
        return
      }
      else if(skill.trim() === "") 
      {
        setHomeworkWriting(false)
        setHomeworkError("You need to provide a skill")
        return
      } else if(skill === "Other" && otherSkill.trim() === "") 
      {
        setHomeworkWriting(false)
        setHomeworkError("You need to provide a skill")
        return
      } 
      
      try {
        const resp = await fetch("https://api.skillify-ai.com/chatgpt/homework", {     
          credentials: "include",
          method: "POST",
          body: JSON.stringify({ 
            switchOn: switchOn,
            level: level,
            category: category,
            skill: skill === "Other" ? otherSkill : skill,
            specification: specification,
            userLanguage: userLanguage
          }), 
          headers: {
            "Content-Type": "application/json"
          },
        }) 
        const reader = resp.body.getReader()
    
        let homeworkData = ""
        const processStream = async () => {
          const { done, value } = await reader.read();
          
          if (done) {
              toggleSaved()
              setCookie(category + "-homework", homeworkData)
            setHomeworkWriting(false)
             if(categories.includes(category))
              return
            else if(planType === "Lesson" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
            
            return;
          }
    
          const chunk = new TextDecoder().decode(value);
          homeworkData += chunk
          setHomework(prevState => prevState + chunk)
          return processStream();
        };
    
        processStream();
          
        } catch (err) {
          setHomeworkWriting(false)
          setHomeworkError("Something went wrong")
          console.log(err);
      }
}


const [flashcards, setFlashcards] = useState("")
const [flashcardsError, setFlashcardsError] = useState("")
const [flashcardsWriting, setFlashcardsWriting] = useState(false)

const generateFlashcards = async () => {

  const {level, skill, otherSkill, specification} = lessonData

  if(flashcardsWriting === true) return 

  setFlashcardsWriting(true)
  setFlashcardsError("")
  setFlashcards("")

  if(level.trim() === "")
  {
    setFlashcardsWriting(false)
    setFlashcardsError("You need to provide a level")
    return
  }
  else if(skill.trim() === "") 
  {
    setFlashcardsWriting(false)
    setFlashcardsError("You need to provide a skill")
    return
  } else if(skill === "Other" && otherSkill.trim() === "") 
  {
    setFlashcardsWriting(false)
    setFlashcardsError("You need to provide a skill")
    return
  } 
  
  try {
    const resp = await fetch("https://api.skillify-ai.com/chatgpt/flashcards", {
      credentials: "include",
        method: "POST",
      body: JSON.stringify({ 
        switchOn: switchOn,
        level: level,
        category: category,
        skill: skill === "Other" ? otherSkill : skill,
        specification: specification,
        userLanguage: userLanguage
      }), 
      headers: {
        "Content-Type": "application/json"
      },
    }) 
    const reader = resp.body.getReader()


    let flashcardsData = ""
    const processStream = async () => {
      const { done, value } = await reader.read();
      
      if (done) {
              toggleSaved()
              setCookie(category + '-flashcard', flashcardsData)
        setFlashcardsWriting(false)
         if(categories.includes(category))
              return
            else if(planType === "Lesson" || planType === "Full")
              return
            else 
               subtractCredits(100, switchOn)
        
        return;
      }

      const chunk = new TextDecoder().decode(value);
      flashcardsData += chunk
      setFlashcards(prevState => prevState + chunk)
      return processStream();
    };

    processStream();
      
    } catch (err) {
      setFlashcardsWriting(false)
      setFlashcardsError("Something went wrong")
      console.log(err);
  }
}

const [testLesson, setTestLesson] = useState("")
const [testLessonError, setTestLessonError] = useState("")
const [testLessonWriting, setTestLessonWriting] = useState(false)

const generateTestLesson = async () => {

  const {level, skill, otherSkill, specification} = lessonData

  if(testLessonWriting === true) return 

  setTestLessonWriting(true)
  setTestLessonError("")
  setTestLesson("")

  if(level.trim() === "")
  {
    setTestLessonWriting(false)
    setTestLessonError("You need to provide a level")
    return
  }
  else if(skill.trim() === "") 
  {
    setTestLessonWriting(false)
    setTestLessonError("You need to provide a skill")
    return
  } else if(skill === "Other" && otherSkill.trim() === "") 
  {
    setTestLessonWriting(false)
    setTestLessonError("You need to provide a skill")
    return
  } 
  
  try {
    const resp = await fetch("https://api.skillify-ai.com/chatgpt/test-lesson", {
      credentials: "include",
        method: "POST",
      body: JSON.stringify({ 
        switchOn: switchOn,
        level: level,
        category: category,
        skill: skill === "Other" ? otherSkill : skill,
        specification: specification,
        userLanguage: userLanguage
      }), 
      headers: {
        "Content-Type": "application/json"
      },
    }) 
    const reader = resp.body.getReader()

    let testData = ""
    const processStream = async () => {
      const { done, value } = await reader.read();
      
      if (done) {
              toggleSaved()
              setCookie(category + "-test", testData)
        setTestLessonWriting(false)
         if(categories.includes(category))
              return
            else if(planType === "Lesson" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
        
        return;
      }

      const chunk = new TextDecoder().decode(value);
      testData += chunk
      setTestLesson(prevState => prevState + chunk)
      return processStream();
    };

    processStream();
      
    } catch (err) {
      setTestLessonWriting(false)
      setTestLessonError("Something went wrong")
      console.log(err);
  }
}

    // School 

    const [outline, setOutline] = useState("")
    const [essayError, setEssayError] = useState("")
    const [essayWriting, setEssayWriting] = useState(false)
    const [essay, setEssay] = useState("")

    const handleOutlineChange = (event) => setOutline(event.target.value)
    
    const changeOutlineValue = (value) => {
      if(value === "")
        setOutline("")
      else 
        setOutline(prevState => prevState + value)
    }
    
    const handleGenerateEssay = async (number, essayPrompt, switchOn) => {

      if(essayWriting === true) return 

      setEssay("")
      setEssayWriting(true)
      setEssayError("")

      if(outline.trim() === "") {
        setEssayError("Essay outline is required")
        setEssayWriting(false)
        return
      } else if(number === "") 
      { 
        setEssayError("You need to choose a number")
        setEssayWriting(false)
        return
      } else if(essayPrompt.trim() === "") {
        setEssayError("You can't enter an empty prompt")
        setEssayWriting(false)
        return
      }

      try {
        const resp = await fetch("https://api.skillify-ai.com/chatgpt/essay", {
          credentials: "include",
        method: "POST",
          body: JSON.stringify({ category: category,
            switchOn: switchOn,
            number: number,
            skill: category,
            essayPrompt: essayPrompt,
            outline: outline,
            userLanguage: userLanguage
          }), 
          headers: {
            "Content-Type": "application/json"
          },
        }) 
        const reader = resp.body.getReader()
        
        let essayValue = ""
    
        const processStream = async () => {
          const { done, value } = await reader.read();
          
          if (done) {
              toggleSaved()
            setCookie("essay", essayValue)
            setEssayWriting(false)
             if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
            
            return;
          }
    
          const chunk = new TextDecoder().decode(value);
          
          essayValue += chunk
          setEssay(prevState => prevState + chunk)
          return processStream();
        };
    
        processStream();
        
      } catch (err) {
        setEssayWriting(false)
        setEssayError("Something went wrong")
        console.log(err);
      }
      
    }
    const [bookSummary, setBookSummary] = useState("")
    const [bookSummaryError, setBookSummaryError] = useState("")
    const [bookSummaryWriting, setBookSummaryWriting] = useState("")


    const [data, setData] = useState({
      bookTitle: "",
      authorName:"",
      length: ""
    })

    const handleGenerateBookSummary = async (switchOn) => {
  
      if(bookSummaryWriting === true) return 
  
      setBookSummary("")
      setBookSummaryWriting(true)
      setBookSummaryError("")
  
      const {bookTitle, authorName, length} = data
  
      if(bookTitle.trim() === "") 
      {
        setBookSummaryError("Book title can't be empty")
        setBookSummaryWriting(false)
        return
      } else if(authorName.trim() === "") {
        setBookSummaryError("Author Name cannot be blank.")
        setBookSummaryWriting(false)
        return
      } else if(length === "") {
        setBookSummaryError("Please specify a length")
        setBookSummaryWriting(false)
        return
      }
  
      try {
        const resp = await fetch("https://api.skillify-ai.com/chatgpt/book", {
          credentials: "include",
        method: "POST",
          body: JSON.stringify({ category: category,
            switchOn: switchOn,
            skill: category,
            bookTitle: bookTitle,
            authorName: authorName,
            userLanguage: userLanguage,
            length:length 
          }), 
          headers: {
            "Content-Type": "application/json"
          },
        }) 
        const reader = resp.body.getReader()
    
        let bookValue = ""
        const processStream = async () => {
          const { done, value } = await reader.read();
          
          if (done) {
              toggleSaved()
            
              setCookie("book-summary", bookValue)
            setBookSummaryWriting(false)
             if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
            
            return;
          }
    
          const chunk = new TextDecoder().decode(value);
          
          bookValue += chunk
          setBookSummary(prevState => prevState + chunk)
          return processStream();
        };
    
        processStream();
        
      } catch (err) {
        setBookSummaryWriting(false)
        setError("Something went wrong")
        console.log(err);
      }
    }

    const handleChange = (event) => {
      const {name, value} = event.target
      
      setData(prevState => ({
        ...prevState,
        [name]:value
      }))
    }
  

    const [test, setTest] = useState("")

    const handleTestChange = (event) => setTest(event.target.value)

    const changeTestValue = (value) => {
      if(value === "")
        setTest("")
      else
        setTest(prevState => prevState + value)
    }

    // Cooking
    const [recipes, setRecipes] = useState("")
    const [foodOrDrink, setFoodOrDrink] = useState("")

    const handleFoodOrDrinkChange = (e) => setFoodOrDrink(e.target.value)

    const handleRecipeChange = (event) => setRecipes(event.target.value);

    const changeRecipeValue = (value) => {
      if(value === "")
        setRecipes("")
      else 
        setRecipes(prevState => prevState + value)
    }
    // High income 

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [emailWriting, setEmailWriting] = useState(false)

const generateEmail = async (from, to, value, help, words, switchOn) => {

      if(emailWriting === true) return 

      setEmailWriting(true)
      setEmailError("")
      setEmail("")

      if(from.trim() === "")
      {
        setEmailWriting(false)
        setEmailError("You need to provide a from value")
        return
      }
      else if(to.trim() === "") 
      {
        setEmailWriting(false)
        setEmailError("The email needs a receiver")
        return
      } else if(value.trim() === "") 
      {
        setEmailWriting(false)
        setEmailError("What you offer can't be empty")
        return
      } else if(help.trim() === "")
      {
        setEmailWriting(false)
        setEmailError("How can your offer help can't be empty")
        return
      } else if(words <= 0) 
      {
        setEmailWriting(false)
        setEmailError("The length needs to be a positive number")
        return
      }
         
      try {
        const resp = await fetch("https://api.skillify-ai.com/chatgpt/email", {
          credentials: "include",
        method: "POST",
          body: JSON.stringify({ category: category,
            switchOn: switchOn,
            from: from,
            to: to,
            value: value,
            help:help,
            words: words,
            skill: category,
            userLanguage: userLanguage
          }), 
          headers: {
            "Content-Type": "application/json"
          },
        }) 
        const reader = resp.body.getReader()
    
        let emailData = ""
        const processStream = async () => {
          const { done, value } = await reader.read();
          
          if (done) {
              toggleSaved()
              setCookie("email", emailData)
            setEmailWriting(false)
             if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
            
            return;
          }
    
          const chunk = new TextDecoder().decode(value);
          
          emailData += chunk
          setEmail(prevState => prevState + chunk)
          return processStream();
        };
    
        processStream();
          
        } catch (err) {
          setEmailWriting(false)
          setEmailError("Something went wrong")
          console.log(err);
      }
}

const [business, setBusiness] = useState("")
const [businessError, setBusinessError] = useState("")
const [businessWriting, setBusinessWriting] = useState(false)

const generateBusiness = async (information, switchOn) => {

  if(businessWriting === true) return 

  setBusinessWriting(true)
  setBusinessError("")
  setBusiness("")

  if(information.trim() === "")
  {
    setBusinessWriting(false)
    setBusinessError("You need to provide some information about the business")
    return
  }
 
  
  try {
    const resp = await fetch("https://api.skillify-ai.com/chatgpt/business", {
      credentials: "include",
        method: "POST",
      body: JSON.stringify({ category: category,
        switchOn: switchOn,
        skill: category,
        information: information,
        userLanguage: userLanguage
      }), 
      headers: {
        "Content-Type": "application/json"
      },
    }) 
    const reader = resp.body.getReader()

    let businessData = "" 
    const processStream = async () => {
      const { done, value } = await reader.read();
  
      if (done) {
              toggleSaved()
              setCookie("business", businessData)
        setBusinessWriting(false)
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
        
        return;
      }

      const chunk = new TextDecoder().decode(value);
      
      businessData += chunk
      setBusiness(prevState => prevState + chunk)
      return processStream();
    };

    processStream();
      
    } catch (err) {
      setBusinessWriting(false)
      setBusinessError("Something went wrong")
      console.log(err);
  }
}

    // Sport 

    const [equipmentSport, setEquipmentSport] = useState("")
    const [equipmentSportError, setEquipmentSportError] = useState("")
    const [equipmentSportWriting, setEquipmentSportWriting] = useState(false)

const generateEquipmentSport = async (sport, otherSport, age, size, level, budget, moreInfo, switchOn) => {

    if(equipmentSportWriting === true) return 
  
    setEquipmentSportWriting(true)
    setEquipmentSportError("")
    setEquipmentSport("")
  
    if(sport.trim() === "")
    {
      setEquipmentSportWriting(false)
      setEquipmentSportError("You need to provide a sport")
      return
    } else if(sport === "Other" && otherSport.trim() === "")
    {
      setEquipmentSportWriting(false)
      setEquipmentSportError("You need to provide a sport")
      return
    } else if(age.trim() === "")
    {
      setEquipmentSportWriting(false)
      setEquipmentSportError("You need to provide an age")
      return
    } else if(size.trim() === "")
    {
      setEquipmentSportWriting(false)
      setEquipmentSportError("You need to provide a size")
      return
    } else if(level === "")
    {
      setEquipmentSportWriting(false)
      setEquipmentSportError("You need to provide a level")
      return
    } else if(budget.trim() === "")
    {
      setEquipmentSportWriting(false)
      setEquipmentSportError("You need to provide a budget")
      return
    }
      
     
    let sendSport = sport

    if(sport === "Other")
      sendSport = otherSport

    try {
      const resp = await fetch("https://api.skillify-ai.com/chatgpt/sport-equipment", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ category: category,
          switchOn: switchOn,
          userLanguage: userLanguage,
          sport: sendSport,
          level: level,
          budget: budget,
          size: size,
          age: age,
          moreInfo: moreInfo
        }), 
        headers: {
          "Content-Type": "application/json"
        },
      }) 
      const reader = resp.body.getReader()
  
      let equipmentData = ""
      const processStream = async () => {
        const { done, value } = await reader.read();
    
        if (done) {
              toggleSaved()
              setCookie("equipment-sport", equipmentData)
          setEquipmentSportWriting(false)
           if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
          
          return;
        }
  
        const chunk = new TextDecoder().decode(value);
        
        setEquipmentSport(prevState => prevState + chunk)
        equipmentData += chunk
        return processStream();
      };
  
      processStream();
        
      } catch (err) {
        setEquipmentSportWriting(false)
        setEquipmentSportError("Something went wrong")
        console.log(err);
    }
  }

    const [exercise, setExercise] = useState("")
    const [exerciseError, setExerciseError] = useState("")
    const [exerciseWriting, setExerciseWriting] = useState(false)

const generateExercise = async (sport, otherSport, level, time, moreInfo, switchOn) => {

    if(exerciseWriting === true) return 
  
    setExerciseWriting(true)
    setExerciseError("")
    setExercise("")
  
    if(sport.trim() === "")
    {
      setExerciseWriting(false)
      setExerciseError("You need to provide a sport")
      return
    } else if(sport === "Other" && otherSport.trim() === "")
    {
      setExerciseWriting(false)
      setExerciseError("You need to provide a sport")
      return
    } 
    else if(time.trim() === "")
    {
      setExerciseWriting(false)
      setExerciseError("You need to provide a time")
      return
    } else if(level === "")
    {
      setExerciseWriting(false)
      setExerciseError("You need to provide a level")
      return
    } 
      
    let sendSport = sport

    if(sport === "Other")
      sendSport = otherSport

    try {
      const resp = await fetch("https://api.skillify-ai.com/chatgpt/exercise", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ category: category,
          switchOn: switchOn,
          userLanguage: userLanguage,
          sport: sendSport,
          level: level,
          time: time,
          moreInfo: moreInfo
        }), 
        headers: {
          "Content-Type": "application/json"
        },
      }) 
      const reader = resp.body.getReader()
  
      let exerciseData = ""
      const processStream = async () => {
        const { done, value } = await reader.read();
    
        if (done) {
              toggleSaved()
              setCookie("exercise", exerciseData)
          setExerciseWriting(false)
           if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
          
          return;
        }
  
        const chunk = new TextDecoder().decode(value);
        
        exerciseData += chunk
        setExercise(prevState => prevState + chunk)
        return processStream();
      };
  
      processStream();
        
      } catch (err) {
        setExerciseWriting(false)
        setExerciseError("Something went wrong")
        console.log(err);
    }
  }
    
  // Fighting

    const [practiceFight, setPracticeFight] = useState("")
    const [practiceFightError, setPracticeFightError] = useState("")
    const [practiceFightWriting, setPracticeFightWriting] = useState(false)

const generatePracticeFight = async (sport, otherSport, level, time, moreInfo, switchOn) => {

    if(practiceFightWriting === true) return 
  
    setPracticeFightWriting(true)
    setPracticeFightError("")
    setPracticeFight("")
  
    if(sport.trim() === "")
    {
      setPracticeFightWriting(false)
      setPracticeFightError("You need to provide a sport")
      return
    } else if(sport === "Other" && otherSport.trim() === "")
    {
      setPracticeFightWriting(false)
      setPracticeFightError("You need to provide a sport")
      return
    } 
    else if(time.trim() === "")
    {
      setPracticeFightWriting(false)
      setPracticeFightError("You need to provide a time")
      return
    } else if(level === "")
    {
      setPracticeFightWriting(false)
      setPracticeFightError("You need to provide a level")
      return
    } 
      
    let sendSport = sport

    if(sport === "Other")
      sendSport = otherSport

    try {
      const resp = await fetch("https://api.skillify-ai.com/chatgpt/practice-fighting", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ category: category,
          switchOn: switchOn,
          userLanguage: userLanguage,
          sport: sendSport,
          level: level,
          time: time,
          moreInfo: moreInfo
        }), 
        headers: {
          "Content-Type": "application/json"
        },
      }) 
      const reader = resp.body.getReader()
  
      let practiceFightData = ""
      const processStream = async () => {
        const { done, value } = await reader.read();
    
        if (done) {
              toggleSaved()
              setCookie("practice-fight", practiceFightData)
          setPracticeFightWriting(false)
           if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
          
          return;
        }
  
        const chunk = new TextDecoder().decode(value);
        practiceFightData += chunk
        setPracticeFight(prevState => prevState + chunk)
        return processStream();
      };
  
      processStream();
        
      } catch (err) {
        setPracticeFightWriting(false)
        setPracticeFightError("Something went wrong")
        console.log(err);
    }
  }


  const [equipmentFight, setEquipmentFight] = useState("")
  const [equipmentFightError, setEquipmentFightError] = useState("")
  const [equipmentFightWriting, setEquipmentFightWriting] = useState(false)

const generateEquipmentFight = async (sport, otherSport, age, size, level, budget, moreInfo, switchOn) => {

  if(equipmentFightWriting === true) return 

  setEquipmentFightWriting(true)
  setEquipmentFightError("")
  setEquipmentFight("")

  if(sport.trim() === "")
  {
    setEquipmentFightWriting(false)
    setEquipmentFightError("You need to provide a sport")
    return
  } else if(sport === "Other" && otherSport.trim() === "")
  {
    setEquipmentFightWriting(false)
    setEquipmentFightError("You need to provide a sport")
    return
  } else if(age.trim() === "")
  {
    setEquipmentFightWriting(false)
    setEquipmentFightError("You need to provide an age")
    return
  } else if(size.trim() === "")
  {
    setEquipmentFightWriting(false)
    setEquipmentFightError("You need to provide a size")
    return
  } else if(level === "")
  {
    setEquipmentFightWriting(false)
    setEquipmentFightError("You need to provide a level")
    return
  } else if(budget.trim() === "")
  {
    setEquipmentFightWriting(false)
    setEquipmentFightError("You need to provide a budget")
    return
  }
    
   
  let sendSport = sport

  if(sport === "Other")
    sendSport = otherSport

  try {
    const resp = await fetch("https://api.skillify-ai.com/chatgpt/fight-equipment", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ category: category,
        switchOn: switchOn,
        userLanguage: userLanguage,
        sport: sendSport,
        level: level,
        budget: budget,
        size: size,
        age: age,
        moreInfo: moreInfo
      }), 
      headers: {
        "Content-Type": "application/json"
      },
    }) 
    const reader = resp.body.getReader()

    let equipmentData = ""
    const processStream = async () => {
      const { done, value } = await reader.read();
  
      if (done) {
              toggleSaved()
              setCookie("equipment-fight", equipmentData)
        setEquipmentFightWriting(false)
         if(categories.includes(category))
            return
          else if(planType === "Tool" || planType === "Full")
            return
          else 
           subtractCredits(100, switchOn)
        
        return;
      }

      const chunk = new TextDecoder().decode(value);
      equipmentData += chunk

      setEquipmentFight(prevState => prevState + chunk)
      return processStream();
    };

    processStream();
      
    } catch (err) {
      setEquipmentFightWriting(false)
      setEquipmentFightError("Something went wrong")
      console.log(err);
  }
}

    // Coding   

    const [completion, setCompletion] = useState("")
    const [completionError, setCompletionError] = useState("")
    const [completionWriting, setCompletionWriting] = useState(false)



const generateCompletion = async (language, description, switchOn) => {

      if(completionWriting === true) return 

      setCompletionWriting(true)
      setCompletionError("")
      setCompletion("")

      if(language.trim() === "")
      {
        setCompletionWriting(false)
        setCompletionError("You need to provide a programming language")
        return
      }
      else if(description.trim() === "") 
      {
        setCompletionWriting(false)
        setCompletionError("The description can't be empty")
        return
      }
      
      try {
        const resp = await fetch("https://api.skillify-ai.com/chatgpt/completion", {
          credentials: "include",
        method: "POST",
          body: JSON.stringify({ category: category,
            switchOn: switchOn,
            skill: category,
            language: language, 
            description: description,
            userLanguage: userLanguage
          }), 
          headers: {
            "Content-Type": "application/json"
          },
        }) 
        const reader = resp.body.getReader()
    
        let completionData = ""
        const processStream = async () => {
          const { done, value } = await reader.read();
      
          if (done) {
              toggleSaved()
              setCookie("completion", completionData)
            setCompletionWriting(false)
             if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
            
            return;
          }
    
          const chunk = new TextDecoder().decode(value);
          completionData += chunk
          setCompletion(prevState => prevState + chunk)
          return processStream();
        };
    
        processStream();
          
        } catch (err) {
          setCompletionWriting(false)
          setCompletionError("Something went wrong")
          console.log(err);
      }
}
    
    const [revision, setRevision] = useState("")
    const [revisionError, setRevisionError] = useState("")
    const [revisionWriting, setRevisionWriting] = useState(false)

const generateRevision = async (language, description, code, switchOn) => {

      if(revisionWriting === true) return 

      setRevisionWriting(true)
      setRevisionError("")
      setRevision("")

      if(language.trim() === "")
      {
        setRevisionWriting(false)
        setRevisionError("You need to provide a programming language")
        return
      }
      else if(description.trim() === "") 
      {
        setRevisionWriting(false)
        setRevisionError("The description can't be empty")
        return
      } else if(code.trim() === "") {
        setRevisionWriting(false)
        setRevisionError("You need to provide a code for revision")
        return
      }
      
      try {
        const resp = await fetch("https://api.skillify-ai.com/chatgpt/revision", {
          credentials: "include",
        method: "POST",
          body: JSON.stringify({ category: category,
            switchOn: switchOn,
            skill: category,
            language: language, 
            description: description,
            code: code,
            userLanguage: userLanguage
          }), 
          headers: {
            "Content-Type": "application/json"
          },
        }) 
        const reader = resp.body.getReader()
    
        let revisionData = ""
        const processStream = async () => {
          const { done, value } = await reader.read();
      
          if (done) {
              toggleSaved()
              setCookie("revision", revisionData)
            setRevisionWriting(false)
             if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
            
            return;
          }
    
          const chunk = new TextDecoder().decode(value);
          revisionData += chunk
          setRevision(prevState => prevState + chunk)
          return processStream();
        };
    
        processStream();
          
        } catch (err) {
          setRevisionWriting(false)
          setRevisionError("Something went wrong")
          console.log(err);
      }
  }

    const [split, setSplit] = useState("")
    const [splitError, setSplitError] = useState("")
    const [splitWriting, setSplitWriting] = useState(false)


const generateSplit = async (days, focus, moreInfo, number, muscle, type, switchOn) => {

      if(splitWriting === true) return 

      setSplitWriting(true)
      setSplitError("")
      setSplit("")

      if(type === "weekly" || type === "")
      {
        if(days === "")
        {
          setSplitWriting(false)
          setSplitError("You need to provide a days value")
          return
        }
        else if(focus === "") 
        {
          setSplitWriting(false)
          setSplitError("You need to select a focus")
          return
        } 
      } else 
      {
        if(number.trim() === "")
        {
          setSplitWriting(false)
          setSplitError("You need to provide the number of exercises")
          return
        } else if(muscle.trim() === "")
        {
          setSplitWriting(false)
          setSplitError("You need to provide the muscle group you want to train")
          return
        }
      }
     

      try {
        const resp = await fetch("https://api.skillify-ai.com/chatgpt/split", {
          credentials: "include",
        method: "POST",
          body: JSON.stringify({ category: category,
            switchOn: switchOn,
            skill: category,
            days: days,
            focus: focus,
            number: number,
            muscle: muscle,
            type: type,
            moreInfo: moreInfo,
            userLanguage: userLanguage
          }), 
          headers: {
            "Content-Type": "application/json"
          },
        }) 
        const reader = resp.body.getReader()
    
        let splitData = ""
        const processStream = async () => {
          const { done, value } = await reader.read();
      
          if (done) {
              toggleSaved()
              setCookie("split", splitData)
            setSplitWriting(false)
             if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
            
            return;
          }
    
          const chunk = new TextDecoder().decode(value);
          splitData += chunk
          setSplit(prevState => prevState + chunk)
          return processStream();
        };
    
        processStream();
          
        } catch (err) {
          setSplitWriting(false)
          setSplitError("Something went wrong")
          console.log(err);
      }
}

    const [diet, setDiet] = useState("")
    const [dietError, setDietError] = useState("")
    const [dietWriting, setDietWriting] = useState(false)


const generateDiet = async (weight, height, reason, moreInfo, switchOn) => {

      if(dietWriting === true) return 

      setDietWriting(true)
      setDietError("")
      setDiet("")

      if(weight.trim() === "" || weight < 0)
      {
        setDietWriting(false)
        setDietError("You need to provide a weight")
        return
      }
      else if(height.trim() === "" && height < 0) 
      {
        setDietWriting(false)
        setDietError("You need to provide a height")
        return
      }  else if(reason === "") 
      {
        setDietWriting(false)
        setDietError("You need to provide a reason")
        return
      }  
      
      try {
        const resp = await fetch("https://api.skillify-ai.com/chatgpt/diet", {
          credentials: "include",
        method: "POST",
          body: JSON.stringify({ category: category,
            switchOn: switchOn,
            skill: category,
            weight: weight,
            height: height,
            reason: reason,
            moreInfo: moreInfo,
            userLanguage: userLanguage
          }), 
          headers: {
            "Content-Type": "application/json"
          },
        }) 
        const reader = resp.body.getReader()
    
        let dietData = ""
        const processStream = async () => {
          const { done, value } = await reader.read();
      
          if (done) {
              toggleSaved()
              setCookie("diet", dietData)
            setDietWriting(false)
             if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)

            
            
            return;
          }
    
          const chunk = new TextDecoder().decode(value);

          dietData += chunk
          setDiet(prevState => prevState + chunk)
          return processStream();
        };
    
        processStream();
          
        } catch (err) {
          setDietWriting(false)
          setDietError("Something went wrong")
          console.log(err);
      }
}

const [streching, setStreching] = useState("")

    const handleStrechingChange = (e) => setStreching(e.target.value)
    
    const changeStrechingValue = (value) => {
      if(value === "")
        setStreching("")
      else 
        setStreching(prevState => prevState + value)
    }
  const [strechingData, setStrechingData] = useState({
      muscle: "",
      number: "",
      period: "",
      moreInfo: ""
  })

  const handleStrechingDataChange = (event) => {
    const {name, value} = event.target
    
    setStrechingData(prevState => ({
        ...prevState,
        [name]:value
    }))

  }
    const [equipmentSurvival, setEquipmentSurvival] = useState("")
    const [equipmentSurvivalError, setEquipmentSurvivalError] = useState("")
    const [equipmentSurvivalWriting, setEquipmentSurvivalWriting] = useState(false)

const generateEquipmentSurvival = async (trip, otherTrip, age, size, budget, period, moreInfo, switchOn) => {

      if(equipmentSurvivalWriting === true) return 

      setEquipmentSurvivalWriting(true)
      setEquipmentSurvivalError("")
      setEquipmentSurvival("")

      if(trip.trim() === "")
      {
        setEquipmentSurvivalWriting(false)
        setEquipmentSurvivalError("You need to provide a trip")
        return
      } else if(trip === "Other" && otherTrip.trim() === "")
      {
        setEquipmentSurvivalWriting(false)
        setEquipmentSurvivalError("You need to provide a trip")
        return
      } else if(age.trim() === "")
      {
        setEquipmentSurvivalWriting(false)
        setEquipmentSurvivalError("You need to provide an age")
        return
      } else if(size.trim() === "")
      {
        setEquipmentSurvivalWriting(false)
        setEquipmentSurvivalError("You need to provide a size")
        return
      } else if(period.trim() === "")
      {
        setEquipmentSurvivalWriting(false)
        setEquipmentSurvivalError("You need to provide a time period")
        return
      } else if(budget.trim() === "")
      {
        setEquipmentSurvivalWriting(false)
        setEquipmentSurvivalError("You need to provide a budget")
        return
      }
      
      let sendTrip = trip

      if(trip === "Other")
        sendTrip = otherTrip

      try {
        const resp = await fetch("https://api.skillify-ai.com/chatgpt/survival-equipment", {
          credentials: "include",
        method: "POST",
          body: JSON.stringify({ category: category,
            switchOn: switchOn,
            trip: sendTrip,
            age: age,
            size: size,
            period: period,
            budget: budget,
            moreInfo: moreInfo,
            userLanguage: userLanguage
          }), 
          headers: {
            "Content-Type": "application/json"
          },
        }) 
        const reader = resp.body.getReader()
    
        let equipmentData = ""

        const processStream = async () => {
          const { done, value } = await reader.read();
      
          if (done) {
              toggleSaved()
              setCookie("equipment-survival", equipmentData)
            setEquipmentSurvivalWriting(false)
             if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
           
            return;
          }
    
          const chunk = new TextDecoder().decode(value);
          
          equipmentData += chunk
          setEquipmentSurvival(prevState => prevState + chunk)
          return processStream();
        };
    
        processStream();
          
        } catch (err) {
          setEquipmentSurvivalWriting(false)
          setEquipmentSurvivalError("Something went wrong")
          console.log(err);
      }
}

const [survive, setSurvive] = useState("")
const [surviveError, setSurviveError] = useState("")
const [surviveWriting, setSurviveWriting] = useState(false)

const generateSurvive = async (situation, switchOn) => {

  if(surviveWriting === true) return 

  setSurviveWriting(true)
  setSurviveError("")
  setSurvive("")

  if(situation.trim() === "")
  {
    setSurviveWriting(false)
    setSurviveError("You need to provide some information about the situation")
    return
  }
 
  
  try {
    const resp = await fetch("https://api.skillify-ai.com/chatgpt/survive", {
      credentials: "include",
        method: "POST",
      body: JSON.stringify({ category: category,
        switchOn: switchOn,
        situation: situation,
        userLanguage: userLanguage
      }), 
      headers: {
        "Content-Type": "application/json"
      },
    }) 
    const reader = resp.body.getReader()

    let surviveData = ""
    const processStream = async () => {
      const { done, value } = await reader.read();
  
      if (done) {
              toggleSaved()
              setCookie("survive", surviveData)
        setSurviveWriting(false)
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
        
        return;
      }

      const chunk = new TextDecoder().decode(value);
      
      surviveData += chunk
      setSurvive(prevState => prevState + chunk)
      return processStream();
    };

    processStream();
      
    } catch (err) {
      setSurviveWriting(false)
      setSurviveError("Something went wrong")
      console.log(err);
  }
}

const [chef, setChef] = useState("")
const [chefError, setChefError] = useState("")
const [chefWriting, setChefWriting] = useState(false)
const [foodOrDrink2, setFoodOrDrink2] = useState("")

const handleFoodOrDrink2Change = (e) => setFoodOrDrink2(e.target.value)

const generateChef = async (recipeName, restrictions, preferences, switchOn) => {

  if(chefWriting === true) return 

  setChefWriting(true)
  setChefError("")
  setChef("")

  if(recipeName.trim() === "")
  {
    setChefWriting(false)
    setChefError("You need to provide a recipe name")
    return
  } 
 
  try {
    const resp = await fetch("https://api.skillify-ai.com/chatgpt/chef", {
      credentials: "include",
        method: "POST",
      body: JSON.stringify({ category: category,
        switchOn: switchOn,
        foodOrDrink: foodOrDrink2,
        restrictions: restrictions,
        preferences: preferences,
        recipeName: recipeName,
        userLanguage: userLanguage
      }), 
      headers: {
        "Content-Type": "application/json"
      },
    }) 
    const reader = resp.body.getReader()

    let chefData = ""
    const processStream = async () => {
      const { done, value } = await reader.read();
  
      if (done) {
              toggleSaved()
              setCookie("chef", chefData)
        setChefWriting(false)
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
       
        return;
      }

      const chunk = new TextDecoder().decode(value);
      
      chefData += chunk
      setChef(prevState => prevState + chunk)
      return processStream();
    };

    processStream();
      
    } catch (err) {
      setChefWriting(false)
      setChefError("Something went wrong")
      console.log(err);
  }
}

const [practice, setPractice] = useState("")
const [practiceError, setPracticeError] = useState("")
const [practiceWriting, setPracticeWriting] = useState(false)

const generatePractice = async (videoGame, rank, period, moreInfo, switchOn) => {

  if(practiceWriting === true) return 

  setPracticeWriting(true)
  setPracticeError("")
  setPractice("")

  if(videoGame.trim() === "")
  {
    setPracticeWriting(false)
    setPracticeError("You need to provide a video game")
    return
  } else if(rank.trim() === "")
  {
    setPracticeWriting(false)
    setPracticeError("You need to provide your rank")
    return
  } else if(period.trim() === "")
  {
    setPracticeWriting(false)
    setPracticeError("You need to provide a time period")
    return
  }
 
  try {
    const resp = await fetch("https://api.skillify-ai.com/chatgpt/practice", {
      credentials: "include",
        method: "POST",
      body: JSON.stringify({ category: category,
        switchOn: switchOn,
        videoGame: videoGame,
        rank: rank,
        period: period,
        moreInfo: moreInfo,
        userLanguage: userLanguage
      }), 
      headers: {
        "Content-Type": "application/json"
      },
    }) 
    const reader = resp.body.getReader()

    let practiceData = ""
    const processStream = async () => {
      const { done, value } = await reader.read();
  
      if (done) {
              toggleSaved()
              setCookie("practice", practiceData)
        setPracticeWriting(false)
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
        
        return;
      }

      const chunk = new TextDecoder().decode(value);
      practiceData += chunk
      setPractice(prevState => prevState + chunk)
      return processStream();
    };

    processStream();
      
    } catch (err) {
      setPracticeWriting(false)
      setPracticeError("Something went wrong")
      console.log(err);
  }
}

const [level, setLevel] = useState("")
const [levelError, setLevelError] = useState("")
const [levelWriting, setLevelWriting] = useState(false)

const generateLevel = async (videoGame, difficulty, level, moreInfo, switchOn) => {

  if(levelWriting === true) return 

  setLevelWriting(true)
  setLevelError("")
  setLevel("")

  if(videoGame.trim() === "")
  {
    setLevelWriting(false)
    setLevelError("You need to provide a video game")
    return
  } else if(difficulty.trim() === "")
  {
    setLevelWriting(false)
    setLevelError("You need to provide the difficulty")
    return
  } else if(level.trim() === "")
  {
    setLevelWriting(false)
    setLevelError("You need to provide the level you want to pass")
    return
  }
 
  try {
    const resp = await fetch("https://api.skillify-ai.com/chatgpt/level", {
      credentials: "include",
        method: "POST",
      body: JSON.stringify({ category: category,
        switchOn: switchOn,
        videoGame: videoGame,
        difficulty: difficulty,
        level: level,
        moreInfo: moreInfo,
        userLanguage: userLanguage
      }), 
      headers: {
        "Content-Type": "application/json"
      },
    }) 
    const reader = resp.body.getReader()

    let levelData = ""
    const processStream = async () => {
      const { done, value } = await reader.read();
  
      if (done) {
              toggleSaved()
              setCookie("level", levelData)
        setLevelWriting(false)
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
       
        return;
      }

      const chunk = new TextDecoder().decode(value);
      levelData += chunk
      setLevel(prevState => prevState + chunk)
      return processStream();
    };

    processStream();
      
    } catch (err) {
      setLevelWriting(false)
      setLevelError("Something went wrong")
      console.log(err);
  }
}

const [description, setDescription] = useState("")
const [descriptionError, setDescriptionError] = useState("")
const [descriptionWriting, setDescriptionWriting] = useState(false)

const generateDescription = async (post, hashtags, length, switchOn) => {

  if(descriptionWriting === true) return 

  setDescriptionWriting(true)
  setDescriptionError("")
  setDescription("")

  if(post.trim() === "")
  {
    setDescriptionWriting(false)
    setDescriptionError("You need to provide information about the post")
    return
  } else if(hashtags.trim() === "")
  {
    setDescriptionWriting(false)
    setDescriptionError("You need to provide a hashtags number")
    return
  } else if(length.trim() === "")
  {
    setDescriptionWriting(false)
    setDescriptionError("You need to provide a length for your description")
    return
  }
 
  try {
    const resp = await fetch("https://api.skillify-ai.com/chatgpt/description", {
      credentials: "include",
        method: "POST",
      body: JSON.stringify({ category: category,
        switchOn: switchOn,
        post: post,
        hashtags: hashtags,
        length: length,
        userLanguage: userLanguage
      }), 
      headers: {
        "Content-Type": "application/json"
      },
    }) 
    const reader = resp.body.getReader()

    let descriptionData = ""
    const processStream = async () => {
      const { done, value } = await reader.read();
  
      if (done) {
              toggleSaved()
              setCookie("description", descriptionData)
        setDescriptionWriting(false)
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
        
        return;
      }

      const chunk = new TextDecoder().decode(value);
      descriptionData += chunk
      setDescription(prevState => prevState + chunk)
      return processStream();
    };

    processStream();
      
    } catch (err) {
      setDescriptionWriting(false)
      setDescriptionError("Something went wrong")
      console.log(err);
  }
}

const [posts, setPosts] = useState("")
const [postsError, setPostsError] = useState("")
const [postsWriting, setPostsWriting] = useState(false)

const generatePosts = async (content, followers, postsDay, moreInfo, switchOn) => {

  if(postsWriting === true) return 

  setPostsWriting(true)
  setPostsError("")
  setPosts("")

  if(content.trim() === "")
  {
    setPostsWriting(false)
    setPostsError("You need to provide information about your account")
    return
  } else if(followers.trim() === "")
  {
    setPostsWriting(false)
    setPostsError("You need to provide the number of followers")
    return
  } else if(postsDay.trim() === "")
  {
    setPostsWriting(false)
    setPostsError("You need to provide posts per day")
    return
  }
 
  try {
    const resp = await fetch("https://api.skillify-ai.com/chatgpt/posts", {
      credentials: "include",
        method: "POST",
      body: JSON.stringify({ category: category,
        switchOn: switchOn,
        followers: followers,
        postsDay: postsDay,
        content: content,
        moreInfo: moreInfo,
        userLanguage: userLanguage
      }), 
      headers: {
        "Content-Type": "application/json"
      },
    }) 
    const reader = resp.body.getReader()

    let postsData = ""
    const processStream = async () => {
      const { done, value } = await reader.read();
  
      if (done) {
              toggleSaved()
              setCookie("posts", postsData)
        setPostsWriting(false)
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
        
        return;
      }

      const chunk = new TextDecoder().decode(value);
      postsData += chunk
      setPosts(prevState => prevState + chunk)
      return processStream();
    };

    processStream();
      
    } catch (err) {
      setPostsWriting(false)
      setPostsError("Something went wrong")
      console.log(err);
  }
}



const [icebreakers, setIcebreakers] = useState("")

const handleIcebreakersChange = (e) => setIcebreakers(e.target.value)

const changeIcebreakersValue = (value) => {
  if(value === "")
    setIcebreakers("")
  else 
    setIcebreakers(prevState => prevState + value)
}

const [message, setMessage] = useState("")
const [messageError, setMessageError] = useState("")
const [messageWriting, setMessageWriting] = useState(false)


const generateMessage = async (situation, age, intention, gender, otherGender, moreInfo, switchOn) => {

  if(messageWriting === true) return 

  setMessageWriting(true)
  setMessageError("")
  setMessage("")
 
  if(situation.trim() === "")
  {
    setMessageWriting(false)
    setMessageError("You need to provide information about your situation")
    return
  } else if(age.trim() === "")
  {
    setMessageWriting(false)
    setMessageError("You need to provide an age")
    return
  } else if(intention.trim() === "")
  {
    setMessageWriting(false)
    setMessageError("You need to provide your intention")
    return
  } else if(gender.trim() === "")
  {
    setMessageWriting(false)
    setMessageError("You need to provide your gender")
    return
  } else if(otherGender === "") 
  {
    setMessageWriting(false)
    setMessageError("You need to provide the other people gender")
    return
  }
  
  try {
    const resp = await fetch("https://api.skillify-ai.com/chatgpt/message", {
      credentials: "include",
        method: "POST",
      body: JSON.stringify({ category: category,
        switchOn: switchOn,
        situation: situation,
        age: age,
        intention: intention,
        gender: gender,
        otherGender: otherGender,
        moreInfo: moreInfo,
        userLanguage: userLanguage
      }), 
      headers: {
        "Content-Type": "application/json"
      },
    }) 
    const reader = resp.body.getReader()

    let messagesData = ""
    const processStream = async () => {
      const { done, value } = await reader.read();
  
      if (done) {
              toggleSaved()
              setCookie("messages", messagesData)
        setMessageWriting(false)
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
       
        return;
      }

      const chunk = new TextDecoder().decode(value);
      
      messagesData += chunk
      setMessage(prevState => prevState + chunk)
      return processStream();
    };

    processStream();
      
    } catch (err) {
      setMessageWriting(false)
      setMessageError("Something went wrong")
      console.log(err);
  }
}

const [habits, setHabits] = useState("")
const [habitsError, setHabitsError] = useState("")
const [habitsWriting, setHabitsWriting] = useState(false)

const generateHabits = async (intention, habit, age, period, moreInfo, switchOn) => {

  if(habitsWriting === true) return 

  setHabitsWriting(true)
  setHabitsError("")
  setHabits("")
 
  if(habit.trim() === "")
  {
    setHabitsWriting(false)
    setHabitsError("You need to provide the habit")
    return
  } else if(age.trim() === "")
  {
    setHabitsWriting(false)
    setHabitsError("You need to provide an age")
    return
  } else if(intention.trim() === "")
  {
    setHabitsWriting(false)
    setHabitsError("You need to provide your intention")
    return
  } else if(period.trim() === "")
  {
    setHabitsWriting(false)
    setHabitsError("You need to provide a time period")
    return
  } 
  
  try {
    const resp = await fetch("https://api.skillify-ai.com/chatgpt/habits", {
      credentials: "include",
        method: "POST",
      body: JSON.stringify({ category: category,
        switchOn: switchOn,
        intention: intention,
        age: age,
        habit: habit,
        period: period,
        moreInfo: moreInfo,
        userLanguage: userLanguage
      }), 
      headers: {
        "Content-Type": "application/json"
      },
    }) 
    const reader = resp.body.getReader()

    let habitsData = ""
    const processStream = async () => {
      const { done, value } = await reader.read();
  
      if (done) {
              toggleSaved()
              setCookie("habits", habitsData)
        setHabitsWriting(false)
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
        
        return;
      }

      const chunk = new TextDecoder().decode(value);
      habitsData += chunk
      setHabits(prevState => prevState + chunk)
      return processStream();
    };

    processStream();
      
    } catch (err) {
      setHabitsWriting(false)
      setHabitsError("Something went wrong")
      console.log(err);
  }
}

const [books, setBooks] = useState("")

const handleBooksChange = (e) => setBooks(e.target.value)

const changeBooksValue = (value) => {
  if(value === "")
    setBooks("")
  else 
    setBooks(prevState => prevState + value)
}

const [yoga, setYoga] = useState("")

const handleYogaChange = (e) => setYoga(e.target.value)

const changeYogaValue = (value) => {
  if(value === "")
    setYoga("")
  else 
    setYoga(prevState => prevState + value)
}

const [meditation, setMeditation] = useState("")
const [meditationError, setMeditationError] = useState("")
const [meditationWriting, setMeditationWriting] = useState(false)

const generateMeditation = async (level, time, moreInfo, switchOn) => {

  if(meditationWriting === true) return 

  setMeditationWriting(true)
  setMeditationError("")
  setMeditation("")
 
  if(time.trim() === "")
  {
    setMeditationWriting(false)
    setMeditationError("You need to provide a time ")
    return
  } else if(level.trim() === "")
  {
    setMeditationWriting(false)
    setMeditationError("You need to provide your level")
    return
  } 
  
  try {
    const resp = await fetch("https://api.skillify-ai.com/chatgpt/meditation", {
      credentials: "include",
        method: "POST",
      body: JSON.stringify({ category: category,
        switchOn: switchOn,
        time: time,
        level: level,
        moreInfo: moreInfo,
        userLanguage: userLanguage
      }), 
      headers: {
        "Content-Type": "application/json"
      },
    }) 
    const reader = resp.body.getReader()

    let meditationData = ""
    const processStream = async () => {
      const { done, value } = await reader.read();
  
      if (done) {
              toggleSaved()
              setCookie("meditation", meditationData)
        setMeditationWriting(false)
         if(categories.includes(category))
              return
            else if(planType === "Tool" || planType === "Full")
              return
            else 
             subtractCredits(100, switchOn)
        
        return;
      }

      const chunk = new TextDecoder().decode(value);
      meditationData += chunk
      setMeditation(prevState => prevState + chunk)
      return processStream();
    };

    processStream();
      
    } catch (err) {
      setMeditationWriting(false)
      setMeditationError("Something went wrong")
      console.log(err);
  }
}

  const [documentSummary, setDocumentSummary] = useState("")
  const [documentSummaryError, setDocumentSummaryError] = useState("")
  const [documentSummaryWriting, setDocumentSummaryWriting] = useState(false)
  const [videoSummary, setVideoSummary] = useState("")

  const generateDocumentSummary = async (transcript, switchOn, wordCount, type, generateType) => {

    if(documentSummaryWriting === true) return 
  
    setDocumentSummaryWriting(true)
    setDocumentSummaryError("")
    if(type === "video")
      setVideoSummary("")
    else
      setDocumentSummary("")
   
    if(transcript.trim() === "")
    {
      setDocumentSummaryWriting(false)
      setDocumentSummaryError("You need a transcript")
      return
   } else if(!generateType)
   {
    setDocumentSummaryWriting(false)
    setDocumentSummaryError("You need to choose a type")
    return
   } else if(wordCount > 3500) 
   {
    setDocumentSummaryWriting(false)
    setDocumentSummaryError("The transcript needs to have under 3500 words")
    return
   }
    
    try {
      const resp = await fetch("https://api.skillify-ai.com/chatgpt/document-summary", {
        credentials: "include",
          method: "POST",
        body: JSON.stringify({ 
          category: category,
          switchOn: switchOn,
          transcript: transcript,
          userLanguage: userLanguage,
          type: generateType
        }), 
        headers: {
          "Content-Type": "application/json"
        },
      }) 
      const reader = resp.body.getReader()
  
      
      let documentSummaryData = ""
      const processStream = async () => {
        const { done, value } = await reader.read();
    
        if (done) {
          toggleSaved()
          if(type === "video")
            setCookie("video", documentSummaryData)
          else 
            setCookie("file", documentSummaryData)
          setDocumentSummaryWriting(false)
           if(categories.includes(category))
                return
              else if(planType === "Tool" || planType === "Full")
                return
              else 
               subtractCredits(100, switchOn)
          
          return;
        }
  
        const chunk = new TextDecoder().decode(value);
        if(type === "video")
          setVideoSummary(prevState => prevState + chunk)
        else
          setDocumentSummary(prevState => prevState + chunk)
        documentSummaryData += chunk
        return processStream();
      };
  
      processStream();
        
      } catch (err) {
        setDocumentSummaryWriting(false)
        setDocumentSummaryError("Something went wrong")
        console.log(err);
    }
  }
    const emptyLesson = () => {
      setLesson("")
    }

    const [selected, setSelected] = useState({
      first: true,
      second:false,
      third: false,
      fourth: false,
      fifth: false
  })

  const [selectedRight, setSelectedRight] = useState({
    first: true,
    second:false,
    third: false,
    fourth: false,
})

  const location = useLocation()

  const category = location.pathname.split("/")[2]

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(prevState => !prevState)

  const handleClose = () => setOpen(false)

  const handleClick = (event, item, width, left) => {
      // console.log(event.target);

      if(event.target.className.includes("fa-solid") || event.target.className.includes("fa-regular"))
        setToolName(event.target.parentElement.innerText)
      else 
        setToolName(event.target.innerText)

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

    handleClose()
    setLineStyle(() => {
        return {
            width: width,
            left: left
        }
    })
}

const [openRight, setOpenRight] = useState(false)


const handleOpenRight = () => setOpenRight(prevState => !prevState)

const handleCloseRight = () => setOpenRight(false)

const handleRightClick = (item, width, left) => {
      
  setSelectedRight(prevState => {
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
  setLineRightStyle(() => {
      return {
          width: width,
          left: left
      }
  })
}

  const [error, setError] = useState([])

  // School 

  const [content, setContent] = useState([])
  const [openLesson, setOpenLesson] = useState([])

  const handleOpenLesson = (index) => {
    setOpenLesson(prevState => {
      const newState = [...prevState]
      
      if (!newState[index-1]) {
        newState[index-1]= true
      }
      
      return newState
    })
  }

  const handleLesson = (value, index) => {
    setContent(prevState => {
      const newState = [...prevState]
      
      if (!newState[index-1]) {
        newState[index-1]= value
      } else {
        newState[index - 1] += value
      }
      
      return newState
 })}
 useEffect(() => {
  if(lesson === "")
  {
    setOpen([])
    setContent([])
  }
  if(test === "")
  {
    setTestContent([])
    setTestOpen([])
  }
  if(recipes === "")
  {
    setRecipeContent([])
    setRecipeOpen([])
  }
    
}, [lesson, test, recipes])

 

  const [testContent, setTestContent] = useState([])
  const [testOpen, setTestOpen] = useState([])

  const handleTest = (value, index) => {
      setTestContent(prevState => {
        const newState = [...prevState]
        
        if (!newState[index-1]) {
          newState[index-1]= value
        } else {
          newState[index - 1] += value
        }
        
        return newState
  })}

  const handleOpenTest = (index) => {
    setTestOpen(prevState => {
      const newState = [...prevState]
      
      if (!newState[index-1]) {
        newState[index-1]= true
      }
      
      return newState
    })
  }

  // Cooking

  const [recipeContent, setRecipeContent] = useState([])
  const [recipeOpen, setRecipeOpen] = useState([])

  const handleRecipe = (value, index) => {
    setRecipeContent(prevState => {
      const newState = [...prevState]
      
      if (!newState[index-1]) {
        newState[index-1]= value
      } else {
        newState[index - 1] += value
      } 
      return newState
})}

const handleOpenRecipe = (index) => {
  setRecipeOpen(prevState => {
    const newState = [...prevState]
    
    if (!newState[index-1]) {
      newState[index-1]= true
    }
    
    return newState
  })
}


const handleError = (message, index) => {
    if(message === "")
      setError([])
    else 
    {
      setError(prevState => {
        const newState = [...prevState]
        
        if (!newState[index-1]) {
          newState[index-1]= message
        }
        
        return newState
      })

      return
    }
  }

const close = (index, category) => {
  if(category === "lesson")
    setOpenLesson(prevState => {
      const newState = prevState.map((item, index2) => index2 === index  ? false : item )
      return newState
    })
  else if(category === "recipe") 
    setRecipeOpen(prevState => {
      const newState = prevState.map((item, index2) => index2 === index  ? false : item )
      return newState
    })
  else if(category === "test")
    setTestOpen(prevState => {
      const newState = prevState.map((item, index2) => index2 === index  ? true : item )
      return newState
    })
}


const openAll = (index, category) => {

  if(category === "lesson")
    setOpenLesson(prevState => {
      const newState = prevState.map((item, index2) => index2 === index  ? true : item )
      return newState
    })
  else if(category === "recipe") 
    setRecipeOpen(prevState => {
      const newState = prevState.map((item, index2) => index2 === index  ? true : item )
      return newState
    })
  else if(category === "test")
    setTestOpen(prevState => {
      const newState = prevState.map((item, index2) => index2 === index  ? true : item )
      return newState
    })
}


const [succes, setSucces] = useState(false)

const toggleSucces = () => setSucces(prevState => !prevState)

const [saved, setSaved] = useState(false)

const [notSaved, setNotSaved] = useState(false)


const toggleNotSaved = () => setNotSaved(prevState => !prevState)



const toggleSaved = () => {
  setSaved(true)
}


// useEffect(() => {

//   if(saved === false)
//     toggleNotSaved()
// }, [location, saved])


const handleLessonSave = async () => {

    let skill;

    if(lessonData.skill === "Other" || category === "anything-else")
      skill = lessonData.otherSkill
    else 
      skill = lessonData.skill
    
    let title
    if(lessonData.specification && skill)
      title = skill + " " + lessonData.specification
    else if(skill)
      title = skill
    else 
      title = lessonData.specification

   if(lesson.trim() === "")
      return

    
   if(title === "")
   {
    title = lesson.split('/n')[0]
    
   }
   
    if(title === "")
      return
    

   try {
      await httpClient.post('https://api.skillify-ai.com/plans/save-lesson', {
        homework: homework,
        test: testLesson,
        flashcards: flashcards,
        level: lessonData.level,
        title: title,
        category: category,
        lessonOrTool: "lesson",
        chapters: lesson,
        content: content
    })

    setSucces(true)
    setSaved(false)
   } catch (err) {
    console.log(err);
   }
}

useEffect(() => {

  if(Cookies.get(category))
  {
    const data = JSON.parse(Cookies.get(category))
    setLesson(data.titles)
    setContent(data.content)
    setOpenLesson(data.open)
  }

  if(Cookies.get(category + "-homework"))
  {
    setHomework(Cookies.get(category + "-homework"))
  }
  if(Cookies.get(category + "-flashcard"))
  {
    setHomework(Cookies.get(category + "-flashcard"))
  }
  if(Cookies.get(category + "-test"))
  {
    setHomework(Cookies.get(category + "-test"))
  }
  if(category === "school")
  { 
    if(Cookies.get("essay"))
      setEssay(Cookies.get("essay"))

    if(Cookies.get("book-summary"))
      setBookSummary(Cookies.get("book-summary"))

    if(Cookies.get("school-test"))
    {
      const data = JSON.parse(Cookies.get("school-test"))
      setTest(data.titles)
      setTestContent(data.content)
      setTestOpen(data.open)
    }
  }
  else if(category === "sport")
  {

    if(Cookies.get("equipment-sport"))
      setEquipmentSport(Cookies.get("equipment-sport"))

    if(Cookies.get("exercise"))
      setExercise(Cookies.get("exercise"))

  } else if(category === "coding")
{
  if(Cookies.get("completion"))
    setCompletion(Cookies.get("completion"))
  if(Cookies.get("revision"))
    setRevision(Cookies.get("revision"))
} else if(category === "high-income")
{
  if(Cookies.get("email"))
    setEmail(Cookies.get("email"))
  if(Cookies.get("business"))
    setBusiness(Cookies.get("business"))
  
} else if(category === "survival-skills")
{
  if(Cookies.get("equipment-survival"))
    setEquipmentSurvival(Cookies.get("equipment-survival"))
  if(Cookies.get("survive"))
    setSurvive(Cookies.get("survive"))
} else if(category === "cooking")
{
  if(Cookies.get("recipes"))
  {
      const data = JSON.parse(Cookies.get("recipes"))
      setRecipes(data.titles)
      setRecipeContent(data.content)
      setRecipeOpen(data.open)
  }
  
  if(Cookies.get("chef"))
    setChef(Cookies.get("chef"))
} else if(category === "video-games")
{
  if(Cookies.get("practice"))
    setPractice(Cookies.get("practice"))
  
  if(Cookies.get("level"))
    setLevel(Cookies.get("level"))
  
} else if(category === "gym")
{
  if(Cookies.get("split"))
    setSplit(Cookies.get("split"))
  if(Cookies.get("diet"))
    setDiet(Cookies.get("diet"))

  if(Cookies.name("streching"))
  {
    const data = JSON.parse(Cookies.get("streching"))
    setStreching(data.titles)
    setRecipeContent(data.content)
    setRecipeOpen(data.open)
  }

} else if(category === "social-media")
{
  if(Cookies.get("description"))
    setDescription(Cookies.get("description"))
  if(Cookies.get("posts")) 
    setPosts(Cookies.get("posts"))
} else if(category === "social-skills")
{
  if(Cookies.name("icebreakers"))
  {
    const data = JSON.parse(Cookies.get("icebreakers"))
    setIcebreakers(data.titles)
    setRecipeContent(data.content)
    setRecipeOpen(data.open)
  }
  
  if(Cookies.get("messages"))
    setMessage(Cookies.get("messages"))
} else if(category === "self-improvement")
{
  if(Cookies.get("books"))
  {
    const data = JSON.parse(Cookies.get("books"))
    setBooks(data.titles)
    setRecipeContent(data.content)
    setRecipeOpen(data.open)
  }

  if(Cookies.get("habits"))
    setHabits(Cookies.get("habits"))
} else if(category === "mindfulness")
{
  if(Cookies.get("yoga"))
  {
    const data = JSON.parse(Cookies.get("yoga"))
    setYoga(data.titles)
    setRecipeContent(data.content)
    setRecipeOpen(data.open)
  }

  if(Cookies.get("meditation"))
    setMeditation(Cookies.get("meditation"))
} else if(category === "fighting")
{
  if(Cookies.get("practice-fight"))
    setPracticeFight(Cookies.get("practice-fight"))
  if(Cookies.get("equipment-fight"))
    setEquipmentFight(Cookies.get("business"))
} else if(category === "summary")
{
  if(Cookies.get("file"))
    setDocumentSummary(Cookies.get("file"))
  if(Cookies.get("video"))
    setVideoSummary(Cookies.get("video1"))
} 
}, [category])
const handleToolSave = async () => {

  const title = category.charAt(0).toUpperCase() + category.slice(1) + ' ' + toolName

  let selectedValue
  let selectedSecondaryValue
  
  if(category === "school")
  {
    if(toolName === "Essay")
      selectedValue = essay
    if(toolName === "Books")
      selectedValue = bookSummary
    if(toolName === "Tests")
    {
      selectedValue = test
      selectedSecondaryValue = testContent
    }
  } else if(category === "sport")
  {
    if(toolName === "Equipment")
      selectedValue = equipmentSport
    if(toolName === "Exercises")
      selectedValue = exercise
  } else if(category === "coding")
  {
    if(toolName === "Completion")
      selectedValue = completion
    if(toolName === "Revision")
      selectedValue = revision
  } else if(category === "high-income")
  {
    if(toolName === "Email")
      selectedValue = email
    if(toolName === "Business")
      selectedValue = business
  } else if(category === "survival-skills")
  {
    if(toolName === "Equipment")
      selectedValue = equipmentSurvival
    if(toolName === "Survive")
      selectedValue = survive
  } else if(category === "cooking")
  {
    if(toolName === "Recipes")
    {
      selectedValue = recipes
      selectedSecondaryValue = recipeContent
    }
    if(toolName === "Chef")
      selectedValue = chef
  } else if(category === "video-games")
  {
    if(toolName === "Practice")
      selectedValue = practice
    
    if(toolName === "Level")
      selectedValue = level
    
  } else if(category === "gym")
  {
    if(toolName === "Split")
      selectedValue = split
    if(toolName === "Diet")
      selectedValue = diet
    if(toolName === "Streching")
    {
      selectedValue = streching
      selectedSecondaryValue = recipeContent
    }
  } else if(category === "social-media")
  {
    if(toolName === "Description")
      selectedValue = description
    if(toolName === "Posts") 
      selectedValue = posts
  } else if(category === "social-skills")
  {
    if(toolName === "Icebreakers")
    {
      selectedValue = icebreakers
      selectedSecondaryValue = recipeContent
    }
    if(toolName === "Message")
      selectedValue = message
  } else if(category === "self-improvement")
  {
    if(toolName === "Books")
    {
      selectedValue = books
      selectedSecondaryValue = recipeContent
    }
    if(toolName === "Habits")
      selectedValue = habits
  } else if(category === "mindfulness")
  {
    if(toolName === "Yoga")
    {
      selectedValue = yoga
      selectedSecondaryValue = recipeContent
    }
    if(toolName === "Meditation")
      selectedValue = meditation
  } else if(category === "fighting")
  {
    if(toolName === "Practice")
      selectedValue = practiceFight
    if(toolName === "Equipment")
      selectedValue = equipmentFight
  } else if(category === "summary")
  {
    if(toolName === "File")
      selectedValue = documentSummary
    if(toolName === "Youtube")
      selectedValue = videoSummary
  } 

  if(selectedValue.trim() === "")
    return

  try {
    await httpClient.post("https://api.skillify-ai.com/plans/save-tool", {
      title: title,
      category: category,
      lessonOrTool: "tool",
      content: selectedSecondaryValue,
      chapters: selectedValue,
    })
    setSucces(true)
    setSaved(false)
  } catch (err) {
    console.log(err);
  }
}

useEffect(() => {
  setLessonData(prevState => ({
    ...prevState,
    skill: "",
    otherSkill: ""
  }))
}, [location])

const lessonPlaceholder = `
  Lesson Plan for Progressing from Beginner to Intermediate in Running:
  
  1. Lesson 1: Introduction to Running Technique
     - Understanding proper running form and posture
     - Breathing techniques for efficient running
  
  2. Lesson 2: Building Endurance
     - Setting realistic goals for increasing distance
     - Gradual progression in mileage and pace
  
  3. Lesson 3: Strength Training for Runners
     - Importance of strength training to prevent injuries
     - Targeting key muscle groups for improved running performance
  
  4. Lesson 4: Tempo Runs and Interval Training
     - Incorporating speed work into your training routine
     - Understanding tempo runs, intervals, and their benefits
  
  5. Lesson 5: Hill Training and Uphill Technique
     - Techniques for running uphill efficiently
     - Hill workouts to improve strength and speed
  
  6. Lesson 6: Recovery and Injury Prevention
     - Importance of rest and recovery days
     - Strategies for preventing common running injuries
  
  7. Lesson 7: Nutrition and Hydration for Runners
     - Fueling your body for optimal running performance
     - Understanding proper hydration during training
  
  8. Lesson 8: Mental Strategies for Running
     - Developing mental toughness and focus
     - Techniques to overcome mental barriers and stay motivated
  
  9. Lesson 9: Race Preparation and Strategy
     - Preparing for your first race
     - Setting race goals and creating a race-day plan
  
  10. Lesson 10: Advanced Training Techniques
      - Cross-training options for runners
      - Incorporating speed workouts, long runs, and recovery runs effectively
`


const recipesPlaceholder = 
`1. Fish and Chips with Mushy Peas
2. Beer-Battered Fish with Minty Peas
3. Crispy Fried Fish with Lemon Butter Peas
4. Fish Fritters with Minted Pea Mash
5. Beer-Battered Fish and Chips with Crushed Peas
6. Lemon Butter Fish with Minty Pea Puree
7. Fish and Chips with Homemade Tartar Sauce
8. Beer-Battered Fish with Minted Pea Salad
9. Crispy Fish Nuggets with Pea Dip
10. Lemon Butter Fish with Crushed Mint Peas`

const testPlaceholder = 
`Test: Analytic Geometry - Mathematics
Grade: 9th-12th

Question 1:
Find the midpoint of the line segment with endpoints A(-3, 2) and B(5, -4).

Question 2:
Determine the distance between the points P(4, -1) and Q(-2, 3).

Question 3:
Given the equation of a line as 2x + 3y = 6, express it in slope-intercept form (y = mx + b).

Question 4:
Find the equation of the line passing through the points (-1, 3) and (2, -2).

Question 5:
Determine the slope of the line perpendicular to the line with equation y = 2x + 1.

`

  return (
    <main className='learning-section-container'>

     <div className={`${selected.first && category !== "summary" ? 'main-learning-section' : 'left-learning-section'}`} >
        <SmallHeader 
          width = {width} 
          category = {category} 
          selected = {selected}
          lineStyle = {lineStyle} 
          handleClick = {handleClick} 
          open = {open}
          handleClose={handleClose}
          handleOpen={handleOpen}
          credits = {credits}
          superCredits={superCredits}
         />
        {category !== "summary" && selected.first && <Chat close = {close} emptyLesson = {emptyLesson} categoriesVar = {categories} planType = {planType} subtractCredits = {subtractCredits} handleClear = {handleClear} userLanguage = {userLanguage} messages = {messages} category = {category} setUserMessage = {setUserMessage} setTeacherMessage = {setTeacherMessage} />}
        {category === "summary" && selected.first && <Image planType = {planType} width = {width} handleGenerate={generateDocumentSummary} summaryError = {documentSummaryError} />}
        {selected.second && category !== "summary" && <Lesson 
          subtractCredits = {subtractCredits}
          changeValue = {changeLessonValue} 
          selected = {selected.second} 
          lesson = {lesson} 
          lessonPlaceholder={lessonPlaceholder}
          handleLessonsChange={handleLessonsChange} 
          category = {category} 
          userLanguage = {userLanguage}
          emptyLesson = {emptyLesson}
          data={lessonData}
          handleChange={handleLessonDataChange}
          categories = {categories}
          planType = {planType}
          toggleSaved={toggleSaved}
          setCookie={setCookie}
        />}
        {category === "summary" && selected.second && <Youtube planType = {planType} width = {width} handleGenerate={generateDocumentSummary} summaryError = {documentSummaryError}/>} 
        {category === "sport" && selected.third && <Equipment planType = {planType} width = {width} handleGenerate = {generateEquipmentSport} error={equipmentSportError} category = {category} />}
        {category === "sport" && selected.fourth && <Exercises planType = {planType} width = {width} handleGenerate = {generateExercise} error = {exerciseError} category = {category} />}

        {category === 'school' && selected.third && <Essay planType = {planType} width = {width} toggleSaved = {toggleSaved} categories = {categories} subtractCredits = {subtractCredits} essayError = {essayError} handleGenerateEssay = {handleGenerateEssay} userLanguage = {userLanguage} changeValue = {changeOutlineValue} category = {category} lesson = {lessonPlaceholder} outline = {outline} handleOutlineChange = {handleOutlineChange} selected = {selected.third} />}
        {category === 'school' && selected.fourth && <Books planType = {planType} width = {width} data = {data} handleChange = {handleChange} category = {category}  userLanguage = {userLanguage} selected = {selected.fourth} handleGenerate={handleGenerateBookSummary} error = {bookSummaryError} />}
        {category === 'school' && selected.fifth && <Tests setCookie = {setCookie} planType = {planType} width = {width} toggleSaved = {toggleSaved} categories = {categories} subtractCredits = {subtractCredits} changeValue = {changeTestValue} category = {category} userLanguage = {userLanguage} testPlaceholder = {testPlaceholder} test = {test} handleTestChange={handleTestChange} selected = {selected.fifth} />}

        {category === 'high-income' && selected.third && <Email planType = {planType} width = {width} error={emailError} generateEmail={generateEmail}/>}
        {category === 'high-income' && selected.fourth && <Business planType = {planType} width = {width} error={businessError} generateBusiness = {generateBusiness} />}

        {category === 'cooking' && selected.third && <Recipe setCookie = {setCookie} planType = {planType} width = {width} toggleSaved = {toggleSaved} categories = {categories} subtractCredits = {subtractCredits} foodOrDrink = {foodOrDrink} handleFoodOrDrinkChange={handleFoodOrDrinkChange} category = {category} changeValue = {changeRecipeValue}  userLanguage = {userLanguage} handleChange = {handleRecipeChange} placeholder = {recipesPlaceholder} recipes = {recipes} /> }
        {category === 'cooking' && selected.fourth && <Chef planType = {planType} width = {width} foodOrDrink = {foodOrDrink2} handleFoodOrDrinkChange = {handleFoodOrDrink2Change} handleGenerate = {generateChef} error = {chefError} category = {category}  /> }

        {category === 'gym' && selected.third && <Split planType = {planType} width = {width} generateSplit={generateSplit} error = {splitError} />}
        {category === 'gym' && selected.fourth && <Diet planType = {planType} width = {width} generateDiet = {generateDiet} error = {dietError} />}
        {category === 'gym' && selected.fifth && <Streching setCookie = {setCookie} planType = {planType} width = {width} toggleSaved = {toggleSaved} categories = {categories} category = {category} subtractCredits = {subtractCredits} data = {strechingData} handleChange = {handleStrechingDataChange} streching={streching} handleStrechingChange={handleStrechingChange} changeValue={changeStrechingValue} userLanguage={userLanguage}/>}

        {category === 'coding' && selected.third && <Completion planType = {planType} width = {width} error = {completionError} generateCompletion = {generateCompletion} />}
        {category === 'coding' && selected.fourth && <Revision planType = {planType} width = {width} generateRevision = {generateRevision} error = {revisionError} />}
        
        {category === "fighting" && selected.third && <Practice2 planType = {planType} width = {width} category={category} error={practiceFightError} handleGenerate={generatePracticeFight}/>}
        {category === "fighting" && selected.fourth && <EquipmentFight planType = {planType} width = {width} category={category} error={equipmentFightError} handleGenerate={generateEquipmentFight} />}

        {category === "survival-skills" && selected.third && <Equipment2 planType = {planType} width = {width} error = {equipmentSurvivalError} handleGenerate={generateEquipmentSurvival} category = {category} />}
        {category === "survival-skills" && selected.fourth && <Survive planType = {planType} width = {width} error = {surviveError} handleGenerate={generateSurvive} category = {category} />}
          
        {category === "video-games" && selected.third && <Level planType = {planType} width = {width} error = {levelError} handleGenerate={generateLevel} />}
        {category === "video-games" && selected.fourth && <Practice planType = {planType} width = {width} error = {practiceError} handleGenerate={generatePractice} />}

        {category === "social-media" && selected.third && <Description planType = {planType} width = {width} error = {descriptionError} handleGenerate = {generateDescription} category = {category} />}
        {category === "social-media" && selected.fourth && <Posts planType = {planType} width = {width} error = {postsError} handleGenerate={generatePosts} category = {category} />}
        
        {category === "social-skills" && selected.third && <Icebreakers setCookie = {setCookie} planType = {planType} width = {width} toggleSaved = {toggleSaved} categories = {categories} category = {category} subtractCredits = {subtractCredits} changeValue = {changeIcebreakersValue} userLanguage={userLanguage} icebreakers = {icebreakers} handleIcebreakersChange = {handleIcebreakersChange} />}
        {category === "social-skills" && selected.fourth && <Message planType = {planType} width = {width} error = {messageError} handleGenerate={generateMessage} category = {category} />}

        {category === "self-improvement" && selected.third && <Books2 setCookie = {setCookie} planType = {planType} width = {width} toggleSaved = {toggleSaved} categories = {categories} category = {category} subtractCredits = {subtractCredits} userLanguage={userLanguage} handleBooksChange={handleBooksChange} books={books} changeValue={changeBooksValue} />}
        {category === "self-improvement" && selected.fourth && <Habits planType = {planType} width = {width} error = {habitsError} handleGenerate={generateHabits} category = {category} />}

        {category === "mindfulness" && selected.third && <Yoga setCookie = {setCookie} planType = {planType} width = {width} toggleSaved = {toggleSaved} categories = {categories} category = {category} subtractCredits = {subtractCredits} changeValue = {changeYogaValue} yoga={yoga} handleYogaChange={handleYogaChange} userLanguage = {userLanguage} />}
        {category === "mindfulness" && selected.fourth && <Meditation planType = {planType} width = {width} error = {meditationError} handleGenerate={generateMeditation} />}

        {!selected.first && width <= 900 && <Tutorial width = {width} tutorial = {tutorial} openTutorial={openTutorial} closeTutorial={closeTutorial} show={show} display={display}/>}
      </div>
      {selected.first && category === "summary" && <div className='right-learning-section'>
      <div className='save-super'>
        {saved && <button className='save-button' onClick={selected.second ? handleLessonSave : handleToolSave}><i className="fa-solid fa-floppy-disk"></i>Save<i className="fa-solid fa-floppy-disk"></i></button>}
      </div>
        <ContentSecondary summary={documentSummary}/>
        
      </div>}
      {!selected.first &&
      <div className='right-learning-section'>
        {category !== "summary" && selected.second && <RightSmallHeader 
            width = {width} 
            handleClick={handleRightClick} 
            selected = {selectedRight} 
            lineStyle = {lineRightStyle}
            open = {openRight}
            handleOpen = {handleOpenRight}
            handleClose = {handleCloseRight}
          />}
          <div className='save-super'>
            {saved && <button className='save-button' onClick={selected.second ? handleLessonSave : handleToolSave}><i className="fa-solid fa-floppy-disk"></i>Save<i className="fa-solid fa-floppy-disk"></i></button>}
            {planType && planType.split(" ")[1] !== "Premium" && (selected.second || 
              (category === "school" && selected.fifth) || 
              (category === "cooking" && selected.third) || 
              (category === "gym" && selected.fifth) || 
              (category === "social-skills" && selected.third) || 
              (category === "self-improvement" && selected.third) || 
              (category === "mindfulness" && selected.third)) && (lesson || recipes || test || streching || icebreakers || books || yoga) && <div className='rocket-container'>
              <Switch width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
            </div>}
          </div>
          <Succes open={succes} handleClose={toggleSucces} text="Saved succesfully" />
          <Content 
            documentSummary = {videoSummary}
            category = {category} 
            selected = {selected}
            lesson = {lesson} 
            bookSummary = {bookSummary} 
            recipes = {recipes} 
            userLanguage={userLanguage}
            essay={essay}
            data = {data}
            foodOrDrink = {foodOrDrink}
            test = {test}
            completion = {completion}
            revision = {revision}
            email = {email}
            business = {business}
            split = {split}
            diet = {diet}
            equipmentSport = {equipmentSport}
            exercise = {exercise}
            equipmentSurvival = {equipmentSurvival}
            survive = {survive}
            chef = {chef}
            practice = {practice}
            description = {description}
            posts={posts}
            message={message}
            habits = {habits}
            icebreakers = {icebreakers}
            books = {books}
            streching = {streching}
            meditation = {meditation}
            yoga = {yoga}
            level = {level}
            content = {content}
            practiceFight = {practiceFight}
            open = {openLesson}
            error = {error}
            testContent = {testContent}
            testOpen = {testOpen}
            recipeContent = {recipeContent}
            recipeOpen = {recipeOpen}
            handleOpenLesson={handleOpenLesson}
            handleLesson={handleLesson}
            handleError={handleError}
            handleTest = {handleTest}
            handleOpenTest = {handleOpenTest}
            handleRecipe = {handleRecipe}
            handleOpenRecipe = {handleOpenRecipe}
            close = {close}
            openAll={openAll}
            selectedRight = {selectedRight}
            generateHomework = {generateHomework}
            generateFlashcards = {generateFlashcards}
            generateTests = {generateTestLesson}
            homework = {homework}
            homeworkError = {homeworkError}
            flashcards={flashcards}
            flashcardsError={flashcardsError}
            testLesson = {testLesson}
            testLessonError = {testLessonError}
            strechingData = {strechingData}
            subtractCredits = {subtractCredits}
            categories={categories}
            planType={planType}
            equipmentFight = {equipmentFight}
            toggleSaved={toggleSaved}
            width = {width}
            switchOn = {switchOn}
            setCookie = {setCookie}
          />
          {width > 900 && <Tutorial width = {width} tutorial = {tutorial} openTutorial={openTutorial} closeTutorial={closeTutorial} show={show} display={display}/>}

      </div> }
      <SavedDialog open={notSaved} handleClose={toggleNotSaved}/>
      
    </main>
  )
}
