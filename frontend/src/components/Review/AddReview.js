import { Button, Dialog, DialogContent,TextField} from '@mui/material'
import React, {useState} from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import userBasic from '../../images/userBasic.jpg'
import logo from '../../images/logo2.png'
import httpClient from '../../httpClient';
import Succes from '../learning/Succes'
export default function AddReview({open, handleClose, data, width, reviewAdded, toggleReviewAdded}) {

  
  const [error, setError] = useState("")
  const [succes, setSucces] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [review, setReview] = useState("")
  const [stars, setStars] = useState([
    false,
    false,
    false,
    false,
    false
  ])
  const handleChange = (event) => {

    const {value} = event.target
    setReview(value)

  }
  const theme = createTheme({
    palette: {
      primary: {
        main: '#63a3ff',
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& $notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover $notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&$focused $notchedOutline': {
              // borderColor: green[500],
              borderWidth: 2,
            },
          },
        },
      },
    },
  });

  const handleStarClick = (event) => {
    setClicked(true)
    const starNumber = Number(event.target.id.split(" ")[1])
    setStars(prevState => {
      const newState = prevState.map(( _, index) => {
       if(index <= starNumber)
       { 
         return true
       }
       return false
     })
     return newState
 })
  }
  const handleStarHover = (event) => {
    
    if(clicked === false) {

      const starNumber = Number(event.target.id.split(" ")[1])
      setStars(prevState => {
        const newState = prevState.map(( _, index) => {
          if(index <= starNumber)
          { 
            return true
          }
          return false
        })
        return newState
    })

  }
}

  const handleMouseAway = () => {

    if(clicked === false) {
      setStars(prevState => {
        return prevState.map(()  => false) 
      })
    }
  }


  const handleSubmit = async () => {

    try {
      const rating = stars.filter((item) => item === true).length

      if(review.split(' ').filter(item => item !== "").length === 0)
        setError("You can't enter an empty review")
      else if(rating === 0)
        setError("You need to provide the rating")
      else if(reviewAdded)
        setError("You already added a review, refresh the page to see the changes")
      else 
      { 
          setError("")
          toggleReviewAdded()

          await httpClient.post('https://api.skillify-ai.com/review',
          {
            content: review,
            rating: rating,
            user: data.id,
            username: data.username,
            image: data.image
          })
        
        setSucces(true)
        setTimeout(() => {
          handleClose()
          setSucces(false)
        }, 1500)
      }

    } catch (err) {
      console.log(err);
      toggleReviewAdded()
      setError(err.response.data.msg)
    }
  }
  return (
    <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            width: width > 1000 ? '25%' : width > 700 ? '40%' : width > 500 ? '60%' : '80%',
          }
        }}
    >
        <DialogContent className='add-review'>
            <div className='top-side'>
              <div className='company'>
                <img alt = "Logo" src={logo} />
                <h4>Skillify</h4>
              </div>
              <div className='user-data'>
                <p>{data.username}</p>
                <img alt = "Profile" className = 'profile-photo' src= {data.image !== "" ? data.image : userBasic} />
              </div>
            </div>
            <main className='main-side'>
                <div className='stars' onMouseLeave={handleMouseAway}>
                  <i id = "star 0" onClick = {handleStarClick} onMouseEnter = {handleStarHover} className={` ${stars[0] ? "fa-solid" : "fa-regular"} fa-star`}></i>
                  <i id = "star 1" onClick = {handleStarClick} onMouseEnter = {handleStarHover} className={` ${stars[1] ? "fa-solid" : "fa-regular"} fa-star`}></i>
                  <i id = "star 2" onClick = {handleStarClick} onMouseEnter = {handleStarHover} className={` ${stars[2] ? "fa-solid" : "fa-regular"} fa-star`}></i>
                  <i id = "star 3" onClick = {handleStarClick} onMouseEnter = {handleStarHover} className={` ${stars[3] ? "fa-solid" : "fa-regular"} fa-star`}></i>
                  <i id = "star 4" onClick = {handleStarClick} onMouseEnter = {handleStarHover} className={` ${stars[4] ? "fa-solid" : "fa-regular"} fa-star`}></i>
                </div>
                {/* <textarea
                  className=''
                  value={review}
                  onChange={handleChange}
                  placeholder='Add your review'
                /> */}
                <ThemeProvider theme={theme}>
                  <TextField 
                    InputLabelProps={{
                      sx: {
                        color: 'white'
                      }
                    }}
                    className='review-textarea'
                    value={review}
                    onChange={handleChange}
                    placeholder='Share you experince with us…'
                    label = 'Review'
                    multiline
                    maxRows= '7'
                  />
                </ThemeProvider>
                {error && <span className='error'>{error}</span>}
                <Button onClick = {handleSubmit} className='review-button'>Submit</Button>
                
            </main>
        </DialogContent>
        <Succes open={succes} handleClose={() => setSucces(prevState => !prevState)} text="Review added successfully"/>
    </Dialog>
  )
}
