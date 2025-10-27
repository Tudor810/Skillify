import { Button } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet'

import Review from '../home/Review'
import httpClient from '../../httpClient';
import AddReview from './AddReview'
import '../../css/Review.css'

export default function ReviewPage({width, isAuthentificated}) {

    const [reviewAdded, setReviewAdded] = useState(false)
    const [review, setReview] = useState(false)
    const [loading, setLoading] = useState(false)
    const [addReview, setAddReview] = useState(false)
    const [data, setData] = useState(null)
    const [skip, setSkip] = useState(24)
    const [moreReviewsState, setMoreReviewsState] = useState(false)

    const toggleAddReview = () => setAddReview(prevState => !prevState)

    const navigate = useNavigate()

    useEffect(() => {
      let isMounted = true
      const getData = async () => {
          try {
            if(isMounted) {
                  const resp = await httpClient.get('https://api.skillify-ai.com/users/profile');
                  setData(resp.data.user)
            }
          } catch (err) {
              console.log(err);
            //   navigate('/unauthorized')
          }
      }
      getData()
      setLoading(true)
      return () => {
          isMounted = false
      }
  },[navigate])


  useEffect(() => {
    let isMounted = true
    const getReviews = async () => {
        try {
            if(isMounted) {
                
                const resp = await httpClient.get(`https://api.skillify-ai.com/review?limit=24&skip=0`)

                if(resp.data.data.length < 24)
                  setMoreReviewsState(true)

                setReview(resp.data.data)
            }   
        } catch (err) {
            console.log(err);
        }  
    }

    getReviews()
    return () => {
        isMounted = false
    }
  },[])


  const moreReviews = async () => {

      try {
            const resp = await httpClient.get(`https://api.skillify-ai.com/review?limit=12&skip=${skip}`)

            if(resp.data.data.length < 12)
              setMoreReviewsState(true)
            setReview(prevState => {
             const newArray = [...prevState, ...resp.data.data]
            //  console.log(newArray);
             return newArray
          })
          setSkip(prevState => prevState + 12)
      }   
      catch (err) {
          console.log(err);
      }  
  }

  const toggleReviewAdded = () => {
    setReviewAdded(true)
  }

  return (
    loading && 
    <div className = "reviews-page" >
        <Helmet>
            <title> Check our reviews on how Skillify helps harness new skills</title>
            <meta name = "description" content='Skillify makes learning skills easier through AI courses. Check our customer reviews on how to Ask AI questions and learn potential skills 3x faster.' />
            <link rel="canonical" href="https://skillify-ai.com/reviews" />
        </Helmet>
        <h2>What other people think about Skillify</h2>
    {data && isAuthentificated && <Button className = "add-review-button" onClick = {toggleAddReview}>Add review</Button>}
    {!isAuthentificated && <p style={{color: 'var(--description-color)', fontSize: '0.9rem'}}>You need to log in to add a review</p>}
    {data && <AddReview toggleReviewAdded = {toggleReviewAdded} reviewAdded = {reviewAdded} width = {width} open={addReview} handleClose={toggleAddReview} data={data}/>}
        <div className='reviews-container'>
            {review && review.map((item, index) => {
                return <Review key = {index} {...item} />
        }) }
        </div>
      {!moreReviewsState && <Button onClick = {moreReviews} className='more-reviews'>See more...</Button>}
    </div>
  )
}
