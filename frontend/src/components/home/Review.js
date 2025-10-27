import React from 'react'
import userBasic from '../../images/userBasic.jpg'

export default function Review({username,image,content,rating, createdAt}) {


  let formatDate;
  
  const today = new Date()
  const newDate = new Date(createdAt)

  let timeDifference = today.getTime() - newDate.getTime()



  let seconds = Math.floor(timeDifference / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  

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


  return (
    <div className='review'>
      <div className='top-section'>
      <div className='review-user-info'>
        <img alt = "Profile" src = {image !== "" ? image : userBasic} />
        <h3>{username}</h3>
      </div>
        <h5 style={{color: "rgb(150, 150, 150)"}}>{formatDate}</h5>
      </div>
      <div className='stars'>
        <i className={`${rating >= 1 ? "fa-solid" : "fa-regular"} fa-star`}></i>
        <i className={`${rating >= 2 ? "fa-solid" : "fa-regular"} fa-star`}></i>
        <i className={`${rating >= 3 ? "fa-solid" : "fa-regular"} fa-star`}></i>
        <i className={`${rating >= 4 ? "fa-solid" : "fa-regular"} fa-star`}></i>
        <i className={`${rating >= 5 ? "fa-solid" : "fa-regular"} fa-star`}></i>
        <span>({rating})</span>
      </div>
      <span className='review-text'>
        {content}
      </span>
    </div>
  )
}
