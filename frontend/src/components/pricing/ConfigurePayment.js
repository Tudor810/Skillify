import React,{useState} from 'react'
import {Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, TextField, Typography} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {animated, useSpring} from '@react-spring/web'
import { Link, useLocation } from 'react-router-dom';
import httpClient from '../../httpClient'

export default function ConfigurePayment({data}) {

    const [requestRefund, setRequestRefund] = useState(false)
    const [configurePayment, setConfigurePayment] = useState(false)
    const [error, setError] = useState("")
    const [succes, setSucces] = useState("")
    const [refundReason, setRefundReason] = useState("")
    const [checkBox, setCheckBox] = useState(false)

    const location = useLocation()

    const toggleConfigurePayment = () => setConfigurePayment(prevState => !prevState)

    const toggleRequestRefund = () => {
        setRequestRefund(prevState => !prevState)
    }

    const handleChange = (event) => {
        const {value} = event.target

        setRefundReason(value)
    }

    const handleSubmit = async () => {

        if(refundReason.split(' ').filter(item => item !== "").length === 0)
            setError("You need to provide a reason so we can check your eligibility")
        else if(checkBox === false) {
            setError("Please read our refund policy")
        } else
        {
            try {
                setError("")
                const resp = await httpClient.post("https://api.skillify-ai.com/refund", {
                    refundReason: refundReason,
                    user:data.id,
                    email: data.email
                })
                setSucces(resp.data.msg)

                setTimeout(() => {
                    toggleConfigurePayment()
                },2000)
                
    
            } catch (err) {
                console.log(err);
                setError(err.response.data.msg)
            }
        }
        
    }


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

    const handlePortal = async () => {

        try {
            const resp = await httpClient.post("https://api.skillify-ai.com/stripe/customer-portal", {
                email: data.email
            })
            window.location = resp.data.url
        } catch (err) {
            console.log(err);
        }
    }

    const appearProps = useSpring({
        opacity: !requestRefund ? '0' : '1',
        // height: !requestRefund ? '0' : 'auto',
        display: !requestRefund ? 'none' : 'flex'
    })

  
    return (
        <>
            <Button  onClick = {toggleConfigurePayment} className='membership-plan'>{data.planType}</Button>
            <Dialog
                open = {configurePayment}
                onClose = {toggleConfigurePayment}
                PaperProps={{
                    sx : {
                        width: '400px',
                        backgroundColor: 'var(--card-background)'
                    }
                }}
            >   
                <DialogTitle sx={{
                    fontWeight: '700',
                    textAlign: "center",
                    color: 'white'
                }}>Configure Payment</DialogTitle>
                <DialogContent className='manage-account'>
                   {!requestRefund && <Button className = "configure-payment-button"onClick = {handlePortal}>Manage your subscription</Button>}
                    <Button className = "configure-payment-button" onClick = {toggleRequestRefund} >Request Refund</Button>
                    <animated.div className = "request-refund-container" style={appearProps}>
                    <div className='text-section'>
                        <h4>Tell us why you want a refund:</h4>
                        <Link to= "/refund-policy" state={location.pathname}>Check our refund policy first</Link> 
                    </div>
                    <ThemeProvider theme={theme}>    
                        <TextField 
                            sx={{
                                width: '80%'
                            }}
                            multiline
                            label = "Refund reason"
                            onChange={handleChange}
                            value = {refundReason}
                            className='text-input'
                            InputLabelProps={{
                                style: {
                                    color: 'white'
                                }
                            }}
                        />
                        <FormControlLabel 
                            sx={{
                                width: '80%',
                                textAlign: 'center'
                            }}
                            control = { <Checkbox 
                                sx={{color: 'white'}}
                                checked = {checkBox}
                                onChange={(e) => setCheckBox(e.target.checked)}
                            />}  
                            label={
                                <Typography variant="body1" style={{ fontSize: '16px' }}>
                                I have read and acknowledged the refund policy
                                </Typography> 
                            }
                        />
 
                        {succes && <span className='succes'>{succes}</span>}
                        {error && <span className='error'>{error}</span>}
                     </ThemeProvider>
                     <Button className = "refund-button"onClick={handleSubmit}>Submit</Button>
                    </animated.div>
                </DialogContent>
            </Dialog>
        </>
  )
}

