import React, { useEffect, useState } from 'react'
import TextArea from '../learning/learning main 2/TextArea'
import httpClient from '../../httpClient'
import { useLocation } from 'react-router-dom'

export default function Comment({username, image, createdAt, content, likes, _id, level, liked}) {

  const location = useLocation()

  const today = new Date()
    const newDate = new Date(createdAt)

    const [addedReply, setAddedReply] = useState(false)
    const [replies, setReplies] = useState([])

    const [error, setError] = useState("")
    const [succes, setSucces] = useState("")

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

    const [reply, setReply] = useState("")
    const [show, setShow] = useState(false)

    const showReply = () => {
      setShow(prevState => !prevState)
    }

    const handleChange = (e) => {
      setReply(e.target.value)

      e.target.style.height = 'auto';
      if(e.target.scrollHeight > 100)
        e.target.style.height = e.target.scrollHeight + 'px';
      else 
        e.target.style.height = 100 + 'px'; 
    } 

    useEffect(() => {
      let isMounted = true
      const getReplies = async () => {

        if(!isMounted) return 

        try {
          const resp = await httpClient.get(`https://api.skillify-ai.com/chat/reply?commentId=${_id}`)

          setReplies(resp.data.commentData)
          
        } catch (err)
        {
          console.log(err);
          
        }
      }
      getReplies()

      return () => {
        isMounted = false
      }
    }, [addedReply, _id])
    const addReply = async () => {
      setError("")
      
    if(succes) return 
    
    if(reply.trim() === "")
    {
      setError("Comments can't be empty")
      return;
    } 
     try {
        await httpClient.post("https://api.skillify-ai.com/chat/reply", {
          username: username,
          content: reply,
          commentId: _id, 
          postId: location.pathname.split("/")[2]
        })

        setAddedReply(prevState => !prevState)

        setSucces("Reply posted successfully")

        setReply("")
        setShow(false)
        setTimeout(() => {
          setSucces("")
          
        }, 2000)
     } catch (err) {
      setError("Something went wrong please try again later")
      console.log(err);
     }
    }
    
    const [likeNumber, setLikeNumber] = useState(likes)
    const [like, setLike] = useState(liked)

    const addLike = async () => {

      console.log("da");
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


  return (
    <div className='comment' style={{marginLeft: level - 1 !== 0 ? '50px' : '0px'}}>
        <div className='user-information'> 
            <img src={image} alt = "Profile"/>
            <p>{username} ·</p>
            <span>{formatDate}</span>
        </div>
        <div className='main-comment'>
            <p>{content.split(/<([^>]+)>/g).map((part, index) => {
              if(index === 1)
                return <span key={index} style={{ color: "var(--primary-color)", cursor: 'pointer'}}>{part}</span>;
              else 
                return part
            })}</p>
        </div>
        <div className='action-section'>
          <span className='like' onClick = {like !== true ? addLike : takeLike}>
            {likeNumber}
            <i className={`fa-solid fa-heart ${like === true ? 'red' : ''}`}></i>
          </span>
          <span onClick = {showReply} className='reply'><i className='fa-solid fa-comment'></i><span>Reply</span></span> 
        </div>
        {show && <div className='add-comment' >
            <TextArea 
              level = {level}
              value={reply}
              handleChange={handleChange}
              type = "comment"
              addComment = {addReply} 
              error = {error}
              succes = {succes}
              placeholder="What are your thoughts?"
            />
          </div> }
          <div className='replies'>
            {replies && replies.length !== 0 && replies.map(((item, index) => {
              return <Comment {...item} key = {index} level={level + 1}/>
            }))}
          </div>
    </div> 
  )
}
