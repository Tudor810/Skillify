import React, { useState, useEffect } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import Thread from './Thread'
import AddThread from './AddThread'
import httpClient from '../../httpClient'

export default function ChatSection() {

    const [search, setSearch] = useState("")
    const [threads, setThreads] = useState([])

    const [skip, setSkip] = useState(0)
    
    const [showMore, setShowMore] = useState(false)

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const [openAddThread, setOpenAddThread] = useState(false)

    const toggleAddThread = () => setOpenAddThread(prevState => !prevState)


    useEffect(() => {
      let isMounted = true
      const getThreads = async () => {

        if(!isMounted) return 
        try {

          const resp = await httpClient.get('https://api.skillify-ai.com/chat?skip=0&limit=10')

          setSkip(10)

          if(resp.data.threadData.length < 10)
            setShowMore(true)

          setThreads(resp.data.threadData)

        } catch (err) {
          console.log(err);
        }
      }

      getThreads()
      return () => {
        isMounted = false
      }
    }, [])
    
    const getMore = async () => {
        try {
          const resp = await httpClient.get(`https://api.skillify-ai.com/chat?skip=${skip}&limit=10`)

          setThreads(prevState => {
            const newState = [...prevState, ...resp.data.threadData]

            return newState
          })

          if(resp.data.threadData.length < 10)
            setShowMore(true)

          setSkip(prevState => prevState + 10)
        } catch (err) {
          console.log(err);
        }
    }

    console.log(threads[1]);
  return (
    <div className='chat-section'>
      <div className='search-add'>
          <TextField
          placeholder='Find a thread'
          className='search-thread'
          // fullWidth
          value={search}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <Search sx={{
                    color: 'white'
                  }}/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <button onClick = {toggleAddThread} className='add-thread-button'>+ Add your own thread</button>
        <AddThread open={openAddThread} handleClose={toggleAddThread}/>
      </div>
      <div className='threads'>
        {/* <Thread /> */}
        
        {threads.length !== 0 && threads.map((item, index) => {
          return <Thread key = {index} {...item}/>
        })}
        {!showMore && <button onClick = {getMore} className='add-thread-button'>See more...</button>}
      </div>
    </div>
  )
}
