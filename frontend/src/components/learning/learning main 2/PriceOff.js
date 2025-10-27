import React, {useEffect, useState} from 'react'
import { Dialog, DialogContent} from '@mui/material'
import background from '../../../images/model.jpg'
import backgroundSmall from '../../../images/model-small.jpg'
import logo from '../../../images/logo.png'
import httpClient from '../../../httpClient'
import { useNavigate } from 'react-router-dom'

export default function PriceOff({open, handleClose}) {

    const navigate = useNavigate()

    const [payments, setPayments] = useState()
    const [loading, setLoading] = useState(false)
    const [loadingLogo, setLoadingLogo] = useState(false)


    useEffect(() => {
        const getPayments = async () => {
            try {
                const resp = await httpClient.get("https://api.skillify-ai.com/users/payments")
                
                setPayments(resp.data.payments)
            } catch (err) {
                console.log(err);
            }
        }

        getPayments()
    },[])

    const handleLoad = () => {
        setLoading(true)
    }

    const handleLoadLogo = () => {
        setLoadingLogo(true)
    }
  return (
    <Dialog
        open = {open}
        onClose={handleClose}
    >   
       <DialogContent 
            className='price-off-content'
        >
           <img alt = "Background" onLoad = {handleLoad} className = "background-price-off-small" src={backgroundSmall} />
           <img alt = "Background" onLoad = {handleLoad} className = {`background-price-off ${loading && loadingLogo ? "loaded" : ""}`} src={background} />

           <div className={`price-off-container ${loading && loadingLogo ? "loaded" : ""}`}>
                <img onLoad = {handleLoadLogo} src={logo} alt='logo'/>
                <div className='main-titles'>
                    <h1>20% OFF</h1>
                    <p className='using-code'>Using code <span>SKILLIFY20</span></p>   
                </div>         
                <div className='reedems-left'>
                    <p>Reedems Left:</p>
                    {payments && <h2>{`${100 - payments + 12}`}</h2>}
                    {!payments && <h2>0</h2> }
                </div>
                <button onClick={() => navigate('/pricing')}>Yes, I want my 20% off!</button>
                <p className='no-thanks' onClick={handleClose}>No, thanks, I'll rather pay full price!</p>
            </div>
        </DialogContent>
    </Dialog>
  )
}
