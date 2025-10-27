import React, {useState, useEffect}  from 'react'
import LearningHeader from '../learning header/LearningHeader'
import LearningSection from './LearningSection'
import '../../../css/learning2.css'
import '../../../css/learning.css'
import { useLocation, useNavigate } from 'react-router-dom'
import SavingSection from '../saving/SavingSection'
import httpClient from '../../../httpClient'
import Main from './Main'
import LearningTechniques from '../LearningTechniques'
import PriceOff from './PriceOff'
import Cookies from 'js-cookie'
import Dashboard from '../Dashboard/Dashboard'
import { Helmet } from 'react-helmet'

export default function LearningPage({width}) {

    const [data, setData] = useState(null)
    const [priceOff, setPriceOff] = useState(false)
    const [openCreditDialog, setOpenCreditDialog] = useState(false)

    const openPriceOff = () => {
      const priceOff = Cookies.get('price-off')

      if(!priceOff)
      {
        setPriceOff(true)
        Cookies.set("price-off", true)
        
      }
        
    }

    const togglePriceOff = () => setPriceOff(prevState => !prevState)
    
    const navigate = useNavigate()



    const location = useLocation()

  

    const [userLanguage, setUserLanguage] = useState("")

    useEffect(() => {
      const getLanguage = async () => {
        try {
          const resp = await httpClient.get("https://api.skillify-ai.com/users/language")
          
          setUserLanguage(resp.data.language)
        } catch (err) {
          console.log(err);
        }
      }

      getLanguage()

    },[])

    const changeLanguage = (event) => {
      setUserLanguage(event.target.value)
    }

    useEffect(() => {
      let isMounted = true
      const getData = async () => {
          try {
              const resp = await httpClient.get('https://api.skillify-ai.com/users/profile');
              if(isMounted) {
                  setData(resp.data.user)
              }

          } catch (err) {
              console.log(err);
              navigate('/unauthorized')
          }
      }
      getData()
      return () => {
          isMounted = false
      }
  },[navigate])

  useEffect(() => {
    openPriceOff()
  },[])
  
  const subtractCredits = (value, switchOn) => {
    
    setData(prevState => ({
      ...prevState,
      credits: prevState.credits - 2 * value < 0 ? 0 : prevState.credits - 2 * value,
      superCredits: switchOn ? 0 : prevState.superCredits
    }))
    if((data.credits === 0 || data.credits - 2 * value <= 0) && data.planType === "Free")
    {
      if(data.credits - 2 * value <= 0)
        addCredits("no", data.credits) 
      setOpenCreditDialog(true)
    }
      
  }
  
  const handleCloseCredit = () => {
    setOpenCreditDialog(false)
  }
  const addCredits = (type, number) => {
    setData(prevState => ({
      ...prevState,
      credits: type ? prevState.credits + number : prevState.credits + 200
    }))
  }

  const [show, setShow] = useState(false)
  const [display, setDisplay] = useState(false)


  const closeTutorial = () => {
    setShow(false)
      setTimeout(() => {
        setDisplay(false)
      }, 200)
  }

  const openTutorial = () => {
    setDisplay(true)
    setTimeout(() => {
      setShow(true)
    }, 200)
  }

  return (
   data && <div  className='learning-page'>
        <Helmet>
            <link rel="canonical" href={`https://skillify-ai.com${location.pathname}`} />
        </Helmet> 
        <LearningHeader openTutorial = {openTutorial} openCreditDialog = {openCreditDialog} handleCloseCredit = {handleCloseCredit} addCredits = {addCredits} width = {width} userLanguage = {userLanguage} changeLanguage = {changeLanguage} data={data}/>
        {location.pathname.split("/")[1] === 'learn' && <LearningSection tutorial = {data.tutorial} show = {show} display = {display} openTutorial = {openTutorial} closeTutorial = {closeTutorial} credits = {data.credits} superCredits = {data.superCredits} planType = {data.planType} categories = {data.categories} subtractCredits = {subtractCredits} userLanguage = {userLanguage} width = {width} />}
        {location.pathname === '/saved' && <SavingSection planType = {data.planType} categories = {data.categories} subtractCredits = {subtractCredits} width = {width} userLanguage = {userLanguage} />}
        {location.pathname === '/categories' && <Main width={width}/>}
        {location.pathname === "/learning-techniques" && <LearningTechniques planType = {data.planType}/>}
        {location.pathname === "/dashboard" && <Dashboard />}
        <PriceOff open={priceOff} handleClose={togglePriceOff}/>
    </div>
  )
}
