import React, { useState} from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Button, TextField} from '@mui/material';
import '../../css/login.css'
import { Link } from 'react-router-dom';
import {useSpring,animated} from '@react-spring/web'
import httpClient from '../../httpClient'

export default function ForgotPassword({forgotPassword,toggleForgotPassword}) {

   const [emailValue,setEmailValue] = useState("")
   const [error, setError] = useState("")
   const [succes, setSucces] = useState("")

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

    const forgotProps = useSpring({
        opacity: forgotPassword ? 1 : 0,
        transform: !forgotPassword ? 'scale(0.2)' : 'scale(1)',
        config:{mass: 1,tension:100,friction:20},
    })

    const handleChange = (event) => {
    
        const {value} = event.target
        setEmailValue(value)
      } 
      
      const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")
        setSucces("")
        try {
          const resp = await httpClient.post("https://api.skillify-ai.com/passwordReset/forgot",{
            email: emailValue,
          })
          setSucces(resp.data.message)
        } catch (err) 
        {
          setError(err.response.data.message)
        }

      }
    return (
        <animated.form style = {forgotProps} className='login-form'>
            <div className='login-text'>
                <h1 className='form-title'>Enter your email</h1>
                <span className='create-account'>Don't have an account? <Link to='/sign-up'>Sign up for free</Link></span>
            </div>
            <ThemeProvider theme={theme}>
                <TextField 
                    label="Email"
                    value={emailValue}
                    onChange={handleChange}
                    name='email'
                    className='text-input'
                    InputLabelProps={ {
                      style: {
                        color:'#fff',
                      }
                    }}
                />
            </ThemeProvider>
            <Button onClick = {handleSubmit} className='form-button'>Send me an email</Button>
            {succes && <span className = "succes">{succes}</span>}
            {error && <span className = "error">{error}</span>}
            <span className='forgot-password' onClick={toggleForgotPassword}>Back to login</span>
        </animated.form>
 )
}
