import React, { useState,useEffect} from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Button, TextField,IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../../css/login.css'
import { Link,useNavigate } from 'react-router-dom';
import {useSpring,animated} from '@react-spring/web'
import ForgotPassword from './ForgotPassword';
import LoginGoogle from './LoginGoogle';
import { Helmet } from 'react-helmet'
import httpClient from '../../httpClient'
import login1 from '../../images/login1.png'
import login2 from '../../images/login2.png'
import login3 from '../../images/login3.png'
import login4 from '../../images/login4.png'
import login5 from '../../images/login5.png'
import login6 from '../../images/login6.png'
import login7 from '../../images/login7.png'
import login8 from '../../images/login8.png'
import login9 from '../../images/login9.png'
import login10 from '../../images/login10.png'
import login11 from '../../images/login11.png'
import login12 from '../../images/login12.png'
import login13 from '../../images/login13.png'
import login14 from '../../images/login14.png'
import login15 from '../../images/login15.png'
import login16 from '../../images/login16.png'

export default function LoginPage({width}) {

  const navigate = useNavigate()
  const [forgotPassword,setForgotPassword] = useState()
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })
  const [error,setError] = useState("")
  const [loaded,setLoaded] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
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

  const toggleForgotPassword = () => setForgotPassword(prevState => !prevState)
  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleChange = (event) => {
    
    const {name,value} = event.target
    setFormData(prevState => ({
      ...prevState,
      [name]:value
    }))
  } 
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const {email, password} = formData

    try {
      const resp = await httpClient.post("https://api.skillify-ai.com/users/login",{
        email, 
        password
      })
      if(resp.data.succes === true)
        navigate('/dashboard')  

    } catch (err) {
        
        console.log(err);
        if(err.response.data.succes === false)
          setError(err.response.data.error)
          
    }
    

  }
    const props = useSpring({
        opacity: loaded ? 1 : 0,
        transform: !loaded ? 'scale(0.2)' : 'scale(1)',
        config:{mass: 1,tension:100,friction:20},
    })

    

  return (
    <div className='form-container'>
      <Helmet>
        <link rel="canonical" href="https://skillify-ai.com/login" />
      </Helmet>
      <div className='form-left-side'>
        {!forgotPassword && <animated.form style = {props} className='login-form'>
            <div className='login-text'>
              <h1 className='form-title'>Log in</h1>
              <span className='create-account'>Don't have an account? <Link to='/sign-up'>Sign up for free</Link></span>
            </div>
            <ThemeProvider theme={theme}>
              <TextField 
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  name='email'
                  InputLabelProps={ {
                    style: {
                      color:'#fff',
                    }
                  }}
                  className='text-input'  
              /> 
                <TextField 
                    className='text-input'
                    label="Password"
                    InputLabelProps={ {
                      style: {
                        color:'#fff',
                      }
                    }} 
                    type={!showPassword ? "password" : 'text'} 
                    value={formData.password}
                    onChange={handleChange}
                    name='password'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton style = {{color: 'white'}}onClick={handleTogglePassword}>
                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                />
            </ThemeProvider>
            <Button onClick = {handleSubmit} className='form-button'>Log in</Button>
            {error && <span className='error'>{error}</span>}
            <span className='forgot-password' onClick = {toggleForgotPassword}>Forgot password?</span>
           
            <div className='or-section'>
              <span></span>
              <p>OR</p>
              <span></span> 
            </div>
            <LoginGoogle /> 
        </animated.form>}
        {forgotPassword && <ForgotPassword toggleForgotPassword={toggleForgotPassword} forgotPassword={forgotPassword}/>}
      </div>
      {width >= 575 && <div className='form-right-side'>
      <div className='animation-left'>
          <img className = "slide-animation-left" alt = "Slide animation containg possible skills you can learn" src={login1} />
          <img className = "slide-animation-left" alt = "Slide animation containg possible skills you can learn" src={login2} />
          <img className = "slide-animation-left" alt = "Slide animation containg possible skills you can learn" src={login3} />
          <img className = "slide-animation-left" alt = "Slide animation containg possible skills you can learn" src={login4} />
          <img className = "slide-animation-left" alt = "Slide animation containg possible skills you can learn" src={login5} />
          <img className = "slide-animation-left" alt = "Slide animation containg possible skills you can learn" src={login6} />
          <img className = "slide-animation-left" alt = "Slide animation containg possible skills you can learn" src={login7} />
          <img className = "slide-animation-left" alt = "Slide animation containg possible skills you can learn" src={login8} />
        </div>
       {width >= 1000 && <div className='animation-right'>
          <img className = "slide-animation-right" alt = "Slide animation containg possible skills you can learn" src = {login9} />
          <img className = "slide-animation-right" alt = "Slide animation containg possible skills you can learn" src = {login10} />
          <img className = "slide-animation-right" alt = "Slide animation containg possible skills you can learn" src = {login11} />
          <img className = "slide-animation-right" alt = "Slide animation containg possible skills you can learn" src = {login12} />
          <img className = "slide-animation-right" alt = "Slide animation containg possible skills you can learn" src = {login13} />
          <img className = "slide-animation-right" alt = "Slide animation containg possible skills you can learn" src = {login14} />
          <img className = "slide-animation-right" alt = "Slide animation containg possible skills you can learn" src = {login15} />
          <img className = "slide-animation-right" alt = "Slide animation containg possible skills you can learn" src = {login16} />
        </div>}
      </div>}
    </div>
  )
}
