import React from 'react'
import {Card} from '@mui/material'
import { Link } from 'react-router-dom'

export default function BuySucces() {
  return (
    <div className='buy-succes'>
      <Card id = "card">
          <div id='upper-side'>
              <i className="fa fa-check"></i>
              <h3 id='status'> Success </h3> 
          </div>
          <div id='lower-side'>
          <p id='message'>
            Congratulations, your account has been successfully upgraded.
          </p>
          <Link to="/dashboard" id="contBtn">Continue</Link>
          </div>
      </Card>
    </div>
  )
}
