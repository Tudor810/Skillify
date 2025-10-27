import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LockTechnique() {

    const navigate = useNavigate()
  return (
    <div>
        <div style = {{height: "75vh", textAlign: "center"}}className='technique'>
            <i style = {{fontSize: "7rem"}}className="fa-solid fa-lock"></i>
            <p style={{marginTop: "10px"}}>Only avaible for Skillify's exclusive memberships</p>
            <button onClick = {() => navigate("/pricing")} className='upgrade-technique'>Upgrade</button>

        </div>
    </div>
  )
}
