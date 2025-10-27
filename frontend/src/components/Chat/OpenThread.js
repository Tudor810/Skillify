import React, {useEffect, useState} from 'react'
import Thread from './Thread'
import httpClient from '../../httpClient'
import { useLocation } from 'react-router-dom'
import {createTheme, ThemeProvider} from '@mui/material' 
import TextArea from '../learning/learning main 2/TextArea'
import Comment from './Comment'

export default function OpenThread() {

  const [thread, setThread] = useState("")
  const [comment, setComment] = useState("")
  const [commentAdded, setCommentAdded] = useState(false)
  const [comments, setComments] = useState([])
  const [error, setError] = useState("")
  const [succes, setSucces] = useState("")


  const handleChange = (e) => {
    setComment(e.target.value)

    e.target.style.height = 'auto';
    if(e.target.scrollHeight > 100)
      e.target.style.height = e.target.scrollHeight + 'px';
    else 
      e.target.style.height = 100 + 'px';
  } 
  const location = useLocation()

  useEffect(() => {
    let isMounted = true
    const getThread = async () => {
        if(!isMounted) return 

        try {

          const resp = await httpClient.get(`https://api.skillify-ai.com/chat/${location.pathname.split("/")[2]}`)

          setThread(resp.data.threadData)

        } catch (err) {
          console.log(err);
        }
    }

    getThread()

    return () => {
      isMounted = false
    }
  },[location.pathname])

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)', // Customize the border color
              },
              '&:hover fieldset': {
                borderColor: 'var(--primary-color)', // Customize the active border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor:'var(--primary-color)' // Customize the active border color
              },
            },
          },
        },
      },
    },
  });

  const addComment = async () => {

    setError("")
    
    if(succes) return 
    
    if(comment.trim() === "")
    {
      setError("Comments can't be empty")
      return;
    } 
     try {
        await httpClient.post("https://api.skillify-ai.com/chat/comment", {
          content: comment,
          postId: location.pathname.split("/")[2]
        })

        setCommentAdded(prevState => !prevState)

        setSucces("Comment posted successfully")

        setComment("")
        setTimeout(() => {
          setSucces("")
      
        }, 2000)
     } catch (err) {
      setError("Something went wrong please try again later")
      console.log(err);
     }
  }

  useEffect(() => {
    let isMounted = true
    const getComments = async () => {

      if(!isMounted) return

      try {
        const resp = await httpClient.get(`https://api.skillify-ai.com/chat/comment?threadId=${location.pathname.split("/")[2]}`)

        setComments(resp.data.commentData)
        
      } catch (err) {
        console.log(err);
      }
    }
    
    getComments()

    return () => {
      isMounted = false
    }
  }, [location.pathname, commentAdded])

  return (
    <div className='thread-page'>
        <div className='thread-section'>
        {thread && <Thread {...thread}/>}
        <div className='comments-section'>
          <ThemeProvider theme={theme}>
          <div className='add-comment'>
            <TextArea 
              value={comment}
              handleChange={handleChange}
              type = "comment"
              addComment = {addComment} 
              error = {error}
              succes = {succes}
              placeholder="What are your thoughts?"
            />

          </div>
          <div className='comments'>
            {comments.map((item, index) => {
              return <Comment key={index} {...item} level = {1} />
            })}
          </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  )
}
