import React, {useState, useEffect}  from 'react'

import LearningHeader from '../learning/learning header/LearningHeader'
import { useNavigate } from 'react-router-dom'
import httpClient from '../../httpClient'
import { Helmet } from 'react-helmet'
import '../../css/chat.css'

export default function ProfilePage({width}) {

    const [data, setData] = useState(null)
    const [openCreditDialog, setOpenCreditDialog] = useState(false)

    const navigate = useNavigate()

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



  const handleCloseCredit = () => {
    setOpenCreditDialog(false)
  }
  
  const addCredits = () => {
    setData(prevState => ({
      ...prevState,
      credits: prevState.credits + 100
    }))
  }

  return (
   data && <div className='chat-page'>
        <Helmet>
          <link rel="canonical" href="https://skillify-ai.com/profile" />
        </Helmet>
        
        <img src='' />
        <LearningHeader openCreditDialog = {openCreditDialog} handleCloseCredit = {handleCloseCredit} addCredits = {addCredits} width = {width} userLanguage = {userLanguage} changeLanguage = {changeLanguage} data={data}/>
    
    </div>
  )
}