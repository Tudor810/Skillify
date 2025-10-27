import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import httpClient from '../../httpClient'

export default function Thread({content, createdAt, title, likes, replies, username, image, _id, liked}) {

    const navigate = useNavigate()

    const today = new Date()
    const newDate = new Date(createdAt)

    let timeDifference = today.getTime() - newDate.getTime()



    let seconds = Math.floor(timeDifference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    
  let formatDate = ""
    if(seconds >= 60 && minutes < 60)
    {
      formatDate = `${minutes} ${minutes !== 1 ? "MINUTES AGO" : "MINUTE AGO"}`
    } else if(minutes >= 60 && hours < 24) {
      formatDate = `${hours} ${hours !== 1 ? "HOURS AGO" : "HOUR AGO"}`
    } else if(hours >= 24 && days < 7) {
      formatDate = `${days} ${days !== 1 ? "DAYS AGO" : "DAY AGO"}`
    } else if(days >= 7) {
      formatDate = newDate.toLocaleString()
    }


    const [likeNumber, setLikeNumber] = useState(likes)
    const [like, setLike] = useState(liked)

    const addLike = async () => {
      
      try {
        await httpClient.post("https://api.skillify-ai.com/chat/like", {
          type: "add",
          threadId: _id
        })
      } catch (err) {
        console.log(err);
      }
      setLikeNumber(prevState => prevState + 1)
      setLike(true)
    }

    const takeLike = async () => {
      try {
        await httpClient.post("https://api.skillify-ai.com/chat/like", {
          type: "remove",
          threadId: _id
        })
      } catch (err) {
        console.log(err);
      }
      setLikeNumber(prevState => prevState - 1)
      setLike(false)
    }

    const handleNavigate = (e) => {

      if(e.target.className !== "like-section" && !e.target.className.includes("fa-heart") && e.target.className !== "like-number")
        navigate(`/chat/${_id}`)

    }
  return (
    <div onClick = {handleNavigate} className='thread'>
      <div className='user-information'>
        <img src={image} alt='Profile'/>
        <p>{username} ·</p>
        <span>{formatDate}</span>
      </div>
      <div className='thread-content'>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
      <div className='action-section'>
        <div onClick = {like !== true ? addLike : takeLike} className='like-section'>
          <p className='like-number'>{likeNumber}</p>
          <i className={`fa-solid fa-heart ${like === true ? 'red' : ''}`}></i>
        </div>
        <div className='comment-section'>
          <p>{replies}</p>
          <i className='fa-solid fa-comment'></i>
        </div>


      </div>
    </div>
  )
}
