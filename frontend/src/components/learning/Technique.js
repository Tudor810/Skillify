import React from 'react'

export default function Technique({title, howUse, whatIs, benefits}) {

    
    return (
    <div className='technique'>
        <h2>{title}</h2>
        <div className='technique-content'>
            <div className='what-is'>
                <h3>What It Is:</h3>
                <p>{whatIs}</p>
            </div>
            <div className='how-use'>
                <h3>How to Use It:</h3>
                <ul>
                    {howUse.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })}
                </ul>
            </div>
            <div className='benefits'>
                <h3>Benefits of the Technique:</h3>
                <ul>
                    {benefits.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })}
                </ul>
            </div>
        </div>
        <p></p>
    </div>
  )
}
